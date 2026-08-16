import { Component, OnInit, ViewChild, AfterViewInit,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSevice } from '../Services/common.service'
import { Country, City, Employee } from '../Models/interfaces'
import { FormsModule, NgForm, FormGroup, FormControl } from '@angular/forms';
import { Observable, of, map } from 'rxjs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit  {

 displayedColumns: string[] = ['empId', 'firstname', 'lastname', 'gender', 'city', 'pincode'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private CommonSevice: CommonSevice) {
    // Initialize data source with an empty array to prevent template errors before API resolves
    this.dataSource = new MatTableDataSource<Employee>([]);
  }

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.CommonSevice.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.dataSource.data = data;
        
        // Link paginator and sort components to the data source
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        // Optional: Custom sorting logic if nested objects or specific formats are needed
        this.setCustomFilterAndSort();
      },
      error: (err) => console.error('Failed to fetch employee data', err)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setCustomFilterAndSort(): void {
    // Optional: Overrides default filter predicate to only search specific columns if desired
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      return data.firstname.toLowerCase().includes(transformedFilter) || 
             data.lastname.toLowerCase().includes(transformedFilter) ||
             data.pincode.includes(transformedFilter);
    };
  }

//  Fetch cities data
  fetchEmployees(): void {
  this.CommonSevice.getEmployees().subscribe({
    next: (data: Employee[]) => {
      if (!data || data.length === 0) {
        //this.dataSource = [];
        //this.errorMessage = 'No data available from the server.';
      } else {
       // this.dataSource = data;
       // this.errorMessage = ''; 
      }
    },
    error: (error) => {
      //this.errorMessage = 'Failed to load data from API.';
      console.error('HTTP Error:', error);
    }
  });
}

}
