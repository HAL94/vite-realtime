export const periodTemplate = `Performance across all games in [Month], [Year]`

export function getStartAndEndDates(value: string) {
  try {
    const month = parseInt(value, 10);
    const year = new Date(Date.now()).getFullYear();
    const startDate = new Date(year, month, 1);

    const nextMonthFirstDay = new Date(year, month + 1, 1);

    // Then, go back one day to get the last day of the current month
    const endDate = new Date(nextMonthFirstDay.getTime() - 24 * 60 * 60 * 1000);

    const periodDate = { start: startDate, end: endDate, limit: 5 };

    return periodDate;
  } catch (error) {
    throw error;
  }
}

export const MONTHS_STR = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export const MONTHS_NUM: { [key: number]: string } = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export function constructPeriodDescription(date: Date, formatString: string) {
  const year = date.getFullYear();

  const month = MONTHS_NUM[date.getMonth()];

  // Replace placeholders with actual values
  let formattedString = formatString.replace("[Month]", month);
  formattedString = formattedString.replace("[Year]", String(year));

  return formattedString;
}

export function initializeCurrentPeriod() {
    
    const currentMonth = new Date(Date.now()).getMonth();
    const monthStr = MONTHS_NUM[currentMonth] as keyof typeof MONTHS_STR;
    return getStartAndEndDates(String(MONTHS_STR[monthStr]))


}
