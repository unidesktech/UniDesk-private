export const combineDateAndTime = (
  date: string,
  time: string,
): Date | undefined => {
  if (!date || !time) return undefined;
  return new Date(`${date}T${time}:00`);
};
