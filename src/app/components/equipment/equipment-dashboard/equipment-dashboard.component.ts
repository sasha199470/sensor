import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Equipment} from '../../../dto/Equipment';
import {EquipmentService} from '../../../services/equipment.service';
import {flatMap, map} from 'rxjs/operators';
import * as moment from 'moment';
import {Duration} from 'moment';
import {d} from '@angular/core/src/render3';

@Component({
  selector: 'app-equipment-dashboard',
  templateUrl: './equipment-dashboard.component.html',
  styleUrls: ['./equipment-dashboard.component.css']
})
export class EquipmentDashboardComponent implements OnInit {

  equipment: Equipment;

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        flatMap(params => this.equipmentService.getEquipment(+params['id']))
      )
      .subscribe(equipment => this.equipment = equipment);
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
