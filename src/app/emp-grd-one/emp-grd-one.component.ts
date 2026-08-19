import { Component ,ElementRef,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Employee } from '../Models/interfaces';
import { CommonSevice } from '../Services/common.service'
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-emp-grd-one',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './emp-grd-one.component.html',
  styleUrl: './emp-grd-one.component.css'
})
export class EmpGrdOneComponent {
  // Master data
  employees: Employee[] = [];

  // Filter and Pagination state
  filteredEmployees: Employee[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15];

  // Track editing row
  editingEmpId: string | null = null;
  editCache: any = {};

  sortKey: string = '';
  isAscending: boolean = true;

  @ViewChild('editDialog') editDialog!: ElementRef<HTMLDialogElement>;

  constructor(private CommonSevice: CommonSevice) {
    // Initialize data source with an empty array to prevent template errors before API resolves
  }
  ngOnInit(): void {
    this.fetchEmployeeData();
    // this.loadMockData();
    this.applyFilter();
  }

  // 1. Get Data from API
  fetchEmployeeData(): void {
    // Replace with your real microservice API endpoint URL
    this.CommonSevice.getEmployees()
      .subscribe({
        next: (data) => {
          this.employees = data;
          this.filteredEmployees = data;
          const startIndex = (this.currentPage - 1) * this.pageSize;
          this.filteredEmployees = this.employees.slice(startIndex, startIndex + this.pageSize);
          this.sort('empId'); // Default sort by empId on initial load

        },
        error: (err) => console.error('Error fetching grid data:', err)
      });
  }

  /*
loadMockData(): void {
    // Generates mock data for testing pagination
    const countries = ['India', 'USA', 'UK', 'Canada'];
    const cities = ['New Delhi', 'New York', 'London', 'Toronto'];
    
    for (let i = 1; i <= 25; i++) {
      this.employees.push({
        empId: `EMP00${i}`,
        firstname: `John${i}`,
        lastname: `Doe${i}`,
        country: countries[i % countries.length],
        city: cities[i % cities.length],
        gender: i % 2 === 0 ? 'Male' : 'Female',
        pincode: `11000${i}`,
        married: i % 3 === 0,
        dateOfBirth: new Date(1990 + (i % 10), i % 12, i % 28),
        address: `${i}23, Baker Street`
      });
    }
  }
*/

  // Filter logic
  applyFilter(): void {
    if (!this.searchText) {
      this.filteredEmployees = [...this.employees];
    } else {
      const search = this.searchText.toLowerCase();
      this.filteredEmployees = this.employees.filter(emp =>
        emp.firstname.toLowerCase().includes(search) ||
        emp.lastname.toLowerCase().includes(search) ||
        emp.city.toLowerCase().includes(search)
      );
    }
    this.currentPage = 1; // Reset to page 1 on filter change
  }

  // Pagination getters
  get totalPages(): number {
    console.log(this.employees.length / this.pageSize);
    return Math.ceil(this.employees.length / this.pageSize) || 1;
  }

  get pagedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(startIndex, startIndex + this.pageSize);
  }

  // Pagination navigation
  onPageSizeChange(): void {
    this.currentPage = 1;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredEmployees = this.employees.slice(startIndex, startIndex + this.pageSize);
  }

  prevPage(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredEmployees = this.employees.slice(startIndex, startIndex + this.pageSize);
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    else {
      this.currentPage = 0;
    }

  }
  nextPage(): void {

    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredEmployees = this.employees.slice(startIndex, startIndex + this.pageSize);
  }

  // Inline Edit CRUD actions
  startEdit(employee: Employee): void {
    this.editingEmpId = employee.empId;
    // Deep clone row for independent cancellation
    this.editCache = { ...employee };
  }

  saveEdit(index: number): void {
    const globalIndex = this.employees.findIndex(e => e.empId === this.editingEmpId);
    if (globalIndex !== -1) {
      this.employees[globalIndex] = { ...this.editCache };
      this.applyFilter();
    }
    this.editingEmpId = null;
  }

  cancelEdit(): void {
    this.editingEmpId = null;
    this.editCache = {};
  }

  // Delete Action
  deleteEmployee(empId: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(e => e.empId !== empId);
      this.applyFilter();
      // Adjust current page if last item on page is deleted
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    }
  }
  sort(key: string): void {
    // If clicking the same column, toggle direction. If new column, default to ascending.
    if (this.sortKey === key) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortKey = key;
      this.isAscending = true;
    }

    // Basic array sort execution
    this.filteredEmployees.sort((a: any, b: any) => {
      if (a[key] < b[key]) return this.isAscending ? -1 : 1;
      if (a[key] > b[key]) return this.isAscending ? 1 : -1;
      return 0;
    });
  }
  downloadTable(): void {
    // 1. Map dataset to structured key-value pairs (Filters out sorting icons and action cells)
    const dataToExport = this.filteredEmployees.map(emp => ({
      'Emp ID': emp.empId,
      'First Name': emp.firstname,
      'Last Name': emp.lastname,
      'Gender': emp.gender,
      'Country': emp.country,
      'City': emp.city,
      'Pincode': emp.pincode,
      'Married': emp.married ? 'Yes' : 'No' // Translates true/false boolean explicitly
    }));

    // 2. Turn transformed data into an Excel worksheet object
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

    // 3. Form a fresh workbook and append our worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employee Data');

    // 4. Trigger download directly natively inside modern browsers
    XLSX.writeFile(workbook, 'Employee_Records.xlsx');
  }
  

}
