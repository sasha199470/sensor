import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Equipment} from '../../../dto/Equipment';
import {EquipmentService} from '../../../services/equipment.service';
import {flatMap} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-equipment-dashboard',
  templateUrl: './equipment-dashboard.component.html',
  styleUrls: ['./equipment-dashboard.component.scss']
})
export class EquipmentDashboardComponent implements OnInit {

  equipment: Equipment;

  currentStatus: string;
  statuses = [
    {
      color: 'gray',
      value: '100—85%'
    },
    {
      color: 'green',
      value: '85—70%'
    },
    {
      color: 'yellow',
      value: '70—50%'
    },
    {
      color: 'orange',
      value: '50–25%'
    },
    {
      color: 'red',
      value: '25–0%'
    }
  ];

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        flatMap(params => this.equipmentService.getEquipment(+params['id']))
      )
      .subscribe(equipment => {
        this.equipment = equipment;
        this.currentStatus = equipment.equipmentStatus.toLowerCase();
      });
  }

  formDate(iso: string) {
    const duration = moment.duration(iso);
    let result = '';
    let isFirst = true;
    if (duration.days() > 0) {
      result += `${duration.days()} д `;
      isFirst = !isFirst;
    }
    if (!isFirst || duration.hours() > 0) {
      result += `${duration.hours()} ч `;
      isFirst = !isFirst;
    }
    return `${result} ${duration.minutes()} м`;
  }
}
