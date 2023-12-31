export enum DateType {
  LUNAR = 'LUNAR',
  SOLAR = 'SOLAR',
}

export class Event {
  name: string
  date: string

  dateType = DateType.SOLAR

  constructor(name: string, date: string, dateType: DateType) {
    this.name = name
    this.date = date
    this.dateType = dateType
  }
}
