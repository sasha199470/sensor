import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import {Duration} from 'moment';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnChanges {

  @Input() status: string;
  @Input() timeToFailure: string;

  interval: any;

  hours: string;
  minutes: string;
  seconds: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    clearInterval(this.interval);
    const duration = moment.duration(this.timeToFailure);
    this.tickTimer(duration);
    this.interval = setInterval(() => {
      this.tickTimer(duration);
    }, 1000);
  }

  private tickTimer(duration: Duration) {
    duration.subtract(1, 'seconds');
    this.hours = this.toFormat(duration.hours());
    this.minutes = this.toFormat(duration.minutes());
    this.seconds = this.toFormat(duration.seconds());
  }

  private toFormat(value: number): string {
    if (value / 10 < 1) {
      return `0${value}`;
    } else {
      return value.toString();
    }
  }
}
