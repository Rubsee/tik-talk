import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Features {
  code: string;
  label: string;
  value: boolean;
}

export interface Complexitys {
  code: string;
  language: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getAddresses() {
    return of([
      {
        city: 'Москва',
        street: 'Кибальчича',
        building: 8,
        apartment: 18,
      },
      {
        city: 'Санкт-Петербург',
        street: 'Думская',
        building: 13,
        apartment: 6,
      },
    ]);
  }

  getFeatures(): Observable<Features[]> {
    return of([
      {
        code: 'lift',
        label: 'Подъем на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false,
      },
    ]);
  }

  getComplexity(): Observable<Complexitys[]> {
    return of([
      {
        code: 'eng',
        language: 'Английский',
        value: true,
      },
      {
        code: 'gmn',
        language: 'Немецкий',
        value: false,
      },
      {
        code: 'spn',
        language: 'Испанский',
        value: false,
      },
    ]);
  }
}
