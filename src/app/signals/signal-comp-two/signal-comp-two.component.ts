import { Component, inject } from '@angular/core';
import { CartService } from '../signal.service';


@Component({
  selector: 'app-signal-comp-two',
  standalone: true,
  imports: [],
  templateUrl: './signal-comp-two.component.html',
  styleUrl: './signal-comp-two.component.css'
})
export class SignalCompTwoComponent {
protected cartService = inject(CartService);
}
