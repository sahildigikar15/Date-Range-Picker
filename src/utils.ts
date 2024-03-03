function isWeekend(date: Date): boolean {
    const day: number = date.getDay();
    return day === 0 || day === 6;
}

export default isWeekend;
