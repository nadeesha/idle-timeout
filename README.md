# universal-idle-timeout

universal-idle-timeout is based on the excellent [idleTimeout](https://github.com/jackmu95/idle-timeout/) which is a zero dependency, ~5KB library to make idle state detection in the browser an ease. universal-idle-timeout maintains a universal user action tracking system across all of the tabs by using localstorage. When localstorage is not available, it gracefully degrades to tracking the actions in the current tab.

## Installation

### Using npm
```bash
npm install @certsy/universal-idle-timeout
```

### Using yarn
```bash
yarn add @certsy/universal-idle-timeout
```


## Usage
idleTimeout is totally easy to use. All you basically need to do is:
```javascript
idleTimeout(() => {
  // Do some cool stuff
});
```


## Documentation
The idleTimeout constructor takes two arguments:
  * `callback [Function]` - _The callback function_
  * `options [Object]` - _An **optional** options object_
    * `element [Element]` - _The element to listen for the timeout_
    * `timeout [Number]` - _The idle timeout (in milliseconds)_

```javascript
const instance = idleTimeout(
  () => {
    // Callback
  },
  {
    element: document,
    timeout: 1000 * 60 * 5,
    loop: false
  }
);
```
