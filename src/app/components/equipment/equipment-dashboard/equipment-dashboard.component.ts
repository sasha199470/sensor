import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Equipment} from '../../../dto/Equipment';
import {EquipmentService} from '../../../services/equipment.service';
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-equipment-dashboard',
  templateUrl: './equipment-dashboard.component.html',
  styleUrls: ['./equipment-dashboard.component.css']
})
export class EquipmentDashboardComponent implements OnInit {

  equipment: Observable<Equipment>;

  constructor(private route: ActivatedRoute, private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.equipment = this.route.params
      .pipe(
        flatMap(params => this.equipmentService.getEquipment(+params['id']))
      );
  }

}
