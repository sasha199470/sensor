import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-equipment-menu',
  templateUrl: './equipment-menu.component.html',
  styleUrls: ['./equipment-menu.component.css']
})
export class EquipmentMenuComponent implements OnInit {

  menu =
    [
      {
        id: 10000,
        title: "Паровой энергетический котел",
        parentId: null,
        equipmentStatus: "YELLOW",
        depth: -1,
        open: false,
        children: [
          {
            id: 10100,
            title: "Обмуровка котла",
            parentId: 10000,
            equipmentStatus: "ORANGE",
            depth: 0,
            children: [
              {
                id: 10100,
                title: "Обмуровка котла",
                parentId: 10000,
                equipmentStatus: "ORANGE",
                depth: 0,
                children: [],
                determinationProbability: 81,
                failureDate: "PT18H29M2S",
                stationaryModeDate: "PT18H32M3S",
                startDate: "PT2012H49M19S"
              }
            ],
            determinationProbability: 81,
            failureDate: "PT18H29M2S",
            stationaryModeDate: "PT18H32M3S",
            startDate: "PT2012H49M19S"
          },
          {
            id: 10200,
            title: "Обмуровка котла",
            parentId: 10000,
            equipmentStatus: "ORANGE",
            depth: 0,
            children: [],
            determinationProbability: 81,
            failureDate: "PT18H29M2S",
            stationaryModeDate: "PT18H32M3S",
            startDate: "PT2012H49M19S"
          }]
},
      {id: 10000,
        title: "Паровой энергетический котел",
        parentId: null,
        equipmentStatus: "YELLOW",
        depth: -1,
        children: []}]

  constructor() {
  }

  ngOnInit() {
  }

  openItem(item) {
    item.open = !item.open;
  }

}
