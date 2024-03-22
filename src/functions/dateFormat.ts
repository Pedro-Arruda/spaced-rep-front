export const dateFormat = (value: string | null | undefined) =>
  value
    ? new Intl.DateTimeFormat("pt-BR", {
        timeZone: "UTC",
      }).format(new Date(value))
    : "";

export const dateFormatWithHours = (value: string | null | undefined) => {
  if (value) {
    const date = new Date(value);
    date.setUTCHours(date.getUTCHours() - 3);

    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: "UTC",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  } else {
    return "";
  }
};
