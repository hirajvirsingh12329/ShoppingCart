import { inject, Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { Country, City, Employee } from '../Models/interfaces';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CommonSevice {

    private apiUrl = 'https://tesapplication-99bca-default-rtdb.firebaseio.com/cities.json';
    private apiCountriesUrl = 'https://tesapplication-99bca-default-rtdb.firebaseio.com/countries.json';
    private apiEmployeesUrl = 'https://tesapplication-99bca-default-rtdb.firebaseio.com/employees.json';
    private apiFetchEmployee = 'https://tesapplication-99bca-default-rtdb.firebaseio.com/employees/1.json';

    // Inject the HttpClient instance using the modern inject() function
    private http = inject(HttpClient);

    constructor() { }
    
    // Template form section
    templategetCities(): City[] {
        return [
            { code: '1', name: 'Mumbai', countryCode: 'IN' },
            { code: '2', name: 'Delhi', countryCode: 'IN' },
            { code: '3', name: 'New York', countryCode: 'US' },
            { code: '4', name: 'Los Angeles', countryCode: 'US' },
            { code: '5', name: 'Toronto', countryCode: 'CA' },
            { code: '6', name: 'Vancouver', countryCode: 'CA' }
        ]
    }

    templategetCountries(): Country[] {
        return [
            { code: 'IN', name: 'India' },
            { code: 'US', name: 'United States' },
            { code: 'CA', name: 'Canada' }
        ]
    }



    // Method to fetch data, returning an Observable typed with your interface
    getCities(): Observable<City[]> {
        return this.http.get<City[]>(this.apiUrl);
    }

    // Method to fetch data, returning an Observable typed with your interface
    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(this.apiCountriesUrl);
    }

      // Method to fetch data, returning an Observable typed with your interface
    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiEmployeesUrl);
    }

    // Configure headers if your API requires specific content types
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    saveEmployee(userData: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.apiEmployeesUrl, userData, this.httpOptions);
    }

    // Function using HttpParams for URL query strings
  getEmployee(empId: string): Observable<Employee> {
 const params = new HttpParams()
     .set('orderBy', '"empId"')
    .set('equalTo', `"${empId}"`);    
    //.set('empId', empId);
    //return this.http.get<Employee>(this.apiFetchEmployee, { params });
    return this.http.get<Employee>(this.apiFetchEmployee);
  }

}