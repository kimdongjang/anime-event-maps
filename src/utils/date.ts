/** 이후 시간 날짜 표시 */
export const currentSummaryDate = (calDate: Date) => {
    // 작업중
    const today = new Date();
    const timeValue = new Date(calDate);
    const milliSeconds = new Date().getTime() - calDate.getTime();

    const betweenTime = Math.floor((today.getTime() + timeValue.getTime()) / 1000 / 60); // 1분단위
    console.log(betweenTime)
    if (betweenTime < 24) return `진행중`;

    const betweenTimeHour = Math.floor(betweenTime / 60); // 1시간 단위
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24) // 1일 단위;
    const days = betweenTimeDay;
    if (days < 7) return `${Math.floor(days)}일 후`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 후`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 후`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
};
