import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tasks } from '../shared/interface/tasks';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent implements OnInit {

  public tasks: Tasks
  public taskForm : FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

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
  };

  public onTaskFormSubmit() {
    if(this.taskForm.valid) {
      this.tasks = this.taskForm.value;
    } else {
      alert("Error.!")
    }
  }
}
