import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,  FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterUnitsService } from '../../services/filter-units.service';
import { Location } from '../../types/location.interface';


@Component({
  selector: 'app-forms',
  standalone: true,
  providers: [GetUnitsService],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})

export class FormsComponent implements OnInit {

  //# cria propriedade do tipo output
  @Output() submitEvent = new EventEmitter();
  
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor (private formBuilder: FormBuilder, 
    private unitService: GetUnitsService, 
    private filterUnitsService: FilterUnitsService) { }

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe( data => {
      this.results = data;
      this.filteredResults = data;

    });

    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
    
  }

  onClean(): void {
    this.formGroup.reset();
  }

  onSubmit(): void {

    //# recebo os dados do form e declaro 2 variaveis
    let {showClosed, hour} = this.formGroup.value;

    //# filtro os registros 
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.unitService.setFilterUnits(this.filteredResults);

    this.submitEvent.emit();

  }

}
