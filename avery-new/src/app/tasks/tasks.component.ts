import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tasks, TasksList } from '../shared/interface/tasks';
import { TaskService } from './../shared/services/tasks.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  public tasks: Tasks
  public taskForm : FormGroup;
  public tasksList : TasksList;
  public taskDetails;
  public formMode:string;

  public data: any[];
  public filterQuery = '';
  public rowsOnPage = 4;
  //public sortBy = 'email';
  public sortOrder = 'asc';
  public closePopup: string;
  public checkboxSelectAll: any;
  constructor( private _formBuilder: FormBuilder,
              private _taskService: TaskService,
              private modalService: NgbModal ) {
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
    this.checkboxSelectAll = false;
  }

  public openAddTaskModal(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closePopup = `Closed with: ${result}`;
    }, (reason) => {
      this.closePopup = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.getTaskLIst();
    //task form
    this.taskForm = this._formBuilder.group({
      taskType: new FormControl('0', Validators.required),
      referenceType: new FormControl('0'),
      referenceNumber: new FormControl(''),
      taskStatus: new FormControl('0'),
      assignedTo : new FormControl('0'),
      description: new FormControl(''),
      comments: new FormControl(''),
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
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
      return a.city.length;
  }

  // public remove(item) {
  //     const index = this.data.indexOf(item);
  //     if (index > -1) {
  //         this.data.splice(index, 1);
  //     }
  // }

  //get the tasks list
  public getTaskLIst() {
    this._taskService.getTasks().subscribe(response => {
      this.tasksList = response;
      //console.log(this.tasksList)
    })
  }

  //
  public onTaskFormSubmit() {
    if(this.taskForm.valid) {
      this.tasks = this.taskForm.value;
      if(this.taskForm.value.dueDate !== '') {
        let date = this.taskForm.value.dueDate.year + "-" + this.taskForm.value.dueDate.month + "-" + this.taskForm.value.dueDate.day;
        this.taskForm.value.dueDate = date;
      }
      if (this.formMode == 'edit') {
        this.tasks.id = this.taskDetails.id;
        this._taskService.updateTaskDetails(this.tasks).subscribe(response => {
          this.getTaskLIst();
          document.getElementById("hidePopUpBtn").click();
        });
      } else {
        this.tasks.taskStatus = "Open";
        this._taskService.addTaskDetails(this.tasks).subscribe(response => {
          this.getTaskLIst();
          document.getElementById("hidePopUpBtn").click();
        });
      }


    } else {
      alert("Error.!")
    }
  }

  // get task details by ID
  public getTaskDetails(taskId = '', content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closePopup = `Closed with: ${result}`;
    }, (reason) => {
      this.closePopup = `Dismissed ${this.getDismissReason(reason)}`;
    });

    if(taskId !== '') {
      this.formMode = 'edit';
      this._taskService.getTaskDetails(taskId).subscribe(response => {
        this.taskDetails = response;
        //console.log(this.taskDetails);
      });
    } else {
      this.formMode = 'add';
      this.taskDetails = {
            taskType:'0',
            referenceType: '0',
            referenceNumber:'',
            taskStatus:'',
            assignedTo:'0',
            description:'',
            dueDate:''
          };
    }

  }

  public selectAllTasks() {
    let length = this.tasksList.length;
    console.log(this.tasksList);
    if (this.checkboxSelectAll == true) {
      for(var i = 0; i <= length-1; i++) {
        this.tasksList[i].selected = false;
      }
      this.checkboxSelectAll = false;
    } else {
      for(var i = 0; i <= length-1; i++) {
        this.tasksList[i].selected = true;
      }
      this.checkboxSelectAll = true;
    }
  }
}
