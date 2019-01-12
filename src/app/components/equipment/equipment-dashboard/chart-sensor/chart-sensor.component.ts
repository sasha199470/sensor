import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {EquipmentService} from '../../../../services/equipment.service';
import {SocketIoService} from '../../../../services/socketIo-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chart-sensor',
  templateUrl: './chart-sensor.component.html',
  styleUrls: ['./chart-sensor.component.css']
})
export class ChartSensorComponent implements OnInit, OnDestroy {
  socketSubscribe: Subscription;

  @Input()
  set id(id: string) {
    this.dataset = [];
    this.labels = [];
    if (this.uid) {
      console.log(5);
      this.socketSubscribe.unsubscribe();
    }
    this.uid = id;

    this.today();
  }

  uid;
  max = 8640;
  dashboardActive = 'today';
  hourLabels = ['00:00', '01:00', '02:00',
    '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
  type = 'line';
  dataset = [];
  labels = [];
  data: any;
  options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: true,
      }],

    },
    legend: {
      display: false,
    },
    plugins: {
      filler: {
        propagate: false
      }
    },
    tooltips: {
      backgroundColor: '#3e4eb8',
      bodyFontColor: 'white',
      displayColors: false,
      titleFontSize: 0,
      callbacks: {
        label: function (tooltipItem, data) {
          console.log(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
          return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
        }
      }
    }

  };

  constructor(private equipmentService: EquipmentService,
              private socketIoService: SocketIoService) {
  }


  ngOnInit() {
    // this.today()
  }

  today() {
    this.dashboardActive = 'today';
    const today = moment().zone(0).hours(12);
    this.equipmentService.getSensorData(this.uid).subscribe(response => {
      this.dashboard(response);
      this.socketSubscribe = this.socketIoService.getSensorDate(this.uid).subscribe(response => {
        console.log(moment(response.dateTime).format('HH:mm:ss'));
        console.log(this.data.labels);
        if (this.labels.length < 18) {

          this.labels.push(moment(response.dateTime).format('HH:mm:ss'));
          this.dataset.push(response.value);

        } else {
          this.labels.shift();
          this.dataset.shift();
          this.labels.push(moment(response.dateTime).format('HH:mm:ss'));
          this.dataset.push(response.value);

        }
        this.data = {
          labels: this.labels,
          datasets: [
            {
              data: this.dataset,
              borderColor: '#3e4eb8',
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: 'rgba(43, 116, 198, 0.1)',
              lineTension: 0,
            }
          ]
        };
      });
    });
  }


  yesterday() {
    this.dashboardActive = 'yesterday';
    const yesterday = moment().subtract(1, 'days').zone(0).hours(12);
    this.equipmentService.getDataset(25, 'HOUR',
      this.uid, yesterday.toISOString(false)).subscribe(response => {
      this.dashboard(response);
      this.socketSubscribe = this.socketIoService.getSensorDate(this.uid)
        .subscribe(response => {
          console.log(response);
          if (this.labels.length < 15) {

          }
        });
    });
  }

  days(day) {
    this.dashboardActive = day + 'days';
    const today = moment();
    this.equipmentService.getDataset(day, 'DAY',
      this.uid, today.toISOString(false)).subscribe(response => {
      this.dashboardDay(response);
    });
  }

  dashboard(response) {
    response.forEach((item) => {
      this.dataset.push(item.value);
      this.labels.push(moment(item.dateTime).format('HH:mm:ss'));
    });
    this.data = {
      labels: this.labels,
      datasets: [
        {
          data: this.dataset,
          borderColor: '#3e4eb8',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: 'rgba(43, 116, 198, 0.1)'
        }
      ]
    };
  }

  dashboardDay(response) {
    const data1 = [];
    const data2 = [];
    response.valuesPast.forEach((item, index) => {
      data1.push(Math.ceil(item * 100 / this.max));
      data2.push(null);

    });
    data1.push(Math.ceil(response.valuesFuture[0] * 100 / this.max));
    response.valuesFuture.forEach((item, index) => {
      data2.push(Math.ceil(item * 100 / this.max));
    });
    const lables = [];
    response.dates.forEach((item) => {
      lables.push(moment(item).format('DD.MM'));
    });
    this.data = {
      labels: lables,
      datasets: [
        {
          data: data1,
          borderColor: '#3e4eb8',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: 'rgba(43, 116, 198, 0.1)'
        },
        {
          data: data2,
          backgroundColor: 'transparent',
          borderColor: '#3e4eb8',
          borderWidth: 1,
          pointBackgroundColor: '#fff'
        }
      ]
    };
  }

  ngOnDestroy() {
    console.log(6);
    console.log(this.socketSubscribe);
    this.socketSubscribe.unsubscribe();
  }

}
