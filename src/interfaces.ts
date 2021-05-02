interface JSONdata {
  search: DateObject;
  campsites: SiteObject[];
  reservations: DateObject[];
}

interface SiteObject {
  id: number;
  name: string;
}

interface DateObject {
  campsiteId?: number;
  startDate: string;
  endDate: string;
}

interface MomentObject {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

export { JSONdata, SiteObject, DateObject, MomentObject };