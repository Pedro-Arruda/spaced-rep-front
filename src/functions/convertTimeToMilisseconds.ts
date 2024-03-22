export const convertTimeToMilisseconds = (time: string) => {
  const value = Number(time.slice(0, -1));

  switch (time.slice(-1)) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};
