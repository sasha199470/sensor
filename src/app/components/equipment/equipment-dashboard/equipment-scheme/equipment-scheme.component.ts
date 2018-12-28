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
      document.querySelector('.scheme').setAttribute('viewBox',this.svg[this.uid].viewBox);
      document.querySelector('#scheme').setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",'#'+this.uid);
      this.equipmentService.getEquipmentChildren(this.uid).subscribe((response) => {
        console.log(response);
        let el = document.querySelector('.id-' + response.id);
        if (el) {
          el.classList.add("scheme-" + this.svg[this.uid].str + response.equipmentStatus.toLowerCase())
        }
      })

    }

  };

  uid;
  svg = {'7f5fd9ab-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1194 875",str:''},
  '7f5fd9bf-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1687 267",str:''},
  '7f5fd9c9-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1564 923",str:''},
  '7f5fd9dd-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1915 284",str:'str-'} }

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit() {
  }

}
