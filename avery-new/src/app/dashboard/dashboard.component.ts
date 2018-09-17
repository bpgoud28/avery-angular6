import { TaskService } from './../shared/services/tasks.service';
import { DashboardService } from './../shared/services/dashboard.service';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tasks } from '../shared/interface/tasks';
import * as c3 from 'c3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public dashboardInfo:any;
  public chartInfo;
  public taskTab: string;
  public task = {};
  public tasks: Tasks
  public taskForm: FormGroup;
  public chartDate: string;
  public taskDetails;
  public formMode:string;
  public chartResponseData;
  constructor(
    private _dashboardService : DashboardService,
    private _formBuilder: FormBuilder,
    private _taskService: TaskService
  ) {
    this.chartInfo = {
      totalOrders : '',
      completedOrders : '',
      captureErrors : '',
      openOrders: ''
    }

    this.formMode = 'add';
    this.taskDetails = {
      taskType:'0',
      referenceType: '0',
      referenceNumber:'',
      taskStatus:'',
      assignedTo:'0',
      description:'',
      dueDate:''
    }

    this.chartDate = "jul.19"
  }

  public onTaskFormSubmit() {

    if(this.taskForm.valid) {
      this.tasks = this.taskForm.value;
      this.tasks.taskStatus = "Open";
      this._taskService.addTaskDetails(this.tasks).subscribe(response => {
        document.getElementById("hidePopUpBtn").click();
      });
    } else {
      alert("Error.!")
    }
  }

  ngOnInit() {
    this.taskForm = this._formBuilder.group({
      taskType: new FormControl('', Validators.required),
      referenceType: new FormControl('0'),
      referenceNumber: new FormControl(''),
      taskStatus: new FormControl('0'),
      assignedTo : new FormControl('0'),
      description: new FormControl(''),
      additionalComments: new FormControl(''),
      dueDate: new FormControl(''),
      attachment: new FormControl('')
    }
    )

    // validation for dependency
    this.taskForm.get('referenceType').valueChanges.subscribe(
      (referenceType: string) => {
        if (referenceType !== '0') {
          this.taskForm.controls["referenceNumber"].setValidators([Validators.required])
        } else {
          this.taskForm.controls["referenceNumber"].setValidators(null)
        }
        this.taskForm.get('referenceNumber').updateValueAndValidity();
      }
    );
    // validation for dependency
    this.taskForm.get('assignedTo').valueChanges.subscribe(
      (assignedTo: string) => {
        if (assignedTo !== '0') {
          this.taskForm.controls["dueDate"].setValidators([Validators.required])
        } else {
          this.taskForm.controls["dueDate"].setValidators(null)
        }
        this.taskForm.get('dueDate').updateValueAndValidity();
      }
    );

    this.getDashboardInfo();
    this.getChartInfo(this.chartDate);
    this.taskTabFun('tab1');
  }

  ngAfterViewInit() {
    this.chartGenerate();
  }

  public chartGenerate(chartResponseData = '') {
    let chart = c3.generate({
      data: {
        columns: [
            // ['data1', 30],
            // ['data2', 120],
        ],
        type : 'donut',
        onclick: function (d, i) {
          //console.log("onclick", d, i);
        },
        onmouseover: function (d, i) {
          //console.log("onmouseover", d, i);
        },
        onmouseout: function (d, i) {
          //console.log("onmouseout", d, i);
        }
      },
      donut: {
          title: "Total Orders " + this.chartInfo.totalOrders
      }
    });
    setTimeout(function () {
        chart.load({
            columns: [
                ["Open Orders", chartResponseData.openOrders],
                ["Completed Orders", chartResponseData.completedOrders],
                ["Capture Errors", chartResponseData.captureErrors],
            ]
        });
    }, 500);
  }

  //task tab functionality
  public taskTabFun(tab) {
    if (tab == "tab1") {
      this.taskTab = "tab1"
    } else {
      this.taskTab = "tab2"
    }
  }

  //get the chart information
  public getChartInfo (date = '') {
    this._dashboardService.chartInfo().subscribe(response => {
      for (var i = 0; i <= response.length -1; i++) {
        if(response[i].date == date) {
          this.chartInfo.totalOrders = parseInt(response[i].openOrders)
                                     + parseInt(response[i].completedOrders)
                                     + parseInt(response[i].captureErrors);
          this.chartInfo.completedOrders = response[i].completedOrders;
          this.chartInfo.captureErrors = response[i].captureErrors;
          this.chartInfo.openOrders = response[i].openOrders;
          this.chartResponseData = response[i];
          this.chartGenerate(this.chartResponseData);
        }
      }
    });
  }

  // function for getting the dashboard information
  public getDashboardInfo () {
    this._dashboardService.dashboardTasksInfo().subscribe(response => {
      this.dashboardInfo = response;
      this.chartInfo.totalOrders = response.chartInfo.openOrders;
      this.chartInfo.completedOrders = response.chartInfo.completedOrders;
      this.chartInfo.captureErrors = response.chartInfo.captureReeors;
    });
  }

  // function for return the class name based on task status
  public statusClass(status) {
    if (status == 'new') {
      return "bg-lite-blue";
    } else {
      return "bg-yellow";
    }
  }
}
