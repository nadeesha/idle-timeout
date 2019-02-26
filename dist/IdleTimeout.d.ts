import OptionsInterface from './interfaces/Options';
export default class IdleTimeout {
    protected storageKey: string;
    protected callback: () => void;
    protected options: OptionsInterface;
    protected timeoutHandle: number | null;
    protected isIdle: boolean;
    protected startTime: number;
    protected remainingTime: number;
    protected lastPageX: number;
    protected lastPageY: number;
    protected eventNames: string[];
    protected activeUniversalActionInThrottle: boolean;
    constructor(callback: () => void, options: OptionsInterface);
    protected resetTimeout(): void;
    /**
     * Handle the input events.
     * @param {Event} event The input event.
     * @returns {void}
     */
    protected handleEvent: (event: Event) => void;
    protected recordUniversalLastActionTime(): void;
    protected getUniversalLastActionTime(): number;
    protected handleTimeout(): void;
    readonly idle: boolean;
}
