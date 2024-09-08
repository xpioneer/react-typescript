
export class BaseModel {
  id: string
  createAt: number
  createBy: string
  updateAt: number
  updateBy: string
  deleteAt: number
  deleteBy: string
}


export enum DateFormat {
  Date = 'yyyy-MM-hh',
  DateTime = 'yyyy-MM-hh HH:mm:ss',
  DateTimeM = 'yyyy-MM-hh HH:mm'
}