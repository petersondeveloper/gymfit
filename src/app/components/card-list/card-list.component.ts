import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../../types/location.interface';
import { CardComponent } from "../card/card.component";
import { AppComponent } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
  imports: [CardComponent, CommonModule]
})

export class CardListComponent implements OnInit {
  @Input() unitsList: Location[] = [];

  constructor() { }

  ngOnInit(): void {
   
  }

}
