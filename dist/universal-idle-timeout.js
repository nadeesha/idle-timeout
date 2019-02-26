/*! universalIdleTimeout v0.0.1 | Copyright (c) 2016-2018 Jacob Müller */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["universalIdleTimeout"] = factory();
	else
		root["universalIdleTimeout"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/IdleTimeout.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var IdleTimeout = /** @class */ (function () {
    function IdleTimeout(callback, options) {
        var _this = this;
        this.storageKey = 'IDLE_TIMEOUT_UNIVERSAL_LAST_ACTION_TIME';
        this.timeoutHandle = null;
        this.isIdle = false;
        this.startTime = 0;
        this.remainingTime = 0;
        this.lastPageX = -1;
        this.lastPageY = -1;
        this.eventNames = [
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
        this.activeUniversalActionInThrottle = false;
        /**
         * Handle the input events.
         * @param {Event} event The input event.
         * @returns {void}
         */
        this.handleEvent = function (event) {
            if (_this.remainingTime > 0) {
                return;
            }
            if (event.type === 'mousemove') {
                var _a = event, pageX = _a.pageX, pageY = _a.pageY;
                if ((pageX === undefined && pageY === undefined) ||
                    (pageX === _this.lastPageX && pageY === _this.lastPageY)) {
                    return;
                }
                _this.lastPageX = pageX;
                _this.lastPageY = pageY;
            }
            _this.resetTimeout();
        };
        this.callback = callback;
        this.options = __assign({ element: document.body }, options);
        var element = this.options.element;
        this.eventNames.forEach(function (eventName) {
            element.addEventListener(eventName, _this.handleEvent);
        });
        this.resetTimeout();
    }
    IdleTimeout.prototype.resetTimeout = function () {
        var _this = this;
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = null;
        }
        if (this.isIdle && !this.options.loop) {
            return;
        }
        this.timeoutHandle = setTimeout(function () {
            _this.handleTimeout();
        }, this.remainingTime || this.options.timeout);
        this.startTime = new Date().getTime();
    };
    IdleTimeout.prototype.recordUniversalLastActionTime = function () {
        var _this = this;
        if (this.activeUniversalActionInThrottle) {
            return;
        }
        this.activeUniversalActionInThrottle = true;
        setTimeout(function () {
            try {
                window.localStorage.setItem(_this.storageKey, Date.now().toString());
            }
            catch (e) {
                // nothing. fail silently
            }
            finally {
                _this.activeUniversalActionInThrottle = false;
            }
        }, 5000);
    };
    IdleTimeout.prototype.getUniversalLastActionTime = function () {
        var fallbackTime = 0;
        try {
            return Number(window.localStorage.getItem(this.storageKey)) || fallbackTime;
        }
        catch (e) {
            return fallbackTime;
        }
    };
    IdleTimeout.prototype.handleTimeout = function () {
        var timeSinceLastUniversalAction = Date.now() - this.getUniversalLastActionTime();
        var universalActionOccuredDuringTimeout = timeSinceLastUniversalAction < this.options.timeout;
        if (universalActionOccuredDuringTimeout) {
            this.isIdle = false;
            this.resetTimeout();
        }
        else {
            this.isIdle = true;
            this.resetTimeout();
            this.callback();
        }
    };
    Object.defineProperty(IdleTimeout.prototype, "idle", {
        get: function () {
            return this.isIdle;
        },
        enumerable: true,
        configurable: true
    });
    return IdleTimeout;
}());
/* harmony default export */ var src_IdleTimeout = (IdleTimeout);

// CONCATENATED MODULE: ./src/index.ts

/* harmony default export */ var src = __webpack_exports__["default"] = (function (callback, options) {
    return new src_IdleTimeout(callback, options);
});


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=universal-idle-timeout.map