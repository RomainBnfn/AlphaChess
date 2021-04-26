export class Timer {
  private _maxSeconds: number = -1;
  private _actualSeconds: number = -1;

  private _whenIsDone: Function;

  private _timer: any;

  constructor(minutes: number, whenIsDone: Function) {
    if (minutes >= 0) {
      this._maxSeconds = Math.floor(minutes * 60);
      this._actualSeconds = 0;
    }

    this._whenIsDone = whenIsDone;
  }

  public start() {
    if (this.isInfinite) {
      return;
    }
    this._timer = setInterval(() => {
      this.tick();
      if (this.isFinish) {
        this.end();
      }
    }, 1000);
  }

  public pause() {
    clearInterval(this._timer);
  }

  public reset(minutes: number) {
    this.pause();
    if (minutes >= 0) {
      this._maxSeconds = Math.floor(minutes * 60);
      this._actualSeconds = 0;
    } else {
      this._maxSeconds = -1;
      this._actualSeconds = -1;
    }
  }

  tick() {
    this._actualSeconds += 1;
  }

  end() {
    clearInterval(this._timer);
    this._whenIsDone();
  }

  get isFinish(): boolean {
    return this._actualSeconds > this._maxSeconds;
  }

  get isInfinite(): boolean {
    return this._maxSeconds == -1;
  }

  get time(): string {
    if (this.isInfinite) {
      return '∞';
    }
    let miliRestant = this._maxSeconds - this._actualSeconds;
    let minutes = Math.floor(miliRestant / 60);
    let secondes = miliRestant % 60;
    let strSecondes = secondes < 10 ? '0' + secondes : secondes;
    return minutes + ':' + strSecondes;
  }
}
