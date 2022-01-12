import dayjs from 'dayjs';

export const getDatetime = (date: string): string => dayjs(date).format('YYYY-MM-DD');
export const getHumanizedDateTime = (date: string): string => dayjs(date).format('MMMM D, YYYY');
