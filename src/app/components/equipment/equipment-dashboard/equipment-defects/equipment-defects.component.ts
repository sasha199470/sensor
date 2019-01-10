import {Component, Input, OnInit} from '@angular/core';
import {DefectMessage} from '../../../../dto/defect-message';
import * as moment from 'moment';

@Component({
  selector: 'app-equipment-defects',
  templateUrl: './equipment-defects.component.html',
  styleUrls: ['./equipment-defects.component.scss']
})
export class EquipmentDefectsComponent implements OnInit {

  @Input() defectMessages: DefectMessage[];

  constructor() { }

  ngOnInit() {
  }

  formDate(date: string): string {
    return moment(date).format('DD MMMM YYYY HH:mm:ss');
  }

}
