import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DefectMessage} from '../../../../dto/defect-message';
import * as moment from 'moment';
import {Subscription} from "rxjs/index";
import {SocketIoService} from "../../../../services/socketIo-service";

@Component({
  selector: 'app-equipment-defects',
  templateUrl: './equipment-defects.component.html',
  styleUrls: ['./equipment-defects.component.scss']
})
export class EquipmentDefectsComponent implements OnInit, OnDestroy {

  @Input() defectMessages: DefectMessage[];
  @Input()
  set id(id: string) {
    if(this.uid) {
      this.defectSubscription.unsubscribe();
    }
    this.uid = id;
    this.defectSubscription = this.socketIoService.getDefect(id).subscribe((value) => {
      this.defectMessages.push(value);
      console.log(value)
    })

  }
  defectSubscription: Subscription;
  uid: string;
  constructor(private socketIoService: SocketIoService) { }

  ngOnInit() {
  }

  formDate(date: string): string {
    return moment(date).format('DD MMMM YYYY HH:mm:ss');
  }
  ngOnDestroy() {
    this.defectSubscription.unsubscribe();
  }

}
