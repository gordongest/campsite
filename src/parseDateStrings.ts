import moment from 'moment';
import { DateObject, MomentObject } from './interfaces';

export const parseDateStrings = (dates: DateObject): MomentObject => {
  return {
    startDate: moment(dates.startDate),
    endDate: moment(dates.endDate),
  };
};
