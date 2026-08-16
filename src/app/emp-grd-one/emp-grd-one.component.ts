import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Employee } from '../Models/interfaces';
import { CommonSevice } from '../Services/common.service'

@Component({
  selector: 'app-emp-grd-one',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './emp-grd-one.component.html',
  styleUrl: './emp-grd-one.component.css'
})
export class EmpGrdOneComponent {
// Master API storage arrays
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pagedEmployees: Employee[] = [];

  // Search, Sort and Page Tracking configurations
  searchTerm: string = '';
  sortColumn: keyof Employee | '' = '';
  sortAscending: boolean = true;
  
  currentPage: number = 1;
  pageSize: number = 5; // Rows shown per page
  totalPages: number = 1;

  // Track the active row ID being edited along with a clone of its values
  editingEmpId: string | null = null;
  editingRowCopy: Employee | null = null;

  constructor(private http: HttpClient,private CommonSevice: CommonSevice) {}

  ngOnInit(): void {
    this.fetchEmployeeData();
  }

  // 1. Get Data from API
  fetchEmployeeData(): void {
    // Replace with your real microservice API endpoint URL
    this.CommonSevice.getEmployees()
      .subscribe({
        next: (data) => {
          this.allEmployees = data;
          this.applyFilterAndPagination();
        },
        error: (err) => console.error('Error fetching grid data:', err)
      });
  }

  // 2. Filter, Sort, and Chunk Data for view
  applyFilterAndPagination(): void {
    // A. Apply Search Filter across all row string parameters
    let result = [...this.allEmployees];
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(emp => 
        emp.firstname.toLowerCase().includes(term) ||
        emp.lastname.toLowerCase().includes(term) ||
        emp.gender.toLowerCase().includes(term) ||
        emp.address.toLowerCase().includes(term) ||
        emp.pincode.includes(term)
      );
    }

    // B. Apply Sort Matrix
    if (this.sortColumn) {
      result.sort((a, b) => {
        const valA = a[this.sortColumn as keyof Employee];
        const valB = b[this.sortColumn as keyof Employee];

        if (valA < valB) return this.sortAscending ? -1 : 1;
        if (valA > valB) return this.sortAscending ? 1 : -1;
        return 0;
      });
    }

    // C. Calculate Pagination bounds
    this.filteredEmployees = result;
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize) || 1;
    
    // Safety check for page limits
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedEmployees = this.filteredEmployees.slice(startIndex, startIndex + this.pageSize);
  }

  // 3. User Trigger Actions
  onSearch(): void {
    this.currentPage = 1; // Reset to page 1 during new query searches
    this.applyFilterAndPagination();
  }

  onSort(column: keyof Employee): void {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }
    this.applyFilterAndPagination();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilterAndPagination();
    }
  }

  // 4. Inline Row CRUD Editing Management
  startEdit(employee: Employee): void {
    this.editingEmpId = employee.empId;
    this.editingRowCopy = { ...employee }; // Clone deep copy object 
  }

  cancelEdit(): void {
    this.editingEmpId = null;
    this.editingRowCopy = null;
  }

  saveEdit(): void {
    if (!this.editingRowCopy) return;

    const index = this.allEmployees.findIndex(e => e.empId === this.editingRowCopy?.empId);
    if (index !== -1) {
      // Optimistically update the UI model
      this.allEmployees[index] = { ...this.editingRowCopy };
      
      // Send backend API save transaction
      console.log('Sending saved updates to your PUT endpoint:', this.editingRowCopy);
      /*
      this.http.put(`https://example.com/${this.editingRowCopy.empId}`, this.editingRowCopy)
        .subscribe(() => this.fetchEmployeeData());
      */
      
      this.cancelEdit();
      this.applyFilterAndPagination();
    }
  }
}
