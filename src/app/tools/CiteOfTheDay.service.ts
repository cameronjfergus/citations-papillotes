import {Injectable} from '@angular/core';
import {CiteI} from '../models/Cite';

@Injectable()
export class CiteOfTheDay {
  static getStartYear(citesCount: number): number {
    let startPoint = 1;
    let padding = '';
    let substrLength = 4;
    while (citesCount > startPoint * 365 && startPoint <= 10000) {
      startPoint *= 10;
      padding += '0';
      substrLength--;
    }

    const startYearDate = new Date();
    startYearDate.setFullYear(
      parseInt((new Date()).getFullYear().toString(10).substr(0, substrLength) + padding, 0)
    );

    return startYearDate.getFullYear();
  }

  static yearIs366Days(year: number): boolean {
    const monthFebruaryIndex = 1;
    const estimatedLastDayOfFebruary = new Date(year, monthFebruaryIndex, 29);

    return estimatedLastDayOfFebruary.getMonth() === monthFebruaryIndex;
  }

  static getLastDayOfMonth(iYear: number, jMonth: number): number {
    return (new Date(iYear, jMonth + 1, 0)).getDate();
  }

  static getNumberOfDayInCurrentYear(today: Date, iYear: number): number {
    let numberOfDayInCurrentYear = 0;
    for (let jMonth = 0; jMonth <= today.getMonth(); jMonth++) {
      if (jMonth === today.getMonth()) {
        numberOfDayInCurrentYear += today.getDate();
        break;
      }
      numberOfDayInCurrentYear += CiteOfTheDay.getLastDayOfMonth(iYear, jMonth);
    }

    return numberOfDayInCurrentYear;
  }

  static getStackOfYears(aDate: Date, startYear: number): number[] {
    const years = [];
    const currentYear = aDate.getFullYear();

    if (currentYear === startYear) {
      years[currentYear] = CiteOfTheDay.getNumberOfDayInCurrentYear(aDate, currentYear);

      return years;
    }

    for (let iYear = startYear ; iYear <= currentYear ; iYear++) {
      if (iYear === currentYear) {
        years[iYear] = CiteOfTheDay.getNumberOfDayInCurrentYear(aDate, iYear);
        break;
      }

      years[iYear] = CiteOfTheDay.yearIs366Days(iYear) ? 366 : 365;
    }

    return years;
  }

  getCiteOfTheDay(cites: CiteI[]): CiteI {
    const startYear = CiteOfTheDay.getStartYear(cites.length);
    const years = CiteOfTheDay.getStackOfYears(new Date(), startYear);
    const days = years.reduce((previous, current) => previous + current);

    let citeIndex = 0;
    for (let i = 1 ; i <= days ; i++) {
      if (i === cites.length) {
        citeIndex = 0;
        continue;
      }

      citeIndex++;
    }

    return cites[citeIndex];
  }
}
