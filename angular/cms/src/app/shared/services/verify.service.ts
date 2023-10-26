import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  pattern: RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s',.+>/-]+$/
  constructor() { }

  verifyString(string: string): string {
    if (typeof string === 'string') {
      if (this.pattern.test(string)) {
        return string;
      } else {
        throw new Error("La chaîne contient des caractères non autorisés.");
      }
    } else {
      throw new Error("La valeur n'est pas une chaîne de caractères.");
    }
  }

  verifyArrayOfStrings(strings: string[]): string[] {
    if (Array.isArray(strings)) {
      return strings.map(str => this.verifyString(str));
    } else {
      throw new Error("La valeur n'est pas un tableau de chaînes de caractères.");
    }
  }

}
