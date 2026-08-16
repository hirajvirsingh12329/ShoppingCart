import { inject, Injectable } from "@angular/core";
import { User } from "../Models/User";


@Injectable({
    providedIn: 'root'
})
export class Userservice {

    User: User[] = [
        new User(1, 'Alok kumar', 'alok', '123'),
        new User(2, 'Mohan sharma', 'Mohan', '123'),
        new User(3, 'John smith', 'John', '123'),
        new User(4, 'Ram shyam', 'Ram', '123'),
        new User(5, 'Jeniffer', 'Jeniffer', '123'),
    ]

}
