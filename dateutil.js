import dayjs from 'dayjs';

const pad = n => (n + '').padStart(2, '0');

export const getYearMonthLabel = date => {
  const d = dayjs(date);
  return `${d.year()}-${pad(d.month() + 1)}`;
};

export const getLastNMonthsPeriod = (date, n) => {
  const d = dayjs(date);
  const start = d.subtract(n - 1, 'month');
  const end = d.add(1, 'month');

  return [
    `${start.year()}-${pad(start.month() + 1)}-01`,
    `${end.year()}-${pad(end.month() + 1)}-01`,
  ];
};

export const getLastNMonthsLabels = (date, n) => {
  const d = dayjs(date);
  let m = d.subtract(n - 1, 'month');
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(`${m.year()}-${pad(m.month() + 1)}`);
    m = m.add(1, 'month');
  }
  return result;
};
