import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSevice } from '../../Services/common.service'
import { Country, City } from '../../Models/interfaces'
import { FormsModule, NgForm, FormGroup, FormControl } from '@angular/forms';
import { Observable, of, map } from 'rxjs';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  countries: Country[] = [];
  cities: City[] = [];
  filtercities: City[] = [];

  selectedCountryCode: string = ""
  selectedCityCode: string = ""
  firstname: String = ""

  @ViewChild('RegistrationForm') form!: NgForm;

  private CommonSevice = inject(CommonSevice);

  constructor() {
  }

  ngOnInit(): void {
    // If using the Observable approach (Recommended):
    this.CommonSevice.getCities().subscribe({
      next: (data) => this.cities = data,
      error: (err) => console.error(err)
    });

    this.CommonSevice.getCountries().subscribe({
      next: (data) => this.countries = data,
      error: (err) => console.error(err)
    });
  }

  // Reads and processes the submitted control values
  onSubmit(): void {
    //if (form.valid) {
    console.log('Form Submitted successfully!');
    console.log('Form Values:', this.form.value.empfirtname);

    // Reading individual control values explicitly
    const firstname = this.form.value.emplastname;
    //}
  }

  onCountryChange(): void {
    this.filtercities = this.cities.filter(city => city.countryCode === this.selectedCountryCode);
    this.selectedCityCode = '';
  }

}
