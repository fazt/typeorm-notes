import moment from 'moment';

export const formatDate = (dateToFormat: string) => {
  return moment(dateToFormat).fromNow();
};
