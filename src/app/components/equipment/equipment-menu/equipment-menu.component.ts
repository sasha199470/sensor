import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Equipment} from '../../../dto/Equipment';
import {EquipmentStoreService} from '../../../services/equipment-store.service';

@Component({
  selector: 'app-equipment-menu',
  templateUrl: './equipment-menu.component.html',
  styleUrls: ['./equipment-menu.component.css']
})
export class EquipmentMenuComponent implements OnInit {

  menu: Observable<Equipment[]>;

  constructor(private equipmentStoreService: EquipmentStoreService) {
  }

  ngOnInit() {
    this.menu = this.equipmentStoreService.getEquipmentsMenu();
  }

  openItem(item) {
    item.open = !item.open;
  }

}
