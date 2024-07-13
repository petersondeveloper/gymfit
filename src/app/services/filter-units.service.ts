import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';
import { GetUnitsService } from './get-units.service';

const OPENNING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root'

})
export class FilterUnitsService {

  lOk: boolean = false;
  constructor(private filterUnitsService: GetUnitsService) { }

  //# transformar o weekday o dia da semana em texto conforme est� sendo recebido no Json
  transformWeekDay(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }

  //# 
  filterUnits(unit: Location, open_hour: string, closed_hour: string) {

    let lOk = false;

    if (!unit.schedules) return true;

    let open_hour_filter = parseInt(open_hour, 10);
    let closed_hour_filter = parseInt(closed_hour, 10);

    //# pega a data do dia e converte ela em dia por extenso para ficar igual ao que vem na api
    let todayWeekDay = this.transformWeekDay(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {

      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays

      if (schedule_weekday === todayWeekDay) {

        if (schedule_hour !== 'Fechada') {

          //# tratar o schedule hour "hour": "06h30 às 08h30"
          let times = schedule_hour.split(' às ')
          let unit_open_hour_int = parseInt(times[0].substring(0, 2))//# parseInt(unit_open_hour.replace('h', ''), 10);
          let unit_closed_hour_int = parseInt(times[1].substring(0, 2))//# parseInt(unit_closed_hour.replace('h', ''), 10);

          //# 18:00 as 23:00   |  17h00 as 21:00 
          if (unit_open_hour_int <= open_hour_filter && unit_closed_hour_int <= closed_hour_filter) {
            lOk = true;
            
          };

        }
      }
    }

    return lOk;

  }

  //# filtro que recebe valores do form
  filter(results: Location[], showClosed: boolean, hour: string) {

    let intermediateResults = results;

    if (!showClosed) {
      let intermediateResults = results.filter(location => location.opened === true)
      
    }

    if (hour) {
      //# criei 2 constantes que coletam os valores do formulario dos radiobuttons sendo morning, afeternoo and night
      const OPEN_HOUR = OPENNING_HOURS[hour as HOUR_INDEXES].first
      const CLOSED_HOUR = OPENNING_HOURS[hour as HOUR_INDEXES].last

      //# o filtro atualiza o BehaviorSubject do getUnits para ser acessivel por toda aplica��o
      let filteredResults = intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSED_HOUR));
      this.filterUnitsService.setFilterUnits(filteredResults);

      return filteredResults;

    } else {
      return intermediateResults;

    }

  }
}
