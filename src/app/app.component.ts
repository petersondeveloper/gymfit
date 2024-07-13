import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FormsComponent } from "./components/forms/forms.component";
import { CardListComponent } from "./components/card-list/card-list.component";
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Location } from './types/location.interface';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { GetUnitsService } from './services/get-units.service';
import { FilterUnitsService } from './services/filter-units.service';
import { FormGroup } from '@angular/forms';
import { LegendComponent } from './components/legend/legend.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    HeaderComponent, 
    HttpClientModule, 
    CardListComponent,
    CommonModule,
    FormsComponent,
    LegendComponent
        
  ],
  providers:[HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
  formGroup!: FormGroup;
  unitsList: Location[] = [];
  showList = new BehaviorSubject(false);

  constructor(private unitService: GetUnitsService, private filterUnitService: FilterUnitsService) {
    
  }

  onSubmit(){
    //# this.unitsList = this.filterUnitService.filter(this.unitService.getFilterUnits(),true,'morning');
    this.unitsList = this.unitService.getFilterUnits();
    this.showList.next(true);

  }
}
