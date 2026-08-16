// loading.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // A simple primitive property instead of a Signal or Subject
  public isLoading: boolean = false;

  show(): void {
    this.isLoading = true;
  }

  hide(): void {
    this.isLoading = false;
  }
}
