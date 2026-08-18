import { Routes } from '@angular/router';
import { AuthComponent } from '../app/auth/auth.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { MybrandComponent } from './mybrand/mybrand.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TemplateRegistrationComponent } from '../app/forms/template-form/template-form.component';
import { EmpGrdOneComponent } from './emp-grd-one/emp-grd-one.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';

export const routes: Routes = [

    { path: '', component: AuthComponent },
    { path: 'home', component: AuthComponent },
    { path: 'Login', component: AuthComponent },
    {
        path: 'dashboard', component: DashBoardComponent,
        children: [
            { path: 'contactus', component: ContactusComponent },
            { path: 'employee', component: EmpGrdOneComponent },
            { path: 'product', component: MybrandComponent },
            { path: 'mybrand', component: MybrandComponent },
            { path: 'registration', component: TemplateRegistrationComponent },
            { path: 'reactive', component: ReactiveFormComponent }
            
        ]
    },


    { path: '**', redirectTo: '' }
];
