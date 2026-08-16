import { Component } from '@angular/core';
import {EmployeeListComponent} from '../employee-list/employee-list.component'

@Component({
  selector: 'app-mybrand',
  standalone: true,
  imports: [EmployeeListComponent],
  templateUrl: './mybrand.component.html',
  styleUrl: './mybrand.component.css'
})
export class MybrandComponent {

}
