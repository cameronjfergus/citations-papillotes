import { CiteOfTheDay } from './CiteOfTheDay.service';

describe('CiteOfTheDayService', () => {
  it('should return startYear as current year', () => {
    const expected = (new Date()).getFullYear();
    expect(CiteOfTheDay.getStartYear(300)).toEqual(expected);
  });

  it('should return startYear as current decade', () => {
    let expected = (new Date()).getFullYear().toString();
    expected = expected.substr(0, 3) + '0';
    expect(CiteOfTheDay.getStartYear(400)).toEqual(parseInt(expected, 0));
  });

  it('should return startYear as current century', () => {
    let expected = (new Date()).getFullYear().toString();
    expected = expected.substr(0, 2) + '0';
    expect(CiteOfTheDay.getStartYear(4000)).toEqual(parseInt(expected, 0));
  });

  it('should return startYear as current millenium', () => {
    let expected = (new Date()).getFullYear().toString();
    expected = expected.substr(0, 1) + '0';
    expect(CiteOfTheDay.getStartYear(40000)).toEqual(parseInt(expected, 0));
  });

  it('should return startYear as current 0 BC', () => {
    const expected = 0;
    expect(CiteOfTheDay.getStartYear(400000)).toEqual(expected);
  });
});
