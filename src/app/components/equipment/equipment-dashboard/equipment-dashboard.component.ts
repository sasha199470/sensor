import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Equipment} from '../../../dto/equipment';
import {EquipmentService} from '../../../services/equipment.service';
import {flatMap, map} from 'rxjs/operators';
import * as moment from 'moment';
import {tap} from 'rxjs/internal/operators';
import {EquipmentStoreService} from '../../../services/equipment-store.service';
import {Observable, Subscription} from 'rxjs';
import {SocketIoService} from "../../../services/socketIo-service";


@Component({
  selector: 'app-equipment-dashboard',
  templateUrl: './equipment-dashboard.component.html',
  styleUrls: ['./equipment-dashboard.component.scss']
})
export class EquipmentDashboardComponent implements OnInit {

  equipment: Equipment;
  id: string;
  currentStatus: string;
  breadCrumbs: string[] = [];
  itsSubscription: Subscription;
  statuses = [
    {
      color: 'gray',
      value: '100—85%',
      min: 85,
      max: 100
    },
    {
      color: 'green',
      value: '85—70%',
      min: 70,
      max: 84

    },
    {
      color: 'yellow',
      value: '70—50%',
      min: 50,
      max: 69
    },
    {
      color: 'orange',
      value: '50–25%',
      min: 25,
      max: 49
    },
    {
      color: 'red',
      value: '25–0%',
      min: 0,
      max: 24
    }
  ];

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService,
              private equipmentsStore: EquipmentStoreService,
              private socketIoService: SocketIoService) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => { if (this.itsSubscription) {this.itsSubscription.unsubscribe()};
                             this.id = params['id'] || 0 }),
        flatMap(params => this.equipmentService.getEquipment(params['id'] || 0))
      )
      .subscribe(equipment => {
        this.equipment = equipment;
        this.currentStatus = equipment.equipmentStatus.toLowerCase();
        this.itsSubscription = this.socketIoService.getStateDate(this.id).subscribe((value) => {
          this.equipment.its = value.value;
        })
        this.resolveBreadCrumbs()
          .subscribe(breadCrumbs => this.breadCrumbs = breadCrumbs(equipment));
      });
  }

  formDate(iso: string) {
    const duration = moment.duration(iso);
    let result = '';
    let isFirst = true;
    if (duration.years() !== 0) {
      result += `${duration.years()} г `;
      isFirst = !isFirst;
    }
    if (!isFirst || duration.months() !== 0) {
      result += `${duration.months()} м `;
      isFirst = !isFirst;
    }
    if (!isFirst || duration.days() !== 0) {
      result += `${duration.days()} д `;
      isFirst = !isFirst;
    }
    if (!isFirst || duration.hours() !== 0) {
      result += `${duration.hours()} ч `;
    }
    return `${result} ${duration.minutes()} м`;
  }

  private resolveBreadCrumbs(): Observable<(equipment: Equipment) => string[]> {
    return this.equipmentsStore.getEquipments()
      .pipe(
        map(equipments => {
          const breadCrumbs: string[] = [];
          const resolver = (equipment: Equipment) => {
            if (equipment.parentId != null) {
              breadCrumbs.concat(resolver(equipments.get(equipment.parentId)));
            }
            breadCrumbs.push(equipment.title);
            return breadCrumbs;
          };
          return resolver;
        })
      );
  }
}
