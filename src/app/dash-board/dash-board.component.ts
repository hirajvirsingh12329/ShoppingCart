import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent  } from '../footer/footer.component';



@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent,FooterComponent, RouterOutlet],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

}
