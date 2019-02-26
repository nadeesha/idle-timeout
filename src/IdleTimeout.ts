import OptionsInterface from './interfaces/Options';

export default class IdleTimeout {
  protected storageKey = 'IDLE_TIMEOUT_UNIVERSAL_LAST_ACTION_TIME';

  protected callback: () => void;

  protected options: OptionsInterface;

  protected timeoutHandle: number | null = null;

  protected isIdle: boolean = false;

  protected startTime: number = 0;

  protected remainingTime: number = 0;

  protected lastPageX: number = -1;

  protected lastPageY: number = -1;

  protected eventNames: string[] = [
    'DOMMouseScroll',
    'mousedown',
    'mousemove',
    'mousewheel',
    'MSPointerDown',
    'MSPointerMove',
    'keydown',
    'touchmove',
    'touchstart',
    'wheel'
  ];

  protected activeUniversalActionInThrottle = false;

  public constructor(callback: () => void, options: OptionsInterface) {
    this.callback = callback;
    this.options = {
      element: document.body,
      ...options
    };

    const element = this.options.element;
    this.eventNames.forEach(eventName => {
      element.addEventListener(eventName, this.handleEvent);
    });

    this.resetTimeout();
  }

  protected resetTimeout(): void {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }

    if (this.isIdle && !this.options.loop) {
      return;
    }

    this.timeoutHandle = setTimeout(() => {
      this.handleTimeout();
    }, this.remainingTime || this.options.timeout);

    this.startTime = new Date().getTime();
  }

  /**
   * Handle the input events.
   * @param {Event} event The input event.
   * @returns {void}
   */
  protected handleEvent = (event: Event): void => {
    if (this.remainingTime > 0) {
      return;
    }

    if (event.type === 'mousemove') {
      const { pageX, pageY } = event as MouseEvent;
      if (
        (pageX === undefined && pageY === undefined) ||
        (pageX === this.lastPageX && pageY === this.lastPageY)
      ) {
        return;
      }

      this.lastPageX = pageX;
      this.lastPageY = pageY;
    }

    this.resetTimeout();
  };

  protected recordUniversalLastActionTime(): void {
    if (this.activeUniversalActionInThrottle) {
      return;
    }

    this.activeUniversalActionInThrottle = true;

    setTimeout(() => {
      try {
        window.localStorage.setItem(this.storageKey, Date.now().toString());
      } catch (e) {
        // nothing. fail silently
      } finally {
        this.activeUniversalActionInThrottle = false;
      }
    }, 5000);
  }

  protected getUniversalLastActionTime(): number {
    const fallbackTime = 0;

    try {
      return Number(window.localStorage.getItem(this.storageKey)) || fallbackTime;
    } catch (e) {
      return fallbackTime;
    }
  }

  protected handleTimeout(): void {
    const timeSinceLastUniversalAction = Date.now() - this.getUniversalLastActionTime();
    const universalActionOccuredDuringTimeout = timeSinceLastUniversalAction < this.options.timeout;

    if (universalActionOccuredDuringTimeout) {
      this.isIdle = false;
      this.resetTimeout();
    } else {
      this.isIdle = true;
      this.resetTimeout();

      this.callback();
    }
  }

  public get idle() {
    return this.isIdle;
  }
}
