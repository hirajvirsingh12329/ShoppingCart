import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class Globals {

     loading: boolean = false;
     
  showLoader() {
        setTimeout(() => {
            this.loading = true;
        });
        // Ensure Angular detects the change
    }

    hideLoader() {
        this.loading = false;
        // Ensure Angular detects the change
    }

    isLoading(): boolean {
        return this.loading;
    }

}