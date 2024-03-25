export function parse_time(time: number): { hours: number, minutes: number, seconds: number } {
  const MILISECS_IN_SEC = 1000
  const SEC_IN_MIN = 60
  const MINS_IN_HOUR = 60
  return {
    seconds: Math.floor(time / MILISECS_IN_SEC % SEC_IN_MIN),
    minutes: Math.floor(time / MILISECS_IN_SEC / SEC_IN_MIN % MINS_IN_HOUR),
    hours: Math.floor(time / MILISECS_IN_SEC / SEC_IN_MIN / MINS_IN_HOUR)
  }
}
export function parse_time_string(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(v => parseInt(v))
  return new Date(0, 0, 0, hours, minutes, seconds, 0).getTime()
}
export function time_to_string(time: number): string {
  const { seconds, minutes, hours } = parse_time(time)
  return [hours, minutes, seconds].map(
    x => x.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })).join(':')
}
