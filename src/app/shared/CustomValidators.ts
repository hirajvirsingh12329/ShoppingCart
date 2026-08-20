// username.validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  
  // The function must be static so you can use it without instantiating the class
  static onlyAlphabets(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // If the input is empty, let the 'required' validator handle it
    if (!value) {
      return null;
    }

    // Regex to allow only uppercase and lowercase English alphabets
    const alphabetRegex = /^[a-zA-Z]+$/;
    const isValid = alphabetRegex.test(value);

    // If valid, return null. If invalid, return an error configuration object.
    return isValid ? null : { onlyAlphabets: true };
  }
}
