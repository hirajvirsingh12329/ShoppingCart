import { Component,inject } from '@angular/core';
import { CartService } from '../signal.service';

@Component({
  selector: 'app-singal-comp-one',
  standalone: true,
  imports: [],
  templateUrl: './singal-comp-one.component.html',
  styleUrl: './singal-comp-one.component.css'
})
export class SingalCompOneComponent {
private cartService = inject(CartService);

  addProduct(name: string) {
    this.cartService.addToCart(name);
  }
}
