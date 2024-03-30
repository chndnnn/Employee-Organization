import { Component, Input, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { HttpServicesService } from '../../services/http-services.service';

@Component({
  selector: 'app-graphs',
  standalone: true,
  providers:[HttpServicesService],
  imports: [HighchartsChartModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent implements OnInit{

  constructor(private http:HttpServicesService){ }

  @Input() data1: any;

  TaskName : [] = [] ;
  TaskPriority : [] = [] ;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  ngOnInit() {


      this.TaskName = this.data1.map((res:any)=>{
       
        return res.taskname
      })
      this.TaskPriority = this.data1.map((res:any)=>{
        return res.priority
      })
       
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
          type: 'bar',
          name: 'Priorty',
          data: this.TaskPriority ,
          color: '#cde1f7',// Y-axis data
        }]
      };
     
  }




  
 


		
  
}
