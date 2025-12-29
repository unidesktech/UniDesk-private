export const combineDateAndTime = (
  date: string,
  time: string,
): Date | undefined => {
  if (!date || !time) return undefined;
  if (date.includes('T')) {
    date = date.split('T')[0];
  }
  return new Date(`${date}T${time}:00`);
};
