
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
  Date = 'yyyy-MM-dd',
  DateDiagonal = 'yyyy/MM/dd',
  DateTime = 'yyyy-MM-dd HH:mm:ss',
  DateTimeM = 'yyyy-MM-dd HH:mm',
  DateTimeMS = 'yyyy-MM-dd HH:mm:SSS'
}