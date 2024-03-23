import { Component, Input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-assign-graph',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './assign-graph.component.html',
  styleUrl: './assign-graph.component.css'
})
export class AssignGraphComponent {

  @Input() data1: any;

  TaskName : [] = [] ;
  TaskPriority : [] = [] ;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  ngOnInit() {
    this.TaskName = this.data1.map((res:any)=>{
      return res.assignedTo
    })
    this.TaskPriority = this.data1.map((res:any)=>{
      return res.taskid
    })

  console.log(this.TaskPriority)
	this.chartOptions= {
    
    xAxis: {
      categories:this.TaskName // X-axis categories
    },
    yAxis: {
      title: {
        text: 'Priority' // Y-axis title
      }
    },
    series: [{
      type: 'pie',
      name: 'Priorty',
      data: this.TaskPriority,
      color: '#cde1f7',// Y-axis data
    }]
  };
     
  }


}
