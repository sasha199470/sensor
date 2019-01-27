import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EquipmentService} from '../../../../services/equipment.service';
import * as moment from 'moment';
import {ITS} from '../../../../dto/its';
import {Subscription} from 'rxjs/index';
import {SocketIoService} from '../../../../services/socketIo-service';


@Component({
  selector: 'app-equipment-chart',
  templateUrl: './equipment-chart.component.html',
  styleUrls: ['./equipment-chart.component.css']
})
export class EquipmentChartComponent implements OnInit, OnDestroy {
  @Input()
  set id(id: string) {
    this.labels = [];
    this.labelsForse = [];
    this.dataset = [];
    this.datasetForse = [];
    if (this.uid) {
      this.itsSubscription.unsubscribe();
      this.forecastSubscription.unsubscribe();
    }
    this.uid = id;
    this.today();
  }

  uid;
  dataValue = 0;
  max = 110;
  dashboardActive = '7days';
  hourLabels = ['00:00', '01:00', '02:00',
    '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
  type = 'line';
  data: any;
  dataset = [];
  datasetForse = [];
  labels = [];
  labelsForse = [];
  options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: true,
        fontSize: 0,
        ticks: {
          fontSize: 0,
          showLabelBackdrop: false,
          min: 0,
          max: 110
        }
      }],

    },
    legend: {
      display: false,
    },
    animation: false,
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
  itsSubscription: Subscription;
  forecastSubscription: Subscription;

  constructor(private equipmentService: EquipmentService, private socketIoService: SocketIoService) {

  }


  ngOnInit() {
  }

  today() {
    this.dashboardActive = 'today';
    const today = moment().zone(0).hours(12);
    this.equipmentService.getDataSetRealTime(this.uid).subscribe(response => {
      this.dashboard(response);
      this.itsSubscription = this.socketIoService.getStateDate(this.uid).subscribe((value) => {
        this.dataValue++;
        if (this.dataValue%5===0) {
          console.log(value);
          this.labels.shift();
          this.dataset.shift();
          this.labels.push(moment(value.dateTime).format('HH:mm:ss'));
          this.dataset.push(value.value);

          // this.labelsForse[0] = moment(value.dateTime).format('HH:mm:ss');
        } else  {
          this.dataset[this.dataset.length - 1] = value.value;
          this.labels[this.dataset.length - 1] = moment(value.dateTime).format('HH:mm:ss');
        }
        this.datasetForse[this.dataset.length - 1] = value.value;
        this.createDataSet();
      });

      this.forecastSubscription = this.socketIoService.getForecast(this.uid).subscribe((value) => {
        console.log(value);
        this.datasetForse = new Array(this.dataset.length - 1);
        this.labelsForse = [];
        this.datasetForse.push(this.dataset[this.dataset.length - 1]);
        for (let i = 0; i < value.length; i = i + 5) {
          this.labelsForse.push(moment(value[i].dateTime).format('HH:mm:ss'));
          this.datasetForse.push(value[i].value);
        }
        this.createDataSet();
      });
    });


  }

  yesterday() {
    this.dashboardActive = 'yesterday';
    const yesterday = moment().subtract(1, 'days').zone(0).hours(12);
    this.equipmentService.getDataset(25, 'HOUR',
      this.uid, yesterday.toISOString(false)).subscribe(response => {
      this.dashboard(response);
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

  dashboard(response: ITS) {
    let data1 = [];
    let data2 = [];
    response.stateList.forEach((item, index) => {
      if (index%5===0 || index === response.stateList.length - 1) {
        this.labels.push((moment(item.dateTime).format('HH:mm:ss')));
        this.dataset.push(item.value);
        if (index === response.stateList.length - 1) {
          this.datasetForse.push(item.value);
          this.dataValue = index%5;
        } else {
          this.datasetForse.push(null);
        }
      }
    });
    console.log(this.labels);
    for (let i = 0; i < response.forecastDataList.length; i = i + 5) {
      this.labelsForse.push(moment(response.forecastDataList[i].dateTime).format('HH:mm:ss'));
      this.datasetForse.push(response.forecastDataList[i].value);
    }
    console.log(response);
    // response.valuesPast.forEach((item, index) => {
    //   data1.push(Math.ceil(item * 100 / this.max));
    //   data2.push(null);
    //
    // });
    // data1.push(Math.ceil(response.valuesFuture[0] * 100 / this.max));
    // response.valuesFuture.forEach((item, index) => {
    //   data2.push(Math.ceil(item * 100 / this.max));
    // });
    this.createDataSet();
  }

  dashboardDay(response) {
    let data1 = [];
    let data2 = [];
    response.valuesPast.forEach((item, index) => {
      data1.push(Math.ceil(item * 100 / this.max));
      data2.push(null);

    });
    data1.push(Math.ceil(response.valuesFuture[0] * 100 / this.max));
    response.valuesFuture.forEach((item, index) => {
      data2.push(Math.ceil(item * 100 / this.max));
    });
    let lables = [];
    response.dates.forEach((item) => {
      // lables.push(moment(item).format('DD.MM')); come back early
      lables.push(moment(item).format('DD.MM HH:mm:ss'));
    });
    this.data = {
      labels: lables,
      datasets: [
        {
          data: data1,
          backgroundColor: 'transparent',
          borderColor: '#3e4eb8',
          borderWidth: 1,
          pointBackgroundColor: '#fff',
          lineTension: 0,
        },
        {
          data: data2,
          backgroundColor: 'transparent',
          borderColor: '#3e4eb8',
          borderWidth: 1,
          borderDash: [10, 5],
          pointBackgroundColor: '#fff',
          lineTension: 0,
        }
      ]
    };
  }

  createDataSet() {
    let labels = [];
    labels.push(...this.labels);
    labels.push(...this.labelsForse);
    this.data = {
      labels: labels,
      datasets: [
        {
          data: this.dataset,
          backgroundColor: 'transparent',
          borderColor: '#3e4eb8',
          borderWidth: 1,
          pointBackgroundColor: '#fff',
          lineTension: 0,
        },
        {
          data: this.datasetForse,
          backgroundColor: 'transparent',
          borderColor: '#3e4eb8',
          borderWidth: 1,
          borderDash: [10, 5],
          pointBackgroundColor: '#fff',
          lineTension: 0,
        }
      ]
    };
  }

  ngOnDestroy() {
    this.itsSubscription.unsubscribe();
  }

}
