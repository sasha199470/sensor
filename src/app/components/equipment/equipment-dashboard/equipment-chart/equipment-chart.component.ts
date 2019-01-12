import {Component, Input, OnInit} from '@angular/core';
import {EquipmentService} from '../../../../services/equipment.service';
import * as moment from 'moment';


@Component({
  selector: 'app-equipment-chart',
  templateUrl: './equipment-chart.component.html',
  styleUrls: ['./equipment-chart.component.css']
})
export class EquipmentChartComponent implements OnInit {
  @Input()
  set id(id: string) {
    this.uid = id;
    this.days(7);
  }

  uid;
  max = 100;
  dashboardActive = '7days';
  hourLabels = ['00:00', '01:00', '02:00',
    '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
  type = 'line';
  data: any;
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
          max: 100
        }
      }],

    },
    legend: {
      display: false,
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

  constructor(private equipmentService: EquipmentService) {
  }


  ngOnInit() {
  }

  today() {
    this.dashboardActive = 'today';
    const today = moment().zone(0).hours(12);
    this.equipmentService.getDataset(25, 'HOUR',
      this.uid, today.toISOString(false)).subscribe(response => {
      this.dashboard(response);
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

  dashboard(response) {
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
    this.data = {
      labels: this.hourLabels,
      datasets: [
        {
          data: data1,
          backgroundColor: 'transparent',
          borderColor: '#3e4eb8',
          borderWidth: 1,
          pointBackgroundColor:'#fff',
          lineTension: 0,
        },
        {
          data: data2,
          backgroundColor: 'transparent',
          borderColor: '#3e4eb8',
          borderWidth: 1,
          borderDash: [10, 5],
          pointBackgroundColor:'#fff',
          lineTension: 0,
        }
      ]
    };
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
          pointBackgroundColor:'#fff',
          lineTension: 0,
        },
        {
          data: data2,
          backgroundColor: 'transparent',
          borderColor: '#3e4eb8',
          borderWidth: 1,
          borderDash: [10, 5],
          pointBackgroundColor:'#fff',
          lineTension: 0,
        }
      ]
    };
  }

}
