import { LitElement, html, css } from "lit-element";
import { STATUS } from "./timer-status";

/**
 * `<lit-count-down-timer></lit-count-down-timer>`
 * This is a countdown timer web component based on LitElement Library
 * @customElement
 * @lit-element
 * @demo /demo/index.html
 *
 */
class LitCountDownTimer extends LitElement {


  static get properties() {
    return {
      /**
       * Countdown States: not_started, running, completed, paused
       */
      status: {
        type: String,
        reflect: true,
      },
      /**
       * Countdown time
       */
      _time: {
        type: Number,
        reflect: false,
      },
    };
  }

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();

    this._time = 0;
    this._intervalId = null;
    this.status = STATUS.NOTSTARTED;
  }

  static get styles() {
    return css`
      :host {
       display: inline-block;
      }
    `;
  }

  render() {
    return html` ${this._time} `;
  }


  /**
   * to start countdown (set time first)
   */
  start() {
    if (this._intervalId) {
      if (this._time) {
        this._initTimer();
      } else {
        this.countdownCompleted();
      }
    } else {
      this._initTimer();
    }
  }

  /**
   * intialize countdown
   */
  _initTimer() {
    if (this._time <= 0) {
      this.status = STATUS.COMPLETED;
      this.removeInterval();
      throw new Error(`Countdown (${this._userTime}) already completed`);
    }
    this._intervalId = setInterval(() => {
      this.status = STATUS.RUNNING;
      this._time -= 1;
      if (this._time === 0) {
        this.countdownCompleted();
      }
    }, 1000);
  }

  /**
   * pause countdown
   */
  pause() {
    if (this.status === STATUS.RUNNING) {
      this.status = STATUS.PAUSED;
      this.removeInterval();
    } else {
      throw new Error(`Countdown (${this._userTime}) is not in running state. Current state is: ${this.status}`);
    }
  }

  removeInterval() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  /**
   * countdown countdown
   * @event count-down-completed { totaltime: Number }
   */
  countdownCompleted() {
    this.status = STATUS.COMPLETED;
    this.removeInterval();
    this.dispatchEvent(new CustomEvent('count-down-completed', {
      bubbles: true, composed: true, detail: { totaltime: this._userTime }
    }));
  }

  /**
   * set countdown time before starting it
   */
  setTime(time) {
    if (this.status === STATUS.NOTSTARTED) {
      this._time = time;
      this._userTime = this._time;
    } else {
      throw new Error(`Countdown (${this._userTime}) is already started, please reset and then set time before starting it`);
    }
  }

  /**
   * add countdown time (+ / -) to add or to reduce
   */
  addTime(time) {
    if ((this.status === STATUS.NOTSTARTED) && (this._time + time) > 0) {
      this._time += time;
      this._userTime = this._time;
    } else {
      throw new Error(`Countdown (${this._userTime}) is already started or new time (${this._time + time}) is not valid, please reset and then set time before starting it`);
    }
  }

  /**
   * to reset countdowns
   * @event count-down-reset { totaltime: Number }
   */
  reset() {
    this.removeInterval();
    this.status = STATUS.NOTSTARTED;
    this._time = this._userTime || 0;
    this.dispatchEvent(new CustomEvent('count-down-reset', {
      bubbles: true, composed: true, detail: { totaltime: this._userTime }
    }));
  }
}

customElements.define('lit-count-down-timer', LitCountDownTimer);