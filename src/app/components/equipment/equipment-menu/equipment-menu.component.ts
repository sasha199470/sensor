import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Equipment} from '../../../dto/Equipment';
import {EquipmentService} from '../../../services/equipment.service';

@Component({
  selector: 'app-equipment-menu',
  templateUrl: './equipment-menu.component.html',
  styleUrls: ['./equipment-menu.component.css']
})
export class EquipmentMenuComponent implements OnInit {

  menu: Observable<Equipment[]>;

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit() {
    this.menu = this.equipmentService.getEquipmentsMenu();
  }

  openItem(item) {
    item.open = !item.open;
  }

}
