export interface JSONData {
  search: DateObject,
  campsites: SiteObject[],
  reservations: DateObject[]
}

export interface SiteObject {
  id: number;
  name: string;
}

export interface DateObject {
  campsiteId?: number;
  startDate: string;
  endDate: string;
}

export interface MomentObject {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

export interface InfoObject {
  username: string;
  filepath: string;
}
