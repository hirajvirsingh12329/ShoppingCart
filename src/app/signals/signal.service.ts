// cart.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes the service a global singleton
})
export class CartService {
  // 1. Maintain the private state using a writable signal
  private cartItems = signal<string[]>([]);

  // 2. Expose a read-only version of the signal to components
  readonly items = this.cartItems.asReadonly();

  // 3. Create a derived computed signal that auto-calculates total item count
  readonly totalItems = computed(() => this.cartItems().length);

  // 4. Methods to modify the state safely using .update()
  addToCart(productName: string) {
    this.cartItems.update(currentItems => [...currentItems, productName]);
  }

  clearCart() {
    this.cartItems.set([]); // Resets the state completely
  }
}
