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

interface InfoObject {
  username: string;
  filepath: string;
}

export { JSONdata, SiteObject, DateObject, MomentObject, InfoObject };