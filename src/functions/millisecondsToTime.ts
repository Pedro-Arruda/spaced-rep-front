export const millisecondsToTime = (milliseconds: number | string) => {
  const a = new Date(milliseconds).toString()

  return a.toLocaleString().slice(15, 25);
};