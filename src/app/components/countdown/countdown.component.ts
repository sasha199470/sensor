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

  days: string;
  hours: string;
  minutes: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    clearInterval(this.interval);
    let duration = moment.duration(this.timeToFailure);
    if (duration.minutes() < 0) {
      duration = moment.duration();
      this.tickTimer(duration);
    } else {
      this.tickTimer(duration);
      this.interval = setInterval(() => {
        this.tickTimer(duration);
      }, 1000 * 60);
    }
  }

  private tickTimer(duration: Duration) {
    duration.subtract(1, 'seconds');
    this.days = this.toFormat(duration.days());
    this.hours = this.toFormat(duration.hours());
    this.minutes = this.toFormat(duration.minutes());
  }

  private toFormat(value: number): string {
    if (value / 10 < 1) {
      return `0${value}`;
    } else {
      return value.toString();
    }
  }
}
