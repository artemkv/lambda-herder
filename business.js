export const getTrend = aa => {
  if (!aa || aa.length < 1) {
    return 0;
  }

  let firstValuePos = 0;
  while (aa[firstValuePos] === 0) {
    firstValuePos++;
  }
  if (aa.length - firstValuePos <= 1) {
    return 0;
  }

  const head = aa.slice(firstValuePos, -1);
  const tail = aa.slice(-1);

  const headSum = head.reduce((a, b) => a + b, 0);
  const headAvg = headSum / (aa.length - firstValuePos - 1) || 0;

  const tailSum = tail.reduce((a, b) => a + b, 0);
  const tailAvg = tailSum / tail.length || 0;

  return ((tailAvg - headAvg) * 100) / headAvg || 0;
};
