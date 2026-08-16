import { Component, viewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Authservice } from '../Services/auth.service';
import { Globals } from '../shared/global';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { timer,delay, of } from 'rxjs';
import { LoadingService } from '../shared/components/loader/loader.service';

import { LoaderComponent } from '../shared/components/loader/loader.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule,LoaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoginMode: boolean = true;

  public email = "";
  public password = "";
  invalidCredenatials: boolean = false;
  errorMessage: string = "Inalid user or password";
  isValidUser: Boolean = true;
  //isLoading: boolean = false; 

  // Do NOT use @ before viewChild
  loginForm = viewChild<NgForm>('LoginForm');


  constructor(private authService: Authservice, private globals: Globals, private router: Router,
    private loadingService: LoadingService
  ) {

  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    //return true;
  }

  isValidPassword(): boolean {
    return this.password.length >= 6;
  }


  login() {
 this.loadingService.show();
 //this.isLoading = true;
   setTimeout(() => 
    {
    this.invalidCredenatials = false;
    if (this.isValidEmail() && this.isValidPassword()) {


      //this.globals.showLoader();
      const payload = {
        email: this.loginForm()?.controls['username']?.value,
        password: this.loginForm()?.controls['password']?.value
      };

      this.authService.login(payload)
      {
        this.router.navigate(['/dashboard']);
        //this.globals.hideLoader();
        this.isValidUser = this.authService.isLogged;
        //this.isLoading = false;
         this.loadingService.hide();
      }
    }
    else {
      this.isValidUser = false;
      
    }

    }, 200);   

  }
}
