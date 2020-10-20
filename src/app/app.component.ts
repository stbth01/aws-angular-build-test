import { PetResource } from './pet/pet.resource';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'valhalla';
  pets = [];
  constructor(private petResource: PetResource) {
  }

  getPets() {
    this.petResource.getPets().subscribe(data => {
      console.log(data);
      this.pets = data;
    });
  }
}
