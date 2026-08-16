import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SignalCompTwoComponent } from '../signals/signal-comp-two/signal-comp-two.component'
import { SingalCompOneComponent } from '../signals/singal-comp-one/singal-comp-one.component'
@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule,SignalCompTwoComponent,SingalCompOneComponent],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

 cities = signal<string[]>(['Delhi', 'Mumbai', 'Bangalore']);
// 1. Initialize the signals with default boolean values
  isSidebarOpen = signal(false);
  showAlert = signal(true);

  constructor()
  {
    
  }


  UpdateCities(): void {
  this.cities.update(items => {
    items.push('Lucknow');
    return items; 
  });
}

 // 2. Create a method to toggle the state using the .update() API
  toggleSidebar() {
    this.isSidebarOpen.update(currentState => !currentState);
  }

  toggleAlert() {
    this.showAlert.update(currentState => !currentState);
  }
}


