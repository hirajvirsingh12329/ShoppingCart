import { inject, Injectable } from "@angular/core";
import { Userservice } from "./user.service";
import { User } from "../Models/User";

@Injectable({
    providedIn: 'root'
})
export class Authservice {
    isLogged: Boolean = false;
    userService: Userservice = inject(Userservice);

    login(payload: any): Boolean {
        let user = this.userService.User.find((u) => u.username === payload.email && u.password === payload.password);
    if (user === undefined)
            this.isLogged = false;
        else
            this.isLogged = true;


        return this.isLogged;
    }

    logOut() {
        this.isLogged = false;
    }

   isAuthenticated()
   {
    return this.isLogged;
   }

}