export class Time {
  constructor(
    public hours: number = 0,
    public minutes: number = 0,
    public seconds: number = 0
  ) { }
  public static from(time: string | number): Time {
    if (typeof time == 'string') {
      const [hours, minutes, seconds] = time.split(":").map(v => parseInt(v))
      return { hours, minutes, seconds }
    }
    else {
      const MILISECS_IN_SEC = 1000
      const SEC_IN_MIN = 60
      const MINS_IN_HOUR = 60
      return {
        seconds: Math.floor(time / MILISECS_IN_SEC % SEC_IN_MIN),
        minutes: Math.floor(time / MILISECS_IN_SEC / SEC_IN_MIN % MINS_IN_HOUR),
        hours: Math.floor(time / MILISECS_IN_SEC / SEC_IN_MIN / MINS_IN_HOUR)
      }
    }
  }
  public toString(): string {
    const { seconds, minutes, hours } = this
    return [hours, minutes, seconds].map(
      x => x.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })).join(':')
  }
}
