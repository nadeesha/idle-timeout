import IdleTimeout from './IdleTimeout';
import OptionsInterface from './interfaces/Options';

export default (callback: () => void, options: OptionsInterface) =>
  new IdleTimeout(callback, options);
