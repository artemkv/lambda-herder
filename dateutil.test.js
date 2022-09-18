import {getLastNMonthsPeriod, getLastNMonthsLabels} from './dateutil';

test('last 6 months', () => {
  const date = new Date('2022-09-17T00:00:00.000Z');

  const [start, end] = getLastNMonthsPeriod(date, 6);
  expect(start).toEqual('2022-04-01');
  expect(end).toEqual('2022-10-01');
});

test('last 6 months on year border', () => {
  const date = new Date('2022-03-15T00:00:00.000Z');

  const [start, end] = getLastNMonthsPeriod(date, 6);
  expect(start).toEqual('2021-10-01');
  expect(end).toEqual('2022-04-01');
});

test('last 6 months labels', () => {
  const date = new Date('2022-09-17T00:00:00.000Z');

  const labels = getLastNMonthsLabels(date, 6);
  expect(labels).toStrictEqual([
    '2022-04',
    '2022-05',
    '2022-06',
    '2022-07',
    '2022-08',
    '2022-09',
  ]);
});

test('last 6 months labels on year border', () => {
  const date = new Date('2022-03-15T00:00:00.000Z');

  const labels = getLastNMonthsLabels(date, 6);
  expect(labels).toStrictEqual([
    '2021-10',
    '2021-11',
    '2021-12',
    '2022-01',
    '2022-02',
    '2022-03',
  ]);
});
