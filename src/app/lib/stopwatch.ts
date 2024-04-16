export class Stopwatch {
  start: number
  constructor() {
    this.start = Date.now()
  }
  public get time(): number {
    return Date.now() - this.start
  }
  public static get default(): Stopwatch {
    return new Stopwatch()
  }
}
