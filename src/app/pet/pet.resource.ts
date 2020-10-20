import { Pet } from './pet.class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PetResource {
  baseUrl = 'https://meke775l45.execute-api.us-east-1.amazonaws.com/local/';
  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl + `pets`);
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(this.baseUrl + `pets/${id}`);
  }
}
