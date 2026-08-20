import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/CustomValidators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {

  // INITIALIZATION HAPPENS HERE
  EmpRectForm = new FormGroup({
   firstname: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.minLength(3), CustomValidators.onlyAlphabets] 
    }),
    lastname: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
    gender: new FormControl(''),
    married: new FormControl(''),
    dateOfBirth: new FormControl(''),
    address: new FormControl(''),
    empId: new FormControl('21')
  });

 // Getter for easy access to controls in HTML
  get f() {
    return this.EmpRectForm.controls;
  }

  onSubmit() {
    if (this.EmpRectForm.valid) {
      console.log(this.EmpRectForm.value); // Logs an object with current values
    }
  }


}
