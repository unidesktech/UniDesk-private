export const combineDateAndTime = (
  date: string,
  time: string,
): Date | undefined => {
  if (!date || !time) return undefined;
  return new Date(`${date}T${time}:00`);
};

export const sanitizeParams = (value?: string) => {
  if (!value || value === 'undefined' || value === 'null') {
    return undefined;
  }
  return value;
};
