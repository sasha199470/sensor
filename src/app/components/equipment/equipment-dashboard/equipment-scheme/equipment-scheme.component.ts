import {Component, Input, OnInit} from '@angular/core';
import {EquipmentService} from "../../../../services/equipment.service";

@Component({
  selector: 'app-equipment-scheme',
  templateUrl: './equipment-scheme.component.html',
  styleUrls: ['./equipment-scheme.component.css']
})
export class EquipmentSchemeComponent implements OnInit {
  @Input()
  set id(id: string) {
    this.uid = id;
    if (this.svg[this.uid]) {
      document.querySelector('.scheme').setAttribute('viewBox',this.svg[this.uid]);
      document.querySelector('#scheme').setAttribute('href','#'+this.uid);
      this.equipmentService.getEquipmentChildren(this.uid).subscribe((response) => {
        console.log(response);
        let el = document.querySelector('.id-' + response.id);
        if (el) {
          el.classList.add("scheme-" + response.equipmentStatus.toLowerCase())
        }
      })

    }

  };

  uid;
  svg = {'7f5fd9ab-7b9f-11e8-80bd-8f7ff119d44e':"0 0 1194 875",
  '7f5fd9bf-7b9f-11e8-80bd-8f7ff119d44e':"0 0 1687 267"}

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit() {
  }

}
