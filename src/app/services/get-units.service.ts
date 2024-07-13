import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})

export class GetUnitsService {

  //# readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";
  readonly apiUrl = "https://run.mocky.io/v3/02efea77-8270-4707-98e9-ba6eb6b981ee";
  //# nesta aula teremos o compartilhamento de informações por meio de servives.
  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations;

    })

  }

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;

  }

  //# busca as unidades filtradas 
  getFilterUnits() {
    return this.filteredUnits;

  }

  setFilterUnits(value: any): void {
    this.filteredUnits = value;

  }
}
