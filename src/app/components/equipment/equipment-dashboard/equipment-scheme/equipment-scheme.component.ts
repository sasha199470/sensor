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
      let id =  this.svg[this.uid].id || this.uid
      document.querySelector('#scheme').setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",'#'+ id);
      // this.equipmentService.getEquipmentChildren(this.uid).subscribe((response) => {
      //   console.log(response);
      //   let el = document.querySelector('.id-' + response.id);
      //   if (el) {
      //     el.classList.add("scheme-" + this.svg[this.uid].str + response.equipmentStatus.toLowerCase())
      //   }
      // })

    }

  };

  uid;
  svg = {'7f5fd98e-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:''},
    '7f5fd9a6-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1616 876",str:''},
    '4949a766-7fd7-e811-9106-005056be35e3':{viewBox:"0 0 1616 876",str:''},
    '7f5fd9ab-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1616 876",str:''},
    '7f5fd9bf-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1616 876",str:''},
    '7f5fd9c4-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1781 928",str:''},
    '14c0efdf-80d7-e811-9106-005056be35e3':{viewBox:"0 0 1781 928",str:''},
    '7f5fd9c9-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1781 928",str:''},
    '7f5fd9ce-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1781 928",str:''},
    '7f5fd9dd-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1781 928",str:''},
    '7f5fd9e2-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1618 1606",str:''},
    '7f5fd9e7-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1618 1606",str:''},
    '7f5fd9ec-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1618 1606",str:''},
    '7f5fd9f6-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 1618 1606",str:''},
    'fef06e22-80d7-e811-9106-005056be35e3':{viewBox:"0 0 1618 1606",str:''},
    '7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:''},
    '7f5fdb1d-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb22-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb27-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb2c-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb31-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb36-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb3b-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',
      id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb40-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',
      id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb45-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',
      id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb4a-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',
      id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb4f-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',
      id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb54-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',
      id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb59-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',
      id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
    '7f5fdb5e-7b9f-11e8-80bd-8f7ff119d44e':{viewBox:"0 0 5016 1606",str:'',
      id:'7f5fdb18-7b9f-11e8-80bd-8f7ff119d44e'},
   }

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit() {
  }

}
