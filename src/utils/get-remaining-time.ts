import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const ONE_HOUR = 3600;

export const getRemainingTime = (remainingTime: number): string => {
  const remainingTimeFormat = remainingTime >= ONE_HOUR ? '-HH:mm:ss' : '-mm:ss';
  return dayjs.duration(remainingTime, 'seconds').format(remainingTimeFormat);
};
