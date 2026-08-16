import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSevice } from '../../Services/common.service'
import { Country, City, Employee } from '../../Models/interfaces'
import { FormsModule, NgForm, FormGroup, FormControl } from '@angular/forms';
import { Observable, of, map } from 'rxjs';


@Component({
  selector: 'app-templateRegistration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'

})
export class TemplateRegistrationComponent implements OnInit {

  // 1. Reference the template form variable
  @ViewChild('templateRegistrationForm', { static: true }) userForm!: NgForm;

  countries: Country[] = [];
  cities: City[] = [];
  filtercities: City[] = [];

  selectedCountryCode: string = ""
  selectedCityCode: string = ""
  firstname: String = ""
  errorMessage: String = ""

  employee: Employee = {
    firstname: '',
    lastname: '',
    country: '',
    city: '',
    gender: '',
    pincode: '',
    married: false,
    dateOfBirth: new Date(),
    address: '',
    empId:''
  };

  @ViewChild('templateRegistrationForm') form!: NgForm;
  private CommonSevice = inject(CommonSevice);

  constructor() {
  }

  ngOnInit(): void {
    this.fetchApiContries();
    this.fetchApiCities();    
   // this.GetEmployee();
  }

  // Reads and processes the submitted control values
  onSubmit(): void {
    //if (form.valid) {
    // Subscribing triggers the actual API POST


    this.employee = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      country: this.selectedCountryCode,
      city: this.selectedCityCode,
      pincode: this.form.value.pincode,
      gender: this.form.value.gender,
      married: this.form.value.marriedCheckBox,
      dateOfBirth: this.form.value.dateOfBirth,
      address: this.form.value.address,
      empId:''


    };


    this.CommonSevice.saveEmployee(this.employee).subscribe({
      next: (response: any) => {
        console.log('Data saved successfully!', response);
        alert('User created!');
      },
      error: (error: any) => {
        console.error('Error saving data:', error);
      }
    });


    // Reading individual control values explicitly

    //}
  }

  onCountryChange(): void {
    this.filtercities = this.cities.filter(city => city.countryCode === this.selectedCountryCode);
    this.selectedCityCode = '';
  }

  //  Fetch cities data
  fetchApiCities(): void {
    this.CommonSevice.getCities().subscribe({
      next: (response) => {
        if (!response || response.length === 0) {
          this.errorMessage = 'No data available from the server.';
        } else {
          this.cities = response;          
          this.errorMessage = "no error"; // Clear previous errors
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load data from API.';
        console.error('HTTP Error:', error);
      }
    });
  }


  // 2. Fetch cities data
  fetchApiContries(): void {
    this.CommonSevice.getCountries().subscribe({
      next: (response) => {
        this.countries = response;
        this.errorMessage = ""; // Reset error on successful retry
      },
      error: (error) => {
        this.errorMessage = 'Failed to load data from for countries.';
        console.error('HTTP Error:', error);
      }
    });
  }

  GetEmployee(): void {
    // 3. Fetch data and assign it inside the subscribe block
    this.CommonSevice.getEmployee('1').subscribe({
      next: (data: any) => {
        this.selectedCountryCode = data.country;      
        this.filtercities = this.cities.filter((city => city.countryCode === data.country.trim()));  
        this.employee = {
          firstname: data.firstname,
          lastname: data.lastname,
          country: data.country,
          city: data.city,
          pincode: data.pincode,
          gender: data.dateOfBirth,
          married: data.married,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          empId:''

        };

        this.form.setValue(this.employee);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employee data.';
        console.error(error);
      }
    });

  }
onReset(form: NgForm) {
    // 3. Clear the form when the user clicks the reset button
    this.form.resetForm(); 
  }
  ValidateFrom(): void {


  }

}
