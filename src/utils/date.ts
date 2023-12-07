export enum DiffDateType {
  END = 1,
  CURRENT = 2,
  DAY_AGO = 3,
  WEEKS_AGO = 4,
  MONTH_AGO = 5,
  YEARS_AGO = 6,
  DAY_SEVEN = 7,
  DAY_THREE = 8,
}
export interface IDiffDate {
  str: string;
  type: DiffDateType;
  remainDate?: number;
}

/** 이후 시간 날짜 표시 */
export const diffDateCalculate = (
  startDate: Date,
  endDate: Date
): IDiffDate => {
  // 작업중
  const today = new Date();
  const startDiff = startDate.valueOf() - today.valueOf();
  const endDiff = endDate.valueOf() - today.valueOf();

  const startDiffDay = Math.floor(startDiff / (1000 * 60 * 60 * 24)) + 1;
  if (startDiffDay <= 0) {
    const endDiffDay = Math.floor(endDiff / (1000 * 60 * 60 * 24)) + 1;
    if (endDiffDay < 0) {
      return {
        str: '종료',
        type: DiffDateType.END,
      };
    } else {
      return {
        str: '진행중',
        type: DiffDateType.CURRENT,
      };
    }
  } else {
    const days = startDiffDay;
    if (startDiffDay <= 3)
      return {
        str: '일 후',
        type: DiffDateType.DAY_THREE,
        remainDate: Math.floor(days),
      };
    if (startDiffDay <= 7)
      return {
        str: '일 후',
        type: DiffDateType.DAY_SEVEN,
        remainDate: Math.floor(days),
      };
    if (startDiffDay < 14)
      return {
        str: '일 후',
        type: DiffDateType.DAY_AGO,
        remainDate: Math.floor(days),
      };
    const weeks = days / 7;
    if (weeks < 5)
      return {
        str: '주 후',
        type: DiffDateType.WEEKS_AGO,
        remainDate: Math.floor(weeks),
      };
    const months = days / 30;
    if (months < 12)
      return {
        str: '개월 후',
        type: DiffDateType.MONTH_AGO,
        remainDate: Math.floor(months + 1),
      };
    const years = days / 365;
    return {
      str: '년 후',
      type: DiffDateType.YEARS_AGO,
      remainDate: Math.floor(years),
    };
  }
};

export const checkEndEvent = (endDate: Date) => {
  const today = new Date();
  const diff = endDate.valueOf() - today.valueOf();
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  if (diffDay < 0) {
    return false;
  } else return true;
};
