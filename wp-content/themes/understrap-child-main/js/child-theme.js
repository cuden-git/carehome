/*!
  * Understrap v1.2.0 (https://understrap.com)
  * Copyright 2013-2025 The Understrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL-3.0 (undefined)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var alertExports = {};
	var alert$1 = {
	  get exports(){ return alertExports; },
	  set exports(v){ alertExports = v; },
	};

	var baseComponentExports = {};
	var baseComponent = {
	  get exports(){ return baseComponentExports; },
	  set exports(v){ baseComponentExports = v; },
	};

	var dataExports = {};
	var data = {
	  get exports(){ return dataExports; },
	  set exports(v){ dataExports = v; },
	};

	/*!
	  * Bootstrap data.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return dataExports;
		hasRequiredData = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap dom/data.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const elementMap = new Map();
			  const data = {
			    set(element, key, instance) {
			      if (!elementMap.has(element)) {
			        elementMap.set(element, new Map());
			      }
			      const instanceMap = elementMap.get(element);

			      // make it clear we only want one instance per element
			      // can be removed later when multiple key/instances are fine to be used
			      if (!instanceMap.has(key) && instanceMap.size !== 0) {
			        // eslint-disable-next-line no-console
			        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
			        return;
			      }
			      instanceMap.set(key, instance);
			    },
			    get(element, key) {
			      if (elementMap.has(element)) {
			        return elementMap.get(element).get(key) || null;
			      }
			      return null;
			    },
			    remove(element, key) {
			      if (!elementMap.has(element)) {
			        return;
			      }
			      const instanceMap = elementMap.get(element);
			      instanceMap.delete(key);

			      // free up element references if there are no instances left for an element
			      if (instanceMap.size === 0) {
			        elementMap.delete(element);
			      }
			    }
			  };
			  return data;
			});
	} (data));
		return dataExports;
	}

	var eventHandlerExports = {};
	var eventHandler = {
	  get exports(){ return eventHandlerExports; },
	  set exports(v){ eventHandlerExports = v; },
	};

	var utilExports = {};
	var util = {
	  get exports(){ return utilExports; },
	  set exports(v){ utilExports = v; },
	};

	/*!
	  * Bootstrap index.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return utilExports;
		hasRequiredUtil = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/index.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const MAX_UID = 1000000;
			  const MILLISECONDS_MULTIPLIER = 1000;
			  const TRANSITION_END = 'transitionend';

			  /**
			   * Properly escape IDs selectors to handle weird IDs
			   * @param {string} selector
			   * @returns {string}
			   */
			  const parseSelector = selector => {
			    if (selector && window.CSS && window.CSS.escape) {
			      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
			      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
			    }
			    return selector;
			  };

			  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
			  const toType = object => {
			    if (object === null || object === undefined) {
			      return `${object}`;
			    }
			    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
			  };

			  /**
			   * Public Util API
			   */

			  const getUID = prefix => {
			    do {
			      prefix += Math.floor(Math.random() * MAX_UID);
			    } while (document.getElementById(prefix));
			    return prefix;
			  };
			  const getTransitionDurationFromElement = element => {
			    if (!element) {
			      return 0;
			    }

			    // Get transition-duration of the element
			    let {
			      transitionDuration,
			      transitionDelay
			    } = window.getComputedStyle(element);
			    const floatTransitionDuration = Number.parseFloat(transitionDuration);
			    const floatTransitionDelay = Number.parseFloat(transitionDelay);

			    // Return 0 if element or transition duration is not found
			    if (!floatTransitionDuration && !floatTransitionDelay) {
			      return 0;
			    }

			    // If multiple durations are defined, take the first
			    transitionDuration = transitionDuration.split(',')[0];
			    transitionDelay = transitionDelay.split(',')[0];
			    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
			  };
			  const triggerTransitionEnd = element => {
			    element.dispatchEvent(new Event(TRANSITION_END));
			  };
			  const isElement = object => {
			    if (!object || typeof object !== 'object') {
			      return false;
			    }
			    if (typeof object.jquery !== 'undefined') {
			      object = object[0];
			    }
			    return typeof object.nodeType !== 'undefined';
			  };
			  const getElement = object => {
			    // it's a jQuery object or a node element
			    if (isElement(object)) {
			      return object.jquery ? object[0] : object;
			    }
			    if (typeof object === 'string' && object.length > 0) {
			      return document.querySelector(parseSelector(object));
			    }
			    return null;
			  };
			  const isVisible = element => {
			    if (!isElement(element) || element.getClientRects().length === 0) {
			      return false;
			    }
			    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
			    // Handle `details` element as its content may falsie appear visible when it is closed
			    const closedDetails = element.closest('details:not([open])');
			    if (!closedDetails) {
			      return elementIsVisible;
			    }
			    if (closedDetails !== element) {
			      const summary = element.closest('summary');
			      if (summary && summary.parentNode !== closedDetails) {
			        return false;
			      }
			      if (summary === null) {
			        return false;
			      }
			    }
			    return elementIsVisible;
			  };
			  const isDisabled = element => {
			    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
			      return true;
			    }
			    if (element.classList.contains('disabled')) {
			      return true;
			    }
			    if (typeof element.disabled !== 'undefined') {
			      return element.disabled;
			    }
			    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
			  };
			  const findShadowRoot = element => {
			    if (!document.documentElement.attachShadow) {
			      return null;
			    }

			    // Can find the shadow root otherwise it'll return the document
			    if (typeof element.getRootNode === 'function') {
			      const root = element.getRootNode();
			      return root instanceof ShadowRoot ? root : null;
			    }
			    if (element instanceof ShadowRoot) {
			      return element;
			    }

			    // when we don't find a shadow root
			    if (!element.parentNode) {
			      return null;
			    }
			    return findShadowRoot(element.parentNode);
			  };
			  const noop = () => {};

			  /**
			   * Trick to restart an element's animation
			   *
			   * @param {HTMLElement} element
			   * @return void
			   *
			   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
			   */
			  const reflow = element => {
			    element.offsetHeight; // eslint-disable-line no-unused-expressions
			  };
			  const getjQuery = () => {
			    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
			      return window.jQuery;
			    }
			    return null;
			  };
			  const DOMContentLoadedCallbacks = [];
			  const onDOMContentLoaded = callback => {
			    if (document.readyState === 'loading') {
			      // add listener on the first call when the document is in loading state
			      if (!DOMContentLoadedCallbacks.length) {
			        document.addEventListener('DOMContentLoaded', () => {
			          for (const callback of DOMContentLoadedCallbacks) {
			            callback();
			          }
			        });
			      }
			      DOMContentLoadedCallbacks.push(callback);
			    } else {
			      callback();
			    }
			  };
			  const isRTL = () => document.documentElement.dir === 'rtl';
			  const defineJQueryPlugin = plugin => {
			    onDOMContentLoaded(() => {
			      const $ = getjQuery();
			      /* istanbul ignore if */
			      if ($) {
			        const name = plugin.NAME;
			        const JQUERY_NO_CONFLICT = $.fn[name];
			        $.fn[name] = plugin.jQueryInterface;
			        $.fn[name].Constructor = plugin;
			        $.fn[name].noConflict = () => {
			          $.fn[name] = JQUERY_NO_CONFLICT;
			          return plugin.jQueryInterface;
			        };
			      }
			    });
			  };
			  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
			    return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
			  };
			  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
			    if (!waitForTransition) {
			      execute(callback);
			      return;
			    }
			    const durationPadding = 5;
			    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
			    let called = false;
			    const handler = ({
			      target
			    }) => {
			      if (target !== transitionElement) {
			        return;
			      }
			      called = true;
			      transitionElement.removeEventListener(TRANSITION_END, handler);
			      execute(callback);
			    };
			    transitionElement.addEventListener(TRANSITION_END, handler);
			    setTimeout(() => {
			      if (!called) {
			        triggerTransitionEnd(transitionElement);
			      }
			    }, emulatedDuration);
			  };

			  /**
			   * Return the previous/next element of a list.
			   *
			   * @param {array} list    The list of elements
			   * @param activeElement   The active element
			   * @param shouldGetNext   Choose to get next or previous element
			   * @param isCycleAllowed
			   * @return {Element|elem} The proper element
			   */
			  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
			    const listLength = list.length;
			    let index = list.indexOf(activeElement);

			    // if the element does not exist in the list return an element
			    // depending on the direction and if cycle is allowed
			    if (index === -1) {
			      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
			    }
			    index += shouldGetNext ? 1 : -1;
			    if (isCycleAllowed) {
			      index = (index + listLength) % listLength;
			    }
			    return list[Math.max(0, Math.min(index, listLength - 1))];
			  };
			  exports.defineJQueryPlugin = defineJQueryPlugin;
			  exports.execute = execute;
			  exports.executeAfterTransition = executeAfterTransition;
			  exports.findShadowRoot = findShadowRoot;
			  exports.getElement = getElement;
			  exports.getNextActiveElement = getNextActiveElement;
			  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
			  exports.getUID = getUID;
			  exports.getjQuery = getjQuery;
			  exports.isDisabled = isDisabled;
			  exports.isElement = isElement;
			  exports.isRTL = isRTL;
			  exports.isVisible = isVisible;
			  exports.noop = noop;
			  exports.onDOMContentLoaded = onDOMContentLoaded;
			  exports.parseSelector = parseSelector;
			  exports.reflow = reflow;
			  exports.toType = toType;
			  exports.triggerTransitionEnd = triggerTransitionEnd;
			  Object.defineProperty(exports, Symbol.toStringTag, {
			    value: 'Module'
			  });
			});
	} (util, utilExports));
		return utilExports;
	}

	/*!
	  * Bootstrap event-handler.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredEventHandler;

	function requireEventHandler () {
		if (hasRequiredEventHandler) return eventHandlerExports;
		hasRequiredEventHandler = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap dom/event-handler.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
			  const stripNameRegex = /\..*/;
			  const stripUidRegex = /::\d+$/;
			  const eventRegistry = {}; // Events storage
			  let uidEvent = 1;
			  const customEvents = {
			    mouseenter: 'mouseover',
			    mouseleave: 'mouseout'
			  };
			  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

			  /**
			   * Private methods
			   */

			  function makeEventUid(element, uid) {
			    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
			  }
			  function getElementEvents(element) {
			    const uid = makeEventUid(element);
			    element.uidEvent = uid;
			    eventRegistry[uid] = eventRegistry[uid] || {};
			    return eventRegistry[uid];
			  }
			  function bootstrapHandler(element, fn) {
			    return function handler(event) {
			      hydrateObj(event, {
			        delegateTarget: element
			      });
			      if (handler.oneOff) {
			        EventHandler.off(element, event.type, fn);
			      }
			      return fn.apply(element, [event]);
			    };
			  }
			  function bootstrapDelegationHandler(element, selector, fn) {
			    return function handler(event) {
			      const domElements = element.querySelectorAll(selector);
			      for (let {
			        target
			      } = event; target && target !== this; target = target.parentNode) {
			        for (const domElement of domElements) {
			          if (domElement !== target) {
			            continue;
			          }
			          hydrateObj(event, {
			            delegateTarget: target
			          });
			          if (handler.oneOff) {
			            EventHandler.off(element, event.type, selector, fn);
			          }
			          return fn.apply(target, [event]);
			        }
			      }
			    };
			  }
			  function findHandler(events, callable, delegationSelector = null) {
			    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
			  }
			  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
			    const isDelegated = typeof handler === 'string';
			    // TODO: tooltip passes `false` instead of selector, so we need to check
			    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
			    let typeEvent = getTypeEvent(originalTypeEvent);
			    if (!nativeEvents.has(typeEvent)) {
			      typeEvent = originalTypeEvent;
			    }
			    return [isDelegated, callable, typeEvent];
			  }
			  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
			    if (typeof originalTypeEvent !== 'string' || !element) {
			      return;
			    }
			    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

			    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
			    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
			    if (originalTypeEvent in customEvents) {
			      const wrapFunction = fn => {
			        return function (event) {
			          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
			            return fn.call(this, event);
			          }
			        };
			      };
			      callable = wrapFunction(callable);
			    }
			    const events = getElementEvents(element);
			    const handlers = events[typeEvent] || (events[typeEvent] = {});
			    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
			    if (previousFunction) {
			      previousFunction.oneOff = previousFunction.oneOff && oneOff;
			      return;
			    }
			    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
			    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
			    fn.delegationSelector = isDelegated ? handler : null;
			    fn.callable = callable;
			    fn.oneOff = oneOff;
			    fn.uidEvent = uid;
			    handlers[uid] = fn;
			    element.addEventListener(typeEvent, fn, isDelegated);
			  }
			  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
			    const fn = findHandler(events[typeEvent], handler, delegationSelector);
			    if (!fn) {
			      return;
			    }
			    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
			    delete events[typeEvent][fn.uidEvent];
			  }
			  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
			    const storeElementEvent = events[typeEvent] || {};
			    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
			      if (handlerKey.includes(namespace)) {
			        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			      }
			    }
			  }
			  function getTypeEvent(event) {
			    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
			    event = event.replace(stripNameRegex, '');
			    return customEvents[event] || event;
			  }
			  const EventHandler = {
			    on(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, false);
			    },
			    one(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, true);
			    },
			    off(element, originalTypeEvent, handler, delegationFunction) {
			      if (typeof originalTypeEvent !== 'string' || !element) {
			        return;
			      }
			      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
			      const inNamespace = typeEvent !== originalTypeEvent;
			      const events = getElementEvents(element);
			      const storeElementEvent = events[typeEvent] || {};
			      const isNamespace = originalTypeEvent.startsWith('.');
			      if (typeof callable !== 'undefined') {
			        // Simplest case: handler is passed, remove that listener ONLY.
			        if (!Object.keys(storeElementEvent).length) {
			          return;
			        }
			        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
			        return;
			      }
			      if (isNamespace) {
			        for (const elementEvent of Object.keys(events)) {
			          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
			        }
			      }
			      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
			        const handlerKey = keyHandlers.replace(stripUidRegex, '');
			        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
			          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			        }
			      }
			    },
			    trigger(element, event, args) {
			      if (typeof event !== 'string' || !element) {
			        return null;
			      }
			      const $ = index_js.getjQuery();
			      const typeEvent = getTypeEvent(event);
			      const inNamespace = event !== typeEvent;
			      let jQueryEvent = null;
			      let bubbles = true;
			      let nativeDispatch = true;
			      let defaultPrevented = false;
			      if (inNamespace && $) {
			        jQueryEvent = $.Event(event, args);
			        $(element).trigger(jQueryEvent);
			        bubbles = !jQueryEvent.isPropagationStopped();
			        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
			        defaultPrevented = jQueryEvent.isDefaultPrevented();
			      }
			      const evt = hydrateObj(new Event(event, {
			        bubbles,
			        cancelable: true
			      }), args);
			      if (defaultPrevented) {
			        evt.preventDefault();
			      }
			      if (nativeDispatch) {
			        element.dispatchEvent(evt);
			      }
			      if (evt.defaultPrevented && jQueryEvent) {
			        jQueryEvent.preventDefault();
			      }
			      return evt;
			    }
			  };
			  function hydrateObj(obj, meta = {}) {
			    for (const [key, value] of Object.entries(meta)) {
			      try {
			        obj[key] = value;
			      } catch (_unused) {
			        Object.defineProperty(obj, key, {
			          configurable: true,
			          get() {
			            return value;
			          }
			        });
			      }
			    }
			    return obj;
			  }
			  return EventHandler;
			});
	} (eventHandler));
		return eventHandlerExports;
	}

	var configExports = {};
	var config = {
	  get exports(){ return configExports; },
	  set exports(v){ configExports = v; },
	};

	var manipulatorExports = {};
	var manipulator = {
	  get exports(){ return manipulatorExports; },
	  set exports(v){ manipulatorExports = v; },
	};

	/*!
	  * Bootstrap manipulator.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredManipulator;

	function requireManipulator () {
		if (hasRequiredManipulator) return manipulatorExports;
		hasRequiredManipulator = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap dom/manipulator.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  function normalizeData(value) {
			    if (value === 'true') {
			      return true;
			    }
			    if (value === 'false') {
			      return false;
			    }
			    if (value === Number(value).toString()) {
			      return Number(value);
			    }
			    if (value === '' || value === 'null') {
			      return null;
			    }
			    if (typeof value !== 'string') {
			      return value;
			    }
			    try {
			      return JSON.parse(decodeURIComponent(value));
			    } catch (_unused) {
			      return value;
			    }
			  }
			  function normalizeDataKey(key) {
			    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
			  }
			  const Manipulator = {
			    setDataAttribute(element, key, value) {
			      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
			    },
			    removeDataAttribute(element, key) {
			      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
			    },
			    getDataAttributes(element) {
			      if (!element) {
			        return {};
			      }
			      const attributes = {};
			      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
			      for (const key of bsKeys) {
			        let pureKey = key.replace(/^bs/, '');
			        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
			        attributes[pureKey] = normalizeData(element.dataset[key]);
			      }
			      return attributes;
			    },
			    getDataAttribute(element, key) {
			      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
			    }
			  };
			  return Manipulator;
			});
	} (manipulator));
		return manipulatorExports;
	}

	/*!
	  * Bootstrap config.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredConfig;

	function requireConfig () {
		if (hasRequiredConfig) return configExports;
		hasRequiredConfig = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireManipulator(), requireUtil()) ;
			})(commonjsGlobal, function (Manipulator, index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/config.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Class definition
			   */
			  class Config {
			    // Getters
			    static get Default() {
			      return {};
			    }
			    static get DefaultType() {
			      return {};
			    }
			    static get NAME() {
			      throw new Error('You have to implement the static method "NAME", for each component!');
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    }
			    _configAfterMerge(config) {
			      return config;
			    }
			    _mergeConfigObj(config, element) {
			      const jsonConfig = index_js.isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

			      return {
			        ...this.constructor.Default,
			        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
			        ...(index_js.isElement(element) ? Manipulator.getDataAttributes(element) : {}),
			        ...(typeof config === 'object' ? config : {})
			      };
			    }
			    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
			      for (const [property, expectedTypes] of Object.entries(configTypes)) {
			        const value = config[property];
			        const valueType = index_js.isElement(value) ? 'element' : index_js.toType(value);
			        if (!new RegExp(expectedTypes).test(valueType)) {
			          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
			        }
			      }
			    }
			  }
			  return Config;
			});
	} (config));
		return configExports;
	}

	/*!
	  * Bootstrap base-component.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBaseComponent;

	function requireBaseComponent () {
		if (hasRequiredBaseComponent) return baseComponentExports;
		hasRequiredBaseComponent = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireData(), requireEventHandler(), requireConfig(), requireUtil()) ;
			})(commonjsGlobal, function (Data, EventHandler, Config, index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap base-component.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const VERSION = '5.3.3';

			  /**
			   * Class definition
			   */

			  class BaseComponent extends Config {
			    constructor(element, config) {
			      super();
			      element = index_js.getElement(element);
			      if (!element) {
			        return;
			      }
			      this._element = element;
			      this._config = this._getConfig(config);
			      Data.set(this._element, this.constructor.DATA_KEY, this);
			    }

			    // Public
			    dispose() {
			      Data.remove(this._element, this.constructor.DATA_KEY);
			      EventHandler.off(this._element, this.constructor.EVENT_KEY);
			      for (const propertyName of Object.getOwnPropertyNames(this)) {
			        this[propertyName] = null;
			      }
			    }
			    _queueCallback(callback, element, isAnimated = true) {
			      index_js.executeAfterTransition(callback, element, isAnimated);
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config, this._element);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    }

			    // Static
			    static getInstance(element) {
			      return Data.get(index_js.getElement(element), this.DATA_KEY);
			    }
			    static getOrCreateInstance(element, config = {}) {
			      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
			    }
			    static get VERSION() {
			      return VERSION;
			    }
			    static get DATA_KEY() {
			      return `bs.${this.NAME}`;
			    }
			    static get EVENT_KEY() {
			      return `.${this.DATA_KEY}`;
			    }
			    static eventName(name) {
			      return `${name}${this.EVENT_KEY}`;
			    }
			  }
			  return BaseComponent;
			});
	} (baseComponent));
		return baseComponentExports;
	}

	var componentFunctionsExports = {};
	var componentFunctions = {
	  get exports(){ return componentFunctionsExports; },
	  set exports(v){ componentFunctionsExports = v; },
	};

	var selectorEngineExports = {};
	var selectorEngine = {
	  get exports(){ return selectorEngineExports; },
	  set exports(v){ selectorEngineExports = v; },
	};

	/*!
	  * Bootstrap selector-engine.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSelectorEngine;

	function requireSelectorEngine () {
		if (hasRequiredSelectorEngine) return selectorEngineExports;
		hasRequiredSelectorEngine = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap dom/selector-engine.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const getSelector = element => {
			    let selector = element.getAttribute('data-bs-target');
			    if (!selector || selector === '#') {
			      let hrefAttribute = element.getAttribute('href');

			      // The only valid content that could double as a selector are IDs or classes,
			      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
			      // `document.querySelector` will rightfully complain it is invalid.
			      // See https://github.com/twbs/bootstrap/issues/32273
			      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
			        return null;
			      }

			      // Just in case some CMS puts out a full URL with the anchor appended
			      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
			        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
			      }
			      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
			    }
			    return selector ? selector.split(',').map(sel => index_js.parseSelector(sel)).join(',') : null;
			  };
			  const SelectorEngine = {
			    find(selector, element = document.documentElement) {
			      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
			    },
			    findOne(selector, element = document.documentElement) {
			      return Element.prototype.querySelector.call(element, selector);
			    },
			    children(element, selector) {
			      return [].concat(...element.children).filter(child => child.matches(selector));
			    },
			    parents(element, selector) {
			      const parents = [];
			      let ancestor = element.parentNode.closest(selector);
			      while (ancestor) {
			        parents.push(ancestor);
			        ancestor = ancestor.parentNode.closest(selector);
			      }
			      return parents;
			    },
			    prev(element, selector) {
			      let previous = element.previousElementSibling;
			      while (previous) {
			        if (previous.matches(selector)) {
			          return [previous];
			        }
			        previous = previous.previousElementSibling;
			      }
			      return [];
			    },
			    // TODO: this is now unused; remove later along with prev()
			    next(element, selector) {
			      let next = element.nextElementSibling;
			      while (next) {
			        if (next.matches(selector)) {
			          return [next];
			        }
			        next = next.nextElementSibling;
			      }
			      return [];
			    },
			    focusableChildren(element) {
			      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
			      return this.find(focusables, element).filter(el => !index_js.isDisabled(el) && index_js.isVisible(el));
			    },
			    getSelectorFromElement(element) {
			      const selector = getSelector(element);
			      if (selector) {
			        return SelectorEngine.findOne(selector) ? selector : null;
			      }
			      return null;
			    },
			    getElementFromSelector(element) {
			      const selector = getSelector(element);
			      return selector ? SelectorEngine.findOne(selector) : null;
			    },
			    getMultipleElementsFromSelector(element) {
			      const selector = getSelector(element);
			      return selector ? SelectorEngine.find(selector) : [];
			    }
			  };
			  return SelectorEngine;
			});
	} (selectorEngine));
		return selectorEngineExports;
	}

	/*!
	  * Bootstrap component-functions.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredComponentFunctions;

	function requireComponentFunctions () {
		if (hasRequiredComponentFunctions) return componentFunctionsExports;
		hasRequiredComponentFunctions = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports, requireEventHandler(), requireSelectorEngine(), requireUtil()) ;
			})(commonjsGlobal, function (exports, EventHandler, SelectorEngine, index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/component-functions.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const enableDismissTrigger = (component, method = 'hide') => {
			    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
			    const name = component.NAME;
			    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
			      if (['A', 'AREA'].includes(this.tagName)) {
			        event.preventDefault();
			      }
			      if (index_js.isDisabled(this)) {
			        return;
			      }
			      const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
			      const instance = component.getOrCreateInstance(target);

			      // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
			      instance[method]();
			    });
			  };
			  exports.enableDismissTrigger = enableDismissTrigger;
			  Object.defineProperty(exports, Symbol.toStringTag, {
			    value: 'Module'
			  });
			});
	} (componentFunctions, componentFunctionsExports));
		return componentFunctionsExports;
	}

	/*!
	  * Bootstrap alert.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireComponentFunctions(), requireUtil()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, componentFunctions_js, index_js) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap alert.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'alert';
		  const DATA_KEY = 'bs.alert';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_CLOSE = `close${EVENT_KEY}`;
		  const EVENT_CLOSED = `closed${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';

		  /**
		   * Class definition
		   */

		  class Alert extends BaseComponent {
		    // Getters
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    close() {
		      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
		      if (closeEvent.defaultPrevented) {
		        return;
		      }
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);
		      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
		    }

		    // Private
		    _destroyElement() {
		      this._element.remove();
		      EventHandler.trigger(this._element, EVENT_CLOSED);
		      this.dispose();
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Alert.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  componentFunctions_js.enableDismissTrigger(Alert, 'close');

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Alert);
		  return Alert;
		});
	} (alert$1));

	var alert = alertExports;

	var buttonExports = {};
	var button$1 = {
	  get exports(){ return buttonExports; },
	  set exports(v){ buttonExports = v; },
	};

	/*!
	  * Bootstrap button.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireUtil()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, index_js) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap button.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'button';
		  const DATA_KEY = 'bs.button';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

		  /**
		   * Class definition
		   */

		  class Button extends BaseComponent {
		    // Getters
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    toggle() {
		      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
		      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Button.getOrCreateInstance(this);
		        if (config === 'toggle') {
		          data[config]();
		        }
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
		    event.preventDefault();
		    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
		    const data = Button.getOrCreateInstance(button);
		    data.toggle();
		  });

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Button);
		  return Button;
		});
	} (button$1));

	var button = buttonExports;

	var carouselExports = {};
	var carousel$1 = {
	  get exports(){ return carouselExports; },
	  set exports(v){ carouselExports = v; },
	};

	var swipeExports = {};
	var swipe = {
	  get exports(){ return swipeExports; },
	  set exports(v){ swipeExports = v; },
	};

	/*!
	  * Bootstrap swipe.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSwipe;

	function requireSwipe () {
		if (hasRequiredSwipe) return swipeExports;
		hasRequiredSwipe = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireConfig(), requireUtil()) ;
			})(commonjsGlobal, function (EventHandler, Config, index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/swipe.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const NAME = 'swipe';
			  const EVENT_KEY = '.bs.swipe';
			  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
			  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
			  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
			  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
			  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
			  const POINTER_TYPE_TOUCH = 'touch';
			  const POINTER_TYPE_PEN = 'pen';
			  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
			  const SWIPE_THRESHOLD = 40;
			  const Default = {
			    endCallback: null,
			    leftCallback: null,
			    rightCallback: null
			  };
			  const DefaultType = {
			    endCallback: '(function|null)',
			    leftCallback: '(function|null)',
			    rightCallback: '(function|null)'
			  };

			  /**
			   * Class definition
			   */

			  class Swipe extends Config {
			    constructor(element, config) {
			      super();
			      this._element = element;
			      if (!element || !Swipe.isSupported()) {
			        return;
			      }
			      this._config = this._getConfig(config);
			      this._deltaX = 0;
			      this._supportPointerEvents = Boolean(window.PointerEvent);
			      this._initEvents();
			    }

			    // Getters
			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    }

			    // Public
			    dispose() {
			      EventHandler.off(this._element, EVENT_KEY);
			    }

			    // Private
			    _start(event) {
			      if (!this._supportPointerEvents) {
			        this._deltaX = event.touches[0].clientX;
			        return;
			      }
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX;
			      }
			    }
			    _end(event) {
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX - this._deltaX;
			      }
			      this._handleSwipe();
			      index_js.execute(this._config.endCallback);
			    }
			    _move(event) {
			      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
			    }
			    _handleSwipe() {
			      const absDeltaX = Math.abs(this._deltaX);
			      if (absDeltaX <= SWIPE_THRESHOLD) {
			        return;
			      }
			      const direction = absDeltaX / this._deltaX;
			      this._deltaX = 0;
			      if (!direction) {
			        return;
			      }
			      index_js.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
			    }
			    _initEvents() {
			      if (this._supportPointerEvents) {
			        EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
			        EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));
			        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
			      } else {
			        EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
			        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
			        EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
			      }
			    }
			    _eventIsPointerPenTouch(event) {
			      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
			    }

			    // Static
			    static isSupported() {
			      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
			    }
			  }
			  return Swipe;
			});
	} (swipe));
		return swipeExports;
	}

	/*!
	  * Bootstrap carousel.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireUtil(), requireSwipe()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, Manipulator, SelectorEngine, index_js, Swipe) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap carousel.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'carousel';
		  const DATA_KEY = 'bs.carousel';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

		  const ORDER_NEXT = 'next';
		  const ORDER_PREV = 'prev';
		  const DIRECTION_LEFT = 'left';
		  const DIRECTION_RIGHT = 'right';
		  const EVENT_SLIDE = `slide${EVENT_KEY}`;
		  const EVENT_SLID = `slid${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
		  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
		  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_CAROUSEL = 'carousel';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_SLIDE = 'slide';
		  const CLASS_NAME_END = 'carousel-item-end';
		  const CLASS_NAME_START = 'carousel-item-start';
		  const CLASS_NAME_NEXT = 'carousel-item-next';
		  const CLASS_NAME_PREV = 'carousel-item-prev';
		  const SELECTOR_ACTIVE = '.active';
		  const SELECTOR_ITEM = '.carousel-item';
		  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
		  const SELECTOR_ITEM_IMG = '.carousel-item img';
		  const SELECTOR_INDICATORS = '.carousel-indicators';
		  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
		  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
		  const KEY_TO_DIRECTION = {
		    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
		    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
		  };
		  const Default = {
		    interval: 5000,
		    keyboard: true,
		    pause: 'hover',
		    ride: false,
		    touch: true,
		    wrap: true
		  };
		  const DefaultType = {
		    interval: '(number|boolean)',
		    // TODO:v6 remove boolean support
		    keyboard: 'boolean',
		    pause: '(string|boolean)',
		    ride: '(boolean|string)',
		    touch: 'boolean',
		    wrap: 'boolean'
		  };

		  /**
		   * Class definition
		   */

		  class Carousel extends BaseComponent {
		    constructor(element, config) {
		      super(element, config);
		      this._interval = null;
		      this._activeElement = null;
		      this._isSliding = false;
		      this.touchTimeout = null;
		      this._swipeHelper = null;
		      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
		      this._addEventListeners();
		      if (this._config.ride === CLASS_NAME_CAROUSEL) {
		        this.cycle();
		      }
		    }

		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    next() {
		      this._slide(ORDER_NEXT);
		    }
		    nextWhenVisible() {
		      // FIXME TODO use `document.visibilityState`
		      // Don't call next when the page isn't visible
		      // or the carousel or its parent isn't visible
		      if (!document.hidden && index_js.isVisible(this._element)) {
		        this.next();
		      }
		    }
		    prev() {
		      this._slide(ORDER_PREV);
		    }
		    pause() {
		      if (this._isSliding) {
		        index_js.triggerTransitionEnd(this._element);
		      }
		      this._clearInterval();
		    }
		    cycle() {
		      this._clearInterval();
		      this._updateInterval();
		      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
		    }
		    _maybeEnableCycle() {
		      if (!this._config.ride) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
		        return;
		      }
		      this.cycle();
		    }
		    to(index) {
		      const items = this._getItems();
		      if (index > items.length - 1 || index < 0) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
		        return;
		      }
		      const activeIndex = this._getItemIndex(this._getActive());
		      if (activeIndex === index) {
		        return;
		      }
		      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
		      this._slide(order, items[index]);
		    }
		    dispose() {
		      if (this._swipeHelper) {
		        this._swipeHelper.dispose();
		      }
		      super.dispose();
		    }

		    // Private
		    _configAfterMerge(config) {
		      config.defaultInterval = config.interval;
		      return config;
		    }
		    _addEventListeners() {
		      if (this._config.keyboard) {
		        EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		      }
		      if (this._config.pause === 'hover') {
		        EventHandler.on(this._element, EVENT_MOUSEENTER, () => this.pause());
		        EventHandler.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle());
		      }
		      if (this._config.touch && Swipe.isSupported()) {
		        this._addTouchEventListeners();
		      }
		    }
		    _addTouchEventListeners() {
		      for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
		        EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
		      }
		      const endCallBack = () => {
		        if (this._config.pause !== 'hover') {
		          return;
		        }

		        // If it's a touch-enabled device, mouseenter/leave are fired as
		        // part of the mouse compatibility events on first tap - the carousel
		        // would stop cycling until user tapped out of it;
		        // here, we listen for touchend, explicitly pause the carousel
		        // (as if it's the second time we tap on it, mouseenter compat event
		        // is NOT fired) and after a timeout (to allow for mouse compatibility
		        // events to fire) we explicitly restart cycling

		        this.pause();
		        if (this.touchTimeout) {
		          clearTimeout(this.touchTimeout);
		        }
		        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
		      };
		      const swipeConfig = {
		        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
		        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
		        endCallback: endCallBack
		      };
		      this._swipeHelper = new Swipe(this._element, swipeConfig);
		    }
		    _keydown(event) {
		      if (/input|textarea/i.test(event.target.tagName)) {
		        return;
		      }
		      const direction = KEY_TO_DIRECTION[event.key];
		      if (direction) {
		        event.preventDefault();
		        this._slide(this._directionToOrder(direction));
		      }
		    }
		    _getItemIndex(element) {
		      return this._getItems().indexOf(element);
		    }
		    _setActiveIndicatorElement(index) {
		      if (!this._indicatorsElement) {
		        return;
		      }
		      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
		      activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
		      activeIndicator.removeAttribute('aria-current');
		      const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
		      if (newActiveIndicator) {
		        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
		        newActiveIndicator.setAttribute('aria-current', 'true');
		      }
		    }
		    _updateInterval() {
		      const element = this._activeElement || this._getActive();
		      if (!element) {
		        return;
		      }
		      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
		      this._config.interval = elementInterval || this._config.defaultInterval;
		    }
		    _slide(order, element = null) {
		      if (this._isSliding) {
		        return;
		      }
		      const activeElement = this._getActive();
		      const isNext = order === ORDER_NEXT;
		      const nextElement = element || index_js.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
		      if (nextElement === activeElement) {
		        return;
		      }
		      const nextElementIndex = this._getItemIndex(nextElement);
		      const triggerEvent = eventName => {
		        return EventHandler.trigger(this._element, eventName, {
		          relatedTarget: nextElement,
		          direction: this._orderToDirection(order),
		          from: this._getItemIndex(activeElement),
		          to: nextElementIndex
		        });
		      };
		      const slideEvent = triggerEvent(EVENT_SLIDE);
		      if (slideEvent.defaultPrevented) {
		        return;
		      }
		      if (!activeElement || !nextElement) {
		        // Some weirdness is happening, so we bail
		        // TODO: change tests that use empty divs to avoid this check
		        return;
		      }
		      const isCycling = Boolean(this._interval);
		      this.pause();
		      this._isSliding = true;
		      this._setActiveIndicatorElement(nextElementIndex);
		      this._activeElement = nextElement;
		      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
		      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
		      nextElement.classList.add(orderClassName);
		      index_js.reflow(nextElement);
		      activeElement.classList.add(directionalClassName);
		      nextElement.classList.add(directionalClassName);
		      const completeCallBack = () => {
		        nextElement.classList.remove(directionalClassName, orderClassName);
		        nextElement.classList.add(CLASS_NAME_ACTIVE);
		        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
		        this._isSliding = false;
		        triggerEvent(EVENT_SLID);
		      };
		      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
		      if (isCycling) {
		        this.cycle();
		      }
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_SLIDE);
		    }
		    _getActive() {
		      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
		    }
		    _getItems() {
		      return SelectorEngine.find(SELECTOR_ITEM, this._element);
		    }
		    _clearInterval() {
		      if (this._interval) {
		        clearInterval(this._interval);
		        this._interval = null;
		      }
		    }
		    _directionToOrder(direction) {
		      if (index_js.isRTL()) {
		        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
		      }
		      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
		    }
		    _orderToDirection(order) {
		      if (index_js.isRTL()) {
		        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
		      }
		      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Carousel.getOrCreateInstance(this, config);
		        if (typeof config === 'number') {
		          data.to(config);
		          return;
		        }
		        if (typeof config === 'string') {
		          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
		    const target = SelectorEngine.getElementFromSelector(this);
		    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
		      return;
		    }
		    event.preventDefault();
		    const carousel = Carousel.getOrCreateInstance(target);
		    const slideIndex = this.getAttribute('data-bs-slide-to');
		    if (slideIndex) {
		      carousel.to(slideIndex);
		      carousel._maybeEnableCycle();
		      return;
		    }
		    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
		      carousel.next();
		      carousel._maybeEnableCycle();
		      return;
		    }
		    carousel.prev();
		    carousel._maybeEnableCycle();
		  });
		  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
		    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
		    for (const carousel of carousels) {
		      Carousel.getOrCreateInstance(carousel);
		    }
		  });

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Carousel);
		  return Carousel;
		});
	} (carousel$1));

	var carousel = carouselExports;

	var collapseExports = {};
	var collapse$1 = {
	  get exports(){ return collapseExports; },
	  set exports(v){ collapseExports = v; },
	};

	/*!
	  * Bootstrap collapse.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireSelectorEngine(), requireUtil()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, SelectorEngine, index_js) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap collapse.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'collapse';
		  const DATA_KEY = 'bs.collapse';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_COLLAPSE = 'collapse';
		  const CLASS_NAME_COLLAPSING = 'collapsing';
		  const CLASS_NAME_COLLAPSED = 'collapsed';
		  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
		  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
		  const WIDTH = 'width';
		  const HEIGHT = 'height';
		  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
		  const Default = {
		    parent: null,
		    toggle: true
		  };
		  const DefaultType = {
		    parent: '(null|element)',
		    toggle: 'boolean'
		  };

		  /**
		   * Class definition
		   */

		  class Collapse extends BaseComponent {
		    constructor(element, config) {
		      super(element, config);
		      this._isTransitioning = false;
		      this._triggerArray = [];
		      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE);
		      for (const elem of toggleList) {
		        const selector = SelectorEngine.getSelectorFromElement(elem);
		        const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);
		        if (selector !== null && filterElement.length) {
		          this._triggerArray.push(elem);
		        }
		      }
		      this._initializeChildren();
		      if (!this._config.parent) {
		        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
		      }
		      if (this._config.toggle) {
		        this.toggle();
		      }
		    }

		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    toggle() {
		      if (this._isShown()) {
		        this.hide();
		      } else {
		        this.show();
		      }
		    }
		    show() {
		      if (this._isTransitioning || this._isShown()) {
		        return;
		      }
		      let activeChildren = [];

		      // find active children
		      if (this._config.parent) {
		        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
		          toggle: false
		        }));
		      }
		      if (activeChildren.length && activeChildren[0]._isTransitioning) {
		        return;
		      }
		      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      for (const activeInstance of activeChildren) {
		        activeInstance.hide();
		      }
		      const dimension = this._getDimension();
		      this._element.classList.remove(CLASS_NAME_COLLAPSE);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.style[dimension] = 0;
		      this._addAriaAndCollapsedClass(this._triggerArray, true);
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		        this._element.style[dimension] = '';
		        EventHandler.trigger(this._element, EVENT_SHOWN);
		      };
		      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
		      const scrollSize = `scroll${capitalizedDimension}`;
		      this._queueCallback(complete, this._element, true);
		      this._element.style[dimension] = `${this._element[scrollSize]}px`;
		    }
		    hide() {
		      if (this._isTransitioning || !this._isShown()) {
		        return;
		      }
		      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      const dimension = this._getDimension();
		      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
		      index_js.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		      for (const trigger of this._triggerArray) {
		        const element = SelectorEngine.getElementFromSelector(trigger);
		        if (element && !this._isShown(element)) {
		          this._addAriaAndCollapsedClass([trigger], false);
		        }
		      }
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE);
		        EventHandler.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.style[dimension] = '';
		      this._queueCallback(complete, this._element, true);
		    }
		    _isShown(element = this._element) {
		      return element.classList.contains(CLASS_NAME_SHOW);
		    }

		    // Private
		    _configAfterMerge(config) {
		      config.toggle = Boolean(config.toggle); // Coerce string values
		      config.parent = index_js.getElement(config.parent);
		      return config;
		    }
		    _getDimension() {
		      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
		    }
		    _initializeChildren() {
		      if (!this._config.parent) {
		        return;
		      }
		      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
		      for (const element of children) {
		        const selected = SelectorEngine.getElementFromSelector(element);
		        if (selected) {
		          this._addAriaAndCollapsedClass([element], this._isShown(selected));
		        }
		      }
		    }
		    _getFirstLevelChildren(selector) {
		      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
		      // remove children if greater depth
		      return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
		    }
		    _addAriaAndCollapsedClass(triggerArray, isOpen) {
		      if (!triggerArray.length) {
		        return;
		      }
		      for (const element of triggerArray) {
		        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
		        element.setAttribute('aria-expanded', isOpen);
		      }
		    }

		    // Static
		    static jQueryInterface(config) {
		      const _config = {};
		      if (typeof config === 'string' && /show|hide/.test(config)) {
		        _config.toggle = false;
		      }
		      return this.each(function () {
		        const data = Collapse.getOrCreateInstance(this, _config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
		    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
		      event.preventDefault();
		    }
		    for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
		      Collapse.getOrCreateInstance(element, {
		        toggle: false
		      }).toggle();
		    }
		  });

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Collapse);
		  return Collapse;
		});
	} (collapse$1));

	var collapse = collapseExports;

	var dropdownExports = {};
	var dropdown$1 = {
	  get exports(){ return dropdownExports; },
	  set exports(v){ dropdownExports = v; },
	};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement$1(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement$1(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]

	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement$1(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max$1 = Math.max;
	var min$1 = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;
	  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }
	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }
	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }
	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;
	  if (includeScale && isHTMLElement$1(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }
	  var _ref = isElement(element) ? getWindow(element) : window,
	    visualViewport = _ref.visualViewport;
	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;
	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }
	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	    var next = child;
	    do {
	      if (next && parent.isSameNode(next)) {
	        return true;
	      } // $FlowFixMe[prop-missing]: need a better way to handle this...

	      next = next.parentNode || next.host;
	    } while (next);
	  } // Give up, the result is false

	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument :
	  // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot ||
	    // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || (
	    // DOM Element detected
	    isShadowRoot(element) ? element.host : null) ||
	    // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement$1(element) ||
	  // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block

	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());
	  if (isIE && isHTMLElement$1(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);
	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }
	  var currentNode = getParentNode(element);
	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }
	  while (isHTMLElement$1(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.

	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min, value, max) {
	  return max$1(min, min$1(value, max));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};
	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	    name = _ref.name,
	    options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options;
	  var _options$element = options.element,
	    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
	  if (arrowElement == null) {
	    return;
	  } // CSS selector

	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules

	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref, win) {
	  var x = _ref.x,
	    y = _ref.y;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	    popperRect = _ref2.popperRect,
	    placement = _ref2.placement,
	    variation = _ref2.variation,
	    offsets = _ref2.offsets,
	    position = _ref2.position,
	    gpuAcceleration = _ref2.gpuAcceleration,
	    adaptive = _ref2.adaptive,
	    roundOffsets = _ref2.roundOffsets,
	    isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	    x = _offsets$x === void 0 ? 0 : _offsets$x,
	    _offsets$y = offsets.y,
	    y = _offsets$y === void 0 ? 0 : _offsets$y;
	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

	    offsetParent = offsetParent;
	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
	      // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
	      // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }, getWindow(popper)) : {
	    x: x,
	    y: y
	  };
	  x = _ref4.x;
	  y = _ref4.y;
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref5) {
	  var state = _ref5.state,
	    options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	    _options$adaptive = options.adaptive,
	    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	    _options$roundOffsets = options.roundOffsets,
	    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect(_ref) {
	  var state = _ref.state,
	    instance = _ref.instance,
	    options = _ref.options;
	  var _options$scroll = options.scroll,
	    scroll = _options$scroll === void 0 ? true : _options$scroll,
	    _options$resize = options.resize,
	    resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element, strategy) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    var layoutViewport = isLayoutViewport();
	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max$1(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max$1(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max$1(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	    overflow = _getComputedStyle.overflow,
	    overflowX = _getComputedStyle.overflowX,
	    overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement$1(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`

	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement$1(element) ? getOffsetParent(element) : element;
	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents

	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max$1(rect.top, accRect.top);
	    accRect.right = min$1(rect.right, accRect.right);
	    accRect.bottom = min$1(rect.bottom, accRect.bottom);
	    accRect.left = max$1(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	    element = _ref.element,
	    placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    _options$placement = _options.placement,
	    placement = _options$placement === void 0 ? state.placement : _options$placement,
	    _options$strategy = _options.strategy,
	    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
	    _options$boundary = _options.boundary,
	    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	    _options$rootBoundary = _options.rootBoundary,
	    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	    _options$elementConte = _options.elementContext,
	    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	    _options$altBoundary = _options.altBoundary,
	    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	    _options$padding = _options.padding,
	    padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    placement = _options.placement,
	    boundary = _options.boundary,
	    rootBoundary = _options.rootBoundary,
	    padding = _options.padding,
	    flipVariations = _options.flipVariations,
	    _options$allowedAutoP = _options.allowedAutoPlacements,
	    allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	    specifiedFallbackPlacements = options.fallbackPlacements,
	    padding = options.padding,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    _options$flipVariatio = options.flipVariations,
	    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	    allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules

	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	      placement: placement
	    })) : offset,
	    skidding = _ref[0],
	    distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options,
	    name = _ref2.name;
	  var _options$offset = options.offset,
	    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	    x = _data$state$placement.x,
	    y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    padding = options.padding,
	    _options$tether = options.tether,
	    tether = _options$tether === void 0 ? true : _options$tether,
	    _options$tetherOffset = options.tetherOffset,
	    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis) {
	    var _offsetModifierState$;
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min = offset + overflow[mainSide];
	    var max = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min$1(min, tetherMin) : min, offset, tether ? max$1(max, tetherMax) : max);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }
	  if (checkAltAxis) {
	    var _offsetModifierState$2;
	    var _mainSide = mainAxis === 'x' ? top : left;
	    var _altSide = mainAxis === 'x' ? bottom : right;
	    var _offset = popperOffsets[altAxis];
	    var _len = altAxis === 'y' ? 'height' : 'width';
	    var _min = _offset + overflow[_mainSide];
	    var _max = _offset - overflow[_altSide];
	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement$1(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var isOffsetParentAnElement = isHTMLElement$1(offsetParent);
	  var offsetParentIsScaled = isHTMLElement$1(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement$1(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }
	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	    _generatorOptions$def = _generatorOptions.defaultModifiers,
	    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	    _generatorOptions$def2 = _generatorOptions.defaultOptions,
	    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        });
	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	          reference = _state$elements.reference,
	          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          return;
	        } // Store the reference and popper rects to be read by modifiers

	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	            fn = _state$orderedModifie.fn,
	            _state$orderedModifie2 = _state$orderedModifie.options,
	            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	            name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref) {
	        var name = _ref.name,
	          _ref$options = _ref.options,
	          options = _ref$options === void 0 ? {} : _ref$options,
	          effect = _ref.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		afterMain: afterMain,
		afterRead: afterRead,
		afterWrite: afterWrite,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		auto: auto,
		basePlacements: basePlacements,
		beforeMain: beforeMain,
		beforeRead: beforeRead,
		beforeWrite: beforeWrite,
		bottom: bottom,
		clippingParents: clippingParents,
		computeStyles: computeStyles$1,
		createPopper: createPopper,
		createPopperBase: createPopper$2,
		createPopperLite: createPopper$1,
		detectOverflow: detectOverflow,
		end: end,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		left: left,
		main: main,
		modifierPhases: modifierPhases,
		offset: offset$1,
		placements: placements,
		popper: popper,
		popperGenerator: popperGenerator,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1,
		read: read,
		reference: reference,
		right: right,
		start: start,
		top: top,
		variationPlacements: variationPlacements,
		viewport: viewport,
		write: write
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireBaseComponent(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireUtil()) ;
		})(commonjsGlobal, function (Popper, BaseComponent, EventHandler, Manipulator, SelectorEngine, index_js) {

		  function _interopNamespaceDefault(e) {
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespaceDefault(Popper);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap dropdown.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */

		  const NAME = 'dropdown';
		  const DATA_KEY = 'bs.dropdown';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const TAB_KEY = 'Tab';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_DROPUP = 'dropup';
		  const CLASS_NAME_DROPEND = 'dropend';
		  const CLASS_NAME_DROPSTART = 'dropstart';
		  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
		  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
		  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
		  const SELECTOR_MENU = '.dropdown-menu';
		  const SELECTOR_NAVBAR = '.navbar';
		  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
		  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
		  const PLACEMENT_TOP = index_js.isRTL() ? 'top-end' : 'top-start';
		  const PLACEMENT_TOPEND = index_js.isRTL() ? 'top-start' : 'top-end';
		  const PLACEMENT_BOTTOM = index_js.isRTL() ? 'bottom-end' : 'bottom-start';
		  const PLACEMENT_BOTTOMEND = index_js.isRTL() ? 'bottom-start' : 'bottom-end';
		  const PLACEMENT_RIGHT = index_js.isRTL() ? 'left-start' : 'right-start';
		  const PLACEMENT_LEFT = index_js.isRTL() ? 'right-start' : 'left-start';
		  const PLACEMENT_TOPCENTER = 'top';
		  const PLACEMENT_BOTTOMCENTER = 'bottom';
		  const Default = {
		    autoClose: true,
		    boundary: 'clippingParents',
		    display: 'dynamic',
		    offset: [0, 2],
		    popperConfig: null,
		    reference: 'toggle'
		  };
		  const DefaultType = {
		    autoClose: '(boolean|string)',
		    boundary: '(string|element)',
		    display: 'string',
		    offset: '(array|string|function)',
		    popperConfig: '(null|object|function)',
		    reference: '(string|element|object)'
		  };

		  /**
		   * Class definition
		   */

		  class Dropdown extends BaseComponent {
		    constructor(element, config) {
		      super(element, config);
		      this._popper = null;
		      this._parent = this._element.parentNode; // dropdown wrapper
		      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
		      this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
		      this._inNavbar = this._detectNavbar();
		    }

		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    toggle() {
		      return this._isShown() ? this.hide() : this.show();
		    }
		    show() {
		      if (index_js.isDisabled(this._element) || this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, relatedTarget);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._createPopper();

		      // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
		      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler.on(element, 'mouseover', index_js.noop);
		        }
		      }
		      this._element.focus();
		      this._element.setAttribute('aria-expanded', true);
		      this._menu.classList.add(CLASS_NAME_SHOW);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      EventHandler.trigger(this._element, EVENT_SHOWN, relatedTarget);
		    }
		    hide() {
		      if (index_js.isDisabled(this._element) || !this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      this._completeHide(relatedTarget);
		    }
		    dispose() {
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      super.dispose();
		    }
		    update() {
		      this._inNavbar = this._detectNavbar();
		      if (this._popper) {
		        this._popper.update();
		      }
		    }

		    // Private
		    _completeHide(relatedTarget) {
		      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE, relatedTarget);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }

		      // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support
		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler.off(element, 'mouseover', index_js.noop);
		        }
		      }
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      this._menu.classList.remove(CLASS_NAME_SHOW);
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._element.setAttribute('aria-expanded', 'false');
		      Manipulator.removeDataAttribute(this._menu, 'popper');
		      EventHandler.trigger(this._element, EVENT_HIDDEN, relatedTarget);
		    }
		    _getConfig(config) {
		      config = super._getConfig(config);
		      if (typeof config.reference === 'object' && !index_js.isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
		        // Popper virtual elements require a getBoundingClientRect method
		        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		      }
		      return config;
		    }
		    _createPopper() {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
		      }
		      let referenceElement = this._element;
		      if (this._config.reference === 'parent') {
		        referenceElement = this._parent;
		      } else if (index_js.isElement(this._config.reference)) {
		        referenceElement = index_js.getElement(this._config.reference);
		      } else if (typeof this._config.reference === 'object') {
		        referenceElement = this._config.reference;
		      }
		      const popperConfig = this._getPopperConfig();
		      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
		    }
		    _isShown() {
		      return this._menu.classList.contains(CLASS_NAME_SHOW);
		    }
		    _getPlacement() {
		      const parentDropdown = this._parent;
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
		        return PLACEMENT_RIGHT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
		        return PLACEMENT_LEFT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
		        return PLACEMENT_TOPCENTER;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
		        return PLACEMENT_BOTTOMCENTER;
		      }

		      // We need to trim the value because custom properties can also include spaces
		      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
		        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
		      }
		      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
		    }
		    _detectNavbar() {
		      return this._element.closest(SELECTOR_NAVBAR) !== null;
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _getPopperConfig() {
		      const defaultBsPopperConfig = {
		        placement: this._getPlacement(),
		        modifiers: [{
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }]
		      };

		      // Disable Popper if we have a static display or Dropdown is in Navbar
		      if (this._inNavbar || this._config.display === 'static') {
		        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
		        defaultBsPopperConfig.modifiers = [{
		          name: 'applyStyles',
		          enabled: false
		        }];
		      }
		      return {
		        ...defaultBsPopperConfig,
		        ...index_js.execute(this._config.popperConfig, [defaultBsPopperConfig])
		      };
		    }
		    _selectMenuItem({
		      key,
		      target
		    }) {
		      const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => index_js.isVisible(element));
		      if (!items.length) {
		        return;
		      }

		      // if target isn't included in items (e.g. when expanding the dropdown)
		      // allow cycling to get the last item in case key equals ARROW_UP_KEY
		      index_js.getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Dropdown.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		    static clearMenus(event) {
		      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
		        return;
		      }
		      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
		      for (const toggle of openToggles) {
		        const context = Dropdown.getInstance(toggle);
		        if (!context || context._config.autoClose === false) {
		          continue;
		        }
		        const composedPath = event.composedPath();
		        const isMenuTarget = composedPath.includes(context._menu);
		        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
		          continue;
		        }

		        // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
		        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
		          continue;
		        }
		        const relatedTarget = {
		          relatedTarget: context._element
		        };
		        if (event.type === 'click') {
		          relatedTarget.clickEvent = event;
		        }
		        context._completeHide(relatedTarget);
		      }
		    }
		    static dataApiKeydownHandler(event) {
		      // If not an UP | DOWN | ESCAPE key => not a dropdown command
		      // If input/textarea && if key is other than ESCAPE => not a dropdown command

		      const isInput = /input|textarea/i.test(event.target.tagName);
		      const isEscapeEvent = event.key === ESCAPE_KEY;
		      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
		      if (!isUpOrDownEvent && !isEscapeEvent) {
		        return;
		      }
		      if (isInput && !isEscapeEvent) {
		        return;
		      }
		      event.preventDefault();

		      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
		      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
		      const instance = Dropdown.getOrCreateInstance(getToggleButton);
		      if (isUpOrDownEvent) {
		        event.stopPropagation();
		        instance.show();
		        instance._selectMenuItem(event);
		        return;
		      }
		      if (instance._isShown()) {
		        // else is escape and we check if it is shown
		        event.stopPropagation();
		        instance.hide();
		        getToggleButton.focus();
		      }
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
		  EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
		  EventHandler.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
		  EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
		  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    event.preventDefault();
		    Dropdown.getOrCreateInstance(this).toggle();
		  });

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Dropdown);
		  return Dropdown;
		});
	} (dropdown$1));

	var dropdown = dropdownExports;

	var modalExports = {};
	var modal$1 = {
	  get exports(){ return modalExports; },
	  set exports(v){ modalExports = v; },
	};

	var backdropExports = {};
	var backdrop = {
	  get exports(){ return backdropExports; },
	  set exports(v){ backdropExports = v; },
	};

	/*!
	  * Bootstrap backdrop.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBackdrop;

	function requireBackdrop () {
		if (hasRequiredBackdrop) return backdropExports;
		hasRequiredBackdrop = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireConfig(), requireUtil()) ;
			})(commonjsGlobal, function (EventHandler, Config, index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/backdrop.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const NAME = 'backdrop';
			  const CLASS_NAME_FADE = 'fade';
			  const CLASS_NAME_SHOW = 'show';
			  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
			  const Default = {
			    className: 'modal-backdrop',
			    clickCallback: null,
			    isAnimated: false,
			    isVisible: true,
			    // if false, we use the backdrop helper without adding any element to the dom
			    rootElement: 'body' // give the choice to place backdrop under different elements
			  };
			  const DefaultType = {
			    className: 'string',
			    clickCallback: '(function|null)',
			    isAnimated: 'boolean',
			    isVisible: 'boolean',
			    rootElement: '(element|string)'
			  };

			  /**
			   * Class definition
			   */

			  class Backdrop extends Config {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isAppended = false;
			      this._element = null;
			    }

			    // Getters
			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    }

			    // Public
			    show(callback) {
			      if (!this._config.isVisible) {
			        index_js.execute(callback);
			        return;
			      }
			      this._append();
			      const element = this._getElement();
			      if (this._config.isAnimated) {
			        index_js.reflow(element);
			      }
			      element.classList.add(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        index_js.execute(callback);
			      });
			    }
			    hide(callback) {
			      if (!this._config.isVisible) {
			        index_js.execute(callback);
			        return;
			      }
			      this._getElement().classList.remove(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        this.dispose();
			        index_js.execute(callback);
			      });
			    }
			    dispose() {
			      if (!this._isAppended) {
			        return;
			      }
			      EventHandler.off(this._element, EVENT_MOUSEDOWN);
			      this._element.remove();
			      this._isAppended = false;
			    }

			    // Private
			    _getElement() {
			      if (!this._element) {
			        const backdrop = document.createElement('div');
			        backdrop.className = this._config.className;
			        if (this._config.isAnimated) {
			          backdrop.classList.add(CLASS_NAME_FADE);
			        }
			        this._element = backdrop;
			      }
			      return this._element;
			    }
			    _configAfterMerge(config) {
			      // use getElement() with the default "body" to get a fresh Element on each instantiation
			      config.rootElement = index_js.getElement(config.rootElement);
			      return config;
			    }
			    _append() {
			      if (this._isAppended) {
			        return;
			      }
			      const element = this._getElement();
			      this._config.rootElement.append(element);
			      EventHandler.on(element, EVENT_MOUSEDOWN, () => {
			        index_js.execute(this._config.clickCallback);
			      });
			      this._isAppended = true;
			    }
			    _emulateAnimation(callback) {
			      index_js.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
			    }
			  }
			  return Backdrop;
			});
	} (backdrop));
		return backdropExports;
	}

	var focustrapExports = {};
	var focustrap = {
	  get exports(){ return focustrapExports; },
	  set exports(v){ focustrapExports = v; },
	};

	/*!
	  * Bootstrap focustrap.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredFocustrap;

	function requireFocustrap () {
		if (hasRequiredFocustrap) return focustrapExports;
		hasRequiredFocustrap = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, SelectorEngine, Config) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/focustrap.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const NAME = 'focustrap';
			  const DATA_KEY = 'bs.focustrap';
			  const EVENT_KEY = `.${DATA_KEY}`;
			  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
			  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
			  const TAB_KEY = 'Tab';
			  const TAB_NAV_FORWARD = 'forward';
			  const TAB_NAV_BACKWARD = 'backward';
			  const Default = {
			    autofocus: true,
			    trapElement: null // The element to trap focus inside of
			  };
			  const DefaultType = {
			    autofocus: 'boolean',
			    trapElement: 'element'
			  };

			  /**
			   * Class definition
			   */

			  class FocusTrap extends Config {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isActive = false;
			      this._lastTabNavDirection = null;
			    }

			    // Getters
			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    }

			    // Public
			    activate() {
			      if (this._isActive) {
			        return;
			      }
			      if (this._config.autofocus) {
			        this._config.trapElement.focus();
			      }
			      EventHandler.off(document, EVENT_KEY); // guard against infinite focus loop
			      EventHandler.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
			      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
			      this._isActive = true;
			    }
			    deactivate() {
			      if (!this._isActive) {
			        return;
			      }
			      this._isActive = false;
			      EventHandler.off(document, EVENT_KEY);
			    }

			    // Private
			    _handleFocusin(event) {
			      const {
			        trapElement
			      } = this._config;
			      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
			        return;
			      }
			      const elements = SelectorEngine.focusableChildren(trapElement);
			      if (elements.length === 0) {
			        trapElement.focus();
			      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
			        elements[elements.length - 1].focus();
			      } else {
			        elements[0].focus();
			      }
			    }
			    _handleKeydown(event) {
			      if (event.key !== TAB_KEY) {
			        return;
			      }
			      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
			    }
			  }
			  return FocusTrap;
			});
	} (focustrap));
		return focustrapExports;
	}

	var scrollbarExports = {};
	var scrollbar = {
	  get exports(){ return scrollbarExports; },
	  set exports(v){ scrollbarExports = v; },
	};

	/*!
	  * Bootstrap scrollbar.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredScrollbar;

	function requireScrollbar () {
		if (hasRequiredScrollbar) return scrollbarExports;
		hasRequiredScrollbar = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireManipulator(), requireSelectorEngine(), requireUtil()) ;
			})(commonjsGlobal, function (Manipulator, SelectorEngine, index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/scrollBar.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
			  const SELECTOR_STICKY_CONTENT = '.sticky-top';
			  const PROPERTY_PADDING = 'padding-right';
			  const PROPERTY_MARGIN = 'margin-right';

			  /**
			   * Class definition
			   */

			  class ScrollBarHelper {
			    constructor() {
			      this._element = document.body;
			    }

			    // Public
			    getWidth() {
			      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
			      const documentWidth = document.documentElement.clientWidth;
			      return Math.abs(window.innerWidth - documentWidth);
			    }
			    hide() {
			      const width = this.getWidth();
			      this._disableOverFlow();
			      // give padding to element to balance the hidden scrollbar width
			      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
			      // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
			      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
			      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
			    }
			    reset() {
			      this._resetElementAttributes(this._element, 'overflow');
			      this._resetElementAttributes(this._element, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
			    }
			    isOverflowing() {
			      return this.getWidth() > 0;
			    }

			    // Private
			    _disableOverFlow() {
			      this._saveInitialAttribute(this._element, 'overflow');
			      this._element.style.overflow = 'hidden';
			    }
			    _setElementAttributes(selector, styleProperty, callback) {
			      const scrollbarWidth = this.getWidth();
			      const manipulationCallBack = element => {
			        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
			          return;
			        }
			        this._saveInitialAttribute(element, styleProperty);
			        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
			        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _saveInitialAttribute(element, styleProperty) {
			      const actualValue = element.style.getPropertyValue(styleProperty);
			      if (actualValue) {
			        Manipulator.setDataAttribute(element, styleProperty, actualValue);
			      }
			    }
			    _resetElementAttributes(selector, styleProperty) {
			      const manipulationCallBack = element => {
			        const value = Manipulator.getDataAttribute(element, styleProperty);
			        // We only want to remove the property if the value is `null`; the value can also be zero
			        if (value === null) {
			          element.style.removeProperty(styleProperty);
			          return;
			        }
			        Manipulator.removeDataAttribute(element, styleProperty);
			        element.style.setProperty(styleProperty, value);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _applyManipulationCallback(selector, callBack) {
			      if (index_js.isElement(selector)) {
			        callBack(selector);
			        return;
			      }
			      for (const sel of SelectorEngine.find(selector, this._element)) {
			        callBack(sel);
			      }
			    }
			  }
			  return ScrollBarHelper;
			});
	} (scrollbar));
		return scrollbarExports;
	}

	/*!
	  * Bootstrap modal.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireSelectorEngine(), requireBackdrop(), requireComponentFunctions(), requireFocustrap(), requireUtil(), requireScrollbar()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, SelectorEngine, Backdrop, componentFunctions_js, FocusTrap, index_js, ScrollBarHelper) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap modal.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'modal';
		  const DATA_KEY = 'bs.modal';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
		  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_OPEN = 'modal-open';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_STATIC = 'modal-static';
		  const OPEN_SELECTOR = '.modal.show';
		  const SELECTOR_DIALOG = '.modal-dialog';
		  const SELECTOR_MODAL_BODY = '.modal-body';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
		  const Default = {
		    backdrop: true,
		    focus: true,
		    keyboard: true
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    focus: 'boolean',
		    keyboard: 'boolean'
		  };

		  /**
		   * Class definition
		   */

		  class Modal extends BaseComponent {
		    constructor(element, config) {
		      super(element, config);
		      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._isShown = false;
		      this._isTransitioning = false;
		      this._scrollBar = new ScrollBarHelper();
		      this._addEventListeners();
		    }

		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown || this._isTransitioning) {
		        return;
		      }
		      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._isTransitioning = true;
		      this._scrollBar.hide();
		      document.body.classList.add(CLASS_NAME_OPEN);
		      this._adjustDialog();
		      this._backdrop.show(() => this._showElement(relatedTarget));
		    }
		    hide() {
		      if (!this._isShown || this._isTransitioning) {
		        return;
		      }
		      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = false;
		      this._isTransitioning = true;
		      this._focustrap.deactivate();
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
		    }
		    dispose() {
		      EventHandler.off(window, EVENT_KEY);
		      EventHandler.off(this._dialog, EVENT_KEY);
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    }
		    handleUpdate() {
		      this._adjustDialog();
		    }

		    // Private
		    _initializeBackDrop() {
		      return new Backdrop({
		        isVisible: Boolean(this._config.backdrop),
		        // 'static' option will be translated to true, and booleans will keep their value,
		        isAnimated: this._isAnimated()
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap({
		        trapElement: this._element
		      });
		    }
		    _showElement(relatedTarget) {
		      // try to append dynamic modal
		      if (!document.body.contains(this._element)) {
		        document.body.append(this._element);
		      }
		      this._element.style.display = 'block';
		      this._element.removeAttribute('aria-hidden');
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.scrollTop = 0;
		      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
		      if (modalBody) {
		        modalBody.scrollTop = 0;
		      }
		      index_js.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      const transitionComplete = () => {
		        if (this._config.focus) {
		          this._focustrap.activate();
		        }
		        this._isTransitioning = false;
		        EventHandler.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
		    }
		    _addEventListeners() {
		      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (this._config.keyboard) {
		          this.hide();
		          return;
		        }
		        this._triggerBackdropTransition();
		      });
		      EventHandler.on(window, EVENT_RESIZE, () => {
		        if (this._isShown && !this._isTransitioning) {
		          this._adjustDialog();
		        }
		      });
		      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
		        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
		        EventHandler.one(this._element, EVENT_CLICK_DISMISS, event2 => {
		          if (this._element !== event.target || this._element !== event2.target) {
		            return;
		          }
		          if (this._config.backdrop === 'static') {
		            this._triggerBackdropTransition();
		            return;
		          }
		          if (this._config.backdrop) {
		            this.hide();
		          }
		        });
		      });
		    }
		    _hideModal() {
		      this._element.style.display = 'none';
		      this._element.setAttribute('aria-hidden', true);
		      this._element.removeAttribute('aria-modal');
		      this._element.removeAttribute('role');
		      this._isTransitioning = false;
		      this._backdrop.hide(() => {
		        document.body.classList.remove(CLASS_NAME_OPEN);
		        this._resetAdjustments();
		        this._scrollBar.reset();
		        EventHandler.trigger(this._element, EVENT_HIDDEN);
		      });
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_FADE);
		    }
		    _triggerBackdropTransition() {
		      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const initialOverflowY = this._element.style.overflowY;
		      // return if the following background transition hasn't yet completed
		      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
		        return;
		      }
		      if (!isModalOverflowing) {
		        this._element.style.overflowY = 'hidden';
		      }
		      this._element.classList.add(CLASS_NAME_STATIC);
		      this._queueCallback(() => {
		        this._element.classList.remove(CLASS_NAME_STATIC);
		        this._queueCallback(() => {
		          this._element.style.overflowY = initialOverflowY;
		        }, this._dialog);
		      }, this._dialog);
		      this._element.focus();
		    }

		    /**
		     * The following methods are used to handle overflowing modals
		     */

		    _adjustDialog() {
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const scrollbarWidth = this._scrollBar.getWidth();
		      const isBodyOverflowing = scrollbarWidth > 0;
		      if (isBodyOverflowing && !isModalOverflowing) {
		        const property = index_js.isRTL() ? 'paddingLeft' : 'paddingRight';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		      if (!isBodyOverflowing && isModalOverflowing) {
		        const property = index_js.isRTL() ? 'paddingRight' : 'paddingLeft';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		    }
		    _resetAdjustments() {
		      this._element.style.paddingLeft = '';
		      this._element.style.paddingRight = '';
		    }

		    // Static
		    static jQueryInterface(config, relatedTarget) {
		      return this.each(function () {
		        const data = Modal.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](relatedTarget);
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = SelectorEngine.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    EventHandler.one(target, EVENT_SHOW, showEvent => {
		      if (showEvent.defaultPrevented) {
		        // only register focus restorer if modal will actually get shown
		        return;
		      }
		      EventHandler.one(target, EVENT_HIDDEN, () => {
		        if (index_js.isVisible(this)) {
		          this.focus();
		        }
		      });
		    });

		    // avoid conflict when clicking modal toggler while another one is open
		    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
		    if (alreadyOpen) {
		      Modal.getInstance(alreadyOpen).hide();
		    }
		    const data = Modal.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  componentFunctions_js.enableDismissTrigger(Modal);

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Modal);
		  return Modal;
		});
	} (modal$1));

	var modal = modalExports;

	var offcanvasExports = {};
	var offcanvas$1 = {
	  get exports(){ return offcanvasExports; },
	  set exports(v){ offcanvasExports = v; },
	};

	/*!
	  * Bootstrap offcanvas.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireSelectorEngine(), requireBackdrop(), requireComponentFunctions(), requireFocustrap(), requireUtil(), requireScrollbar()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, SelectorEngine, Backdrop, componentFunctions_js, FocusTrap, index_js, ScrollBarHelper) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap offcanvas.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'offcanvas';
		  const DATA_KEY = 'bs.offcanvas';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const ESCAPE_KEY = 'Escape';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const CLASS_NAME_HIDING = 'hiding';
		  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
		  const OPEN_SELECTOR = '.offcanvas.show';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
		  const Default = {
		    backdrop: true,
		    keyboard: true,
		    scroll: false
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    keyboard: 'boolean',
		    scroll: 'boolean'
		  };

		  /**
		   * Class definition
		   */

		  class Offcanvas extends BaseComponent {
		    constructor(element, config) {
		      super(element, config);
		      this._isShown = false;
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._addEventListeners();
		    }

		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown) {
		        return;
		      }
		      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._backdrop.show();
		      if (!this._config.scroll) {
		        new ScrollBarHelper().hide();
		      }
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      const completeCallBack = () => {
		        if (!this._config.scroll || this._config.backdrop) {
		          this._focustrap.activate();
		        }
		        this._element.classList.add(CLASS_NAME_SHOW);
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(completeCallBack, this._element, true);
		    }
		    hide() {
		      if (!this._isShown) {
		        return;
		      }
		      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._focustrap.deactivate();
		      this._element.blur();
		      this._isShown = false;
		      this._element.classList.add(CLASS_NAME_HIDING);
		      this._backdrop.hide();
		      const completeCallback = () => {
		        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);
		        this._element.removeAttribute('aria-modal');
		        this._element.removeAttribute('role');
		        if (!this._config.scroll) {
		          new ScrollBarHelper().reset();
		        }
		        EventHandler.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._queueCallback(completeCallback, this._element, true);
		    }
		    dispose() {
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    }

		    // Private
		    _initializeBackDrop() {
		      const clickCallback = () => {
		        if (this._config.backdrop === 'static') {
		          EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      };

		      // 'static' option will be translated to true, and booleans will keep their value
		      const isVisible = Boolean(this._config.backdrop);
		      return new Backdrop({
		        className: CLASS_NAME_BACKDROP,
		        isVisible,
		        isAnimated: true,
		        rootElement: this._element.parentNode,
		        clickCallback: isVisible ? clickCallback : null
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap({
		        trapElement: this._element
		      });
		    }
		    _addEventListeners() {
		      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (this._config.keyboard) {
		          this.hide();
		          return;
		        }
		        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
		      });
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Offcanvas.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = SelectorEngine.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index_js.isDisabled(this)) {
		      return;
		    }
		    EventHandler.one(target, EVENT_HIDDEN, () => {
		      // focus on trigger when it is closed
		      if (index_js.isVisible(this)) {
		        this.focus();
		      }
		    });

		    // avoid conflict when clicking a toggler of an offcanvas, while another is open
		    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
		    if (alreadyOpen && alreadyOpen !== target) {
		      Offcanvas.getInstance(alreadyOpen).hide();
		    }
		    const data = Offcanvas.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
		      Offcanvas.getOrCreateInstance(selector).show();
		    }
		  });
		  EventHandler.on(window, EVENT_RESIZE, () => {
		    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
		      if (getComputedStyle(element).position !== 'fixed') {
		        Offcanvas.getOrCreateInstance(element).hide();
		      }
		    }
		  });
		  componentFunctions_js.enableDismissTrigger(Offcanvas);

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Offcanvas);
		  return Offcanvas;
		});
	} (offcanvas$1));

	var offcanvas = offcanvasExports;

	var popoverExports = {};
	var popover$1 = {
	  get exports(){ return popoverExports; },
	  set exports(v){ popoverExports = v; },
	};

	var tooltipExports = {};
	var tooltip$1 = {
	  get exports(){ return tooltipExports; },
	  set exports(v){ tooltipExports = v; },
	};

	var sanitizerExports = {};
	var sanitizer = {
	  get exports(){ return sanitizerExports; },
	  set exports(v){ sanitizerExports = v; },
	};

	/*!
	  * Bootstrap sanitizer.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSanitizer;

	function requireSanitizer () {
		if (hasRequiredSanitizer) return sanitizerExports;
		hasRequiredSanitizer = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/sanitizer.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  // js-docs-start allow-list
			  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
			  const DefaultAllowlist = {
			    // Global attributes allowed on any supplied element below.
			    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
			    a: ['target', 'href', 'title', 'rel'],
			    area: [],
			    b: [],
			    br: [],
			    col: [],
			    code: [],
			    dd: [],
			    div: [],
			    dl: [],
			    dt: [],
			    em: [],
			    hr: [],
			    h1: [],
			    h2: [],
			    h3: [],
			    h4: [],
			    h5: [],
			    h6: [],
			    i: [],
			    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
			    li: [],
			    ol: [],
			    p: [],
			    pre: [],
			    s: [],
			    small: [],
			    span: [],
			    sub: [],
			    sup: [],
			    strong: [],
			    u: [],
			    ul: []
			  };
			  // js-docs-end allow-list

			  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

			  /**
			   * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
			   * contexts.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
			   */
			  // eslint-disable-next-line unicorn/better-regex
			  const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
			  const allowedAttribute = (attribute, allowedAttributeList) => {
			    const attributeName = attribute.nodeName.toLowerCase();
			    if (allowedAttributeList.includes(attributeName)) {
			      if (uriAttributes.has(attributeName)) {
			        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
			      }
			      return true;
			    }

			    // Check if a regular expression validates the attribute.
			    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
			  };
			  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
			    if (!unsafeHtml.length) {
			      return unsafeHtml;
			    }
			    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
			      return sanitizeFunction(unsafeHtml);
			    }
			    const domParser = new window.DOMParser();
			    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
			    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
			    for (const element of elements) {
			      const elementName = element.nodeName.toLowerCase();
			      if (!Object.keys(allowList).includes(elementName)) {
			        element.remove();
			        continue;
			      }
			      const attributeList = [].concat(...element.attributes);
			      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
			      for (const attribute of attributeList) {
			        if (!allowedAttribute(attribute, allowedAttributes)) {
			          element.removeAttribute(attribute.nodeName);
			        }
			      }
			    }
			    return createdDocument.body.innerHTML;
			  }
			  exports.DefaultAllowlist = DefaultAllowlist;
			  exports.sanitizeHtml = sanitizeHtml;
			  Object.defineProperty(exports, Symbol.toStringTag, {
			    value: 'Module'
			  });
			});
	} (sanitizer, sanitizerExports));
		return sanitizerExports;
	}

	var templateFactoryExports = {};
	var templateFactory = {
	  get exports(){ return templateFactoryExports; },
	  set exports(v){ templateFactoryExports = v; },
	};

	/*!
	  * Bootstrap template-factory.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredTemplateFactory;

	function requireTemplateFactory () {
		if (hasRequiredTemplateFactory) return templateFactoryExports;
		hasRequiredTemplateFactory = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSelectorEngine(), requireConfig(), requireSanitizer(), requireUtil()) ;
			})(commonjsGlobal, function (SelectorEngine, Config, sanitizer_js, index_js) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap util/template-factory.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const NAME = 'TemplateFactory';
			  const Default = {
			    allowList: sanitizer_js.DefaultAllowlist,
			    content: {},
			    // { selector : text ,  selector2 : text2 , }
			    extraClass: '',
			    html: false,
			    sanitize: true,
			    sanitizeFn: null,
			    template: '<div></div>'
			  };
			  const DefaultType = {
			    allowList: 'object',
			    content: 'object',
			    extraClass: '(string|function)',
			    html: 'boolean',
			    sanitize: 'boolean',
			    sanitizeFn: '(null|function)',
			    template: 'string'
			  };
			  const DefaultContentType = {
			    entry: '(string|element|function|null)',
			    selector: '(string|element)'
			  };

			  /**
			   * Class definition
			   */

			  class TemplateFactory extends Config {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			    }

			    // Getters
			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    }

			    // Public
			    getContent() {
			      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
			    }
			    hasContent() {
			      return this.getContent().length > 0;
			    }
			    changeContent(content) {
			      this._checkContent(content);
			      this._config.content = {
			        ...this._config.content,
			        ...content
			      };
			      return this;
			    }
			    toHtml() {
			      const templateWrapper = document.createElement('div');
			      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
			      for (const [selector, text] of Object.entries(this._config.content)) {
			        this._setContent(templateWrapper, text, selector);
			      }
			      const template = templateWrapper.children[0];
			      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
			      if (extraClass) {
			        template.classList.add(...extraClass.split(' '));
			      }
			      return template;
			    }

			    // Private
			    _typeCheckConfig(config) {
			      super._typeCheckConfig(config);
			      this._checkContent(config.content);
			    }
			    _checkContent(arg) {
			      for (const [selector, content] of Object.entries(arg)) {
			        super._typeCheckConfig({
			          selector,
			          entry: content
			        }, DefaultContentType);
			      }
			    }
			    _setContent(template, content, selector) {
			      const templateElement = SelectorEngine.findOne(selector, template);
			      if (!templateElement) {
			        return;
			      }
			      content = this._resolvePossibleFunction(content);
			      if (!content) {
			        templateElement.remove();
			        return;
			      }
			      if (index_js.isElement(content)) {
			        this._putElementInTemplate(index_js.getElement(content), templateElement);
			        return;
			      }
			      if (this._config.html) {
			        templateElement.innerHTML = this._maybeSanitize(content);
			        return;
			      }
			      templateElement.textContent = content;
			    }
			    _maybeSanitize(arg) {
			      return this._config.sanitize ? sanitizer_js.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
			    }
			    _resolvePossibleFunction(arg) {
			      return index_js.execute(arg, [this]);
			    }
			    _putElementInTemplate(element, templateElement) {
			      if (this._config.html) {
			        templateElement.innerHTML = '';
			        templateElement.append(element);
			        return;
			      }
			      templateElement.textContent = element.textContent;
			    }
			  }
			  return TemplateFactory;
			});
	} (templateFactory));
		return templateFactoryExports;
	}

	/*!
	  * Bootstrap tooltip.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireBaseComponent(), requireEventHandler(), requireManipulator(), requireUtil(), requireSanitizer(), requireTemplateFactory()) ;
		})(commonjsGlobal, function (Popper, BaseComponent, EventHandler, Manipulator, index_js, sanitizer_js, TemplateFactory) {

		  function _interopNamespaceDefault(e) {
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespaceDefault(Popper);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap tooltip.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */

		  const NAME = 'tooltip';
		  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_MODAL = 'modal';
		  const CLASS_NAME_SHOW = 'show';
		  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
		  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
		  const EVENT_MODAL_HIDE = 'hide.bs.modal';
		  const TRIGGER_HOVER = 'hover';
		  const TRIGGER_FOCUS = 'focus';
		  const TRIGGER_CLICK = 'click';
		  const TRIGGER_MANUAL = 'manual';
		  const EVENT_HIDE = 'hide';
		  const EVENT_HIDDEN = 'hidden';
		  const EVENT_SHOW = 'show';
		  const EVENT_SHOWN = 'shown';
		  const EVENT_INSERTED = 'inserted';
		  const EVENT_CLICK = 'click';
		  const EVENT_FOCUSIN = 'focusin';
		  const EVENT_FOCUSOUT = 'focusout';
		  const EVENT_MOUSEENTER = 'mouseenter';
		  const EVENT_MOUSELEAVE = 'mouseleave';
		  const AttachmentMap = {
		    AUTO: 'auto',
		    TOP: 'top',
		    RIGHT: index_js.isRTL() ? 'left' : 'right',
		    BOTTOM: 'bottom',
		    LEFT: index_js.isRTL() ? 'right' : 'left'
		  };
		  const Default = {
		    allowList: sanitizer_js.DefaultAllowlist,
		    animation: true,
		    boundary: 'clippingParents',
		    container: false,
		    customClass: '',
		    delay: 0,
		    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
		    html: false,
		    offset: [0, 6],
		    placement: 'top',
		    popperConfig: null,
		    sanitize: true,
		    sanitizeFn: null,
		    selector: false,
		    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
		    title: '',
		    trigger: 'hover focus'
		  };
		  const DefaultType = {
		    allowList: 'object',
		    animation: 'boolean',
		    boundary: '(string|element)',
		    container: '(string|element|boolean)',
		    customClass: '(string|function)',
		    delay: '(number|object)',
		    fallbackPlacements: 'array',
		    html: 'boolean',
		    offset: '(array|string|function)',
		    placement: '(string|function)',
		    popperConfig: '(null|object|function)',
		    sanitize: 'boolean',
		    sanitizeFn: '(null|function)',
		    selector: '(string|boolean)',
		    template: 'string',
		    title: '(string|element|function)',
		    trigger: 'string'
		  };

		  /**
		   * Class definition
		   */

		  class Tooltip extends BaseComponent {
		    constructor(element, config) {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
		      }
		      super(element, config);

		      // Private
		      this._isEnabled = true;
		      this._timeout = 0;
		      this._isHovered = null;
		      this._activeTrigger = {};
		      this._popper = null;
		      this._templateFactory = null;
		      this._newContent = null;

		      // Protected
		      this.tip = null;
		      this._setListeners();
		      if (!this._config.selector) {
		        this._fixTitle();
		      }
		    }

		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    enable() {
		      this._isEnabled = true;
		    }
		    disable() {
		      this._isEnabled = false;
		    }
		    toggleEnabled() {
		      this._isEnabled = !this._isEnabled;
		    }
		    toggle() {
		      if (!this._isEnabled) {
		        return;
		      }
		      this._activeTrigger.click = !this._activeTrigger.click;
		      if (this._isShown()) {
		        this._leave();
		        return;
		      }
		      this._enter();
		    }
		    dispose() {
		      clearTimeout(this._timeout);
		      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		      if (this._element.getAttribute('data-bs-original-title')) {
		        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
		      }
		      this._disposePopper();
		      super.dispose();
		    }
		    show() {
		      if (this._element.style.display === 'none') {
		        throw new Error('Please use show on visible elements');
		      }
		      if (!(this._isWithContent() && this._isEnabled)) {
		        return;
		      }
		      const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
		      const shadowRoot = index_js.findShadowRoot(this._element);
		      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
		      if (showEvent.defaultPrevented || !isInTheDom) {
		        return;
		      }

		      // TODO: v6 remove this or make it optional
		      this._disposePopper();
		      const tip = this._getTipElement();
		      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
		      const {
		        container
		      } = this._config;
		      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
		        container.append(tip);
		        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
		      }
		      this._popper = this._createPopper(tip);
		      tip.classList.add(CLASS_NAME_SHOW);

		      // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler.on(element, 'mouseover', index_js.noop);
		        }
		      }
		      const complete = () => {
		        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));
		        if (this._isHovered === false) {
		          this._leave();
		        }
		        this._isHovered = false;
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    hide() {
		      if (!this._isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE));
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const tip = this._getTipElement();
		      tip.classList.remove(CLASS_NAME_SHOW);

		      // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support
		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler.off(element, 'mouseover', index_js.noop);
		        }
		      }
		      this._activeTrigger[TRIGGER_CLICK] = false;
		      this._activeTrigger[TRIGGER_FOCUS] = false;
		      this._activeTrigger[TRIGGER_HOVER] = false;
		      this._isHovered = null; // it is a trick to support manual triggering

		      const complete = () => {
		        if (this._isWithActiveTrigger()) {
		          return;
		        }
		        if (!this._isHovered) {
		          this._disposePopper();
		        }
		        this._element.removeAttribute('aria-describedby');
		        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    update() {
		      if (this._popper) {
		        this._popper.update();
		      }
		    }

		    // Protected
		    _isWithContent() {
		      return Boolean(this._getTitle());
		    }
		    _getTipElement() {
		      if (!this.tip) {
		        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
		      }
		      return this.tip;
		    }
		    _createTipElement(content) {
		      const tip = this._getTemplateFactory(content).toHtml();

		      // TODO: remove this check in v6
		      if (!tip) {
		        return null;
		      }
		      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
		      // TODO: v6 the following can be achieved with CSS only
		      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
		      const tipId = index_js.getUID(this.constructor.NAME).toString();
		      tip.setAttribute('id', tipId);
		      if (this._isAnimated()) {
		        tip.classList.add(CLASS_NAME_FADE);
		      }
		      return tip;
		    }
		    setContent(content) {
		      this._newContent = content;
		      if (this._isShown()) {
		        this._disposePopper();
		        this.show();
		      }
		    }
		    _getTemplateFactory(content) {
		      if (this._templateFactory) {
		        this._templateFactory.changeContent(content);
		      } else {
		        this._templateFactory = new TemplateFactory({
		          ...this._config,
		          // the `content` var has to be after `this._config`
		          // to override config.content in case of popover
		          content,
		          extraClass: this._resolvePossibleFunction(this._config.customClass)
		        });
		      }
		      return this._templateFactory;
		    }
		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
		      };
		    }
		    _getTitle() {
		      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
		    }

		    // Private
		    _initializeOnDelegatedTarget(event) {
		      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
		    }
		    _isAnimated() {
		      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
		    }
		    _isShown() {
		      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
		    }
		    _createPopper(tip) {
		      const placement = index_js.execute(this._config.placement, [this, tip, this._element]);
		      const attachment = AttachmentMap[placement.toUpperCase()];
		      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _resolvePossibleFunction(arg) {
		      return index_js.execute(arg, [this._element]);
		    }
		    _getPopperConfig(attachment) {
		      const defaultBsPopperConfig = {
		        placement: attachment,
		        modifiers: [{
		          name: 'flip',
		          options: {
		            fallbackPlacements: this._config.fallbackPlacements
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }, {
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'arrow',
		          options: {
		            element: `.${this.constructor.NAME}-arrow`
		          }
		        }, {
		          name: 'preSetPlacement',
		          enabled: true,
		          phase: 'beforeMain',
		          fn: data => {
		            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
		            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
		            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
		          }
		        }]
		      };
		      return {
		        ...defaultBsPopperConfig,
		        ...index_js.execute(this._config.popperConfig, [defaultBsPopperConfig])
		      };
		    }
		    _setListeners() {
		      const triggers = this._config.trigger.split(' ');
		      for (const trigger of triggers) {
		        if (trigger === 'click') {
		          EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context.toggle();
		          });
		        } else if (trigger !== TRIGGER_MANUAL) {
		          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
		          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
		          EventHandler.on(this._element, eventIn, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
		            context._enter();
		          });
		          EventHandler.on(this._element, eventOut, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
		            context._leave();
		          });
		        }
		      }
		      this._hideModalHandler = () => {
		        if (this._element) {
		          this.hide();
		        }
		      };
		      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		    }
		    _fixTitle() {
		      const title = this._element.getAttribute('title');
		      if (!title) {
		        return;
		      }
		      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
		        this._element.setAttribute('aria-label', title);
		      }
		      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
		      this._element.removeAttribute('title');
		    }
		    _enter() {
		      if (this._isShown() || this._isHovered) {
		        this._isHovered = true;
		        return;
		      }
		      this._isHovered = true;
		      this._setTimeout(() => {
		        if (this._isHovered) {
		          this.show();
		        }
		      }, this._config.delay.show);
		    }
		    _leave() {
		      if (this._isWithActiveTrigger()) {
		        return;
		      }
		      this._isHovered = false;
		      this._setTimeout(() => {
		        if (!this._isHovered) {
		          this.hide();
		        }
		      }, this._config.delay.hide);
		    }
		    _setTimeout(handler, timeout) {
		      clearTimeout(this._timeout);
		      this._timeout = setTimeout(handler, timeout);
		    }
		    _isWithActiveTrigger() {
		      return Object.values(this._activeTrigger).includes(true);
		    }
		    _getConfig(config) {
		      const dataAttributes = Manipulator.getDataAttributes(this._element);
		      for (const dataAttribute of Object.keys(dataAttributes)) {
		        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
		          delete dataAttributes[dataAttribute];
		        }
		      }
		      config = {
		        ...dataAttributes,
		        ...(typeof config === 'object' && config ? config : {})
		      };
		      config = this._mergeConfigObj(config);
		      config = this._configAfterMerge(config);
		      this._typeCheckConfig(config);
		      return config;
		    }
		    _configAfterMerge(config) {
		      config.container = config.container === false ? document.body : index_js.getElement(config.container);
		      if (typeof config.delay === 'number') {
		        config.delay = {
		          show: config.delay,
		          hide: config.delay
		        };
		      }
		      if (typeof config.title === 'number') {
		        config.title = config.title.toString();
		      }
		      if (typeof config.content === 'number') {
		        config.content = config.content.toString();
		      }
		      return config;
		    }
		    _getDelegateConfig() {
		      const config = {};
		      for (const [key, value] of Object.entries(this._config)) {
		        if (this.constructor.Default[key] !== value) {
		          config[key] = value;
		        }
		      }
		      config.selector = false;
		      config.trigger = 'manual';

		      // In the future can be replaced with:
		      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
		      // `Object.fromEntries(keysWithDifferentValues)`
		      return config;
		    }
		    _disposePopper() {
		      if (this._popper) {
		        this._popper.destroy();
		        this._popper = null;
		      }
		      if (this.tip) {
		        this.tip.remove();
		        this.tip = null;
		      }
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tooltip.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Tooltip);
		  return Tooltip;
		});
	} (tooltip$1));

	var tooltip = tooltipExports;

	/*!
	  * Bootstrap popover.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(tooltipExports, requireUtil()) ;
		})(commonjsGlobal, function (Tooltip, index_js) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap popover.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'popover';
		  const SELECTOR_TITLE = '.popover-header';
		  const SELECTOR_CONTENT = '.popover-body';
		  const Default = {
		    ...Tooltip.Default,
		    content: '',
		    offset: [0, 8],
		    placement: 'right',
		    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
		    trigger: 'click'
		  };
		  const DefaultType = {
		    ...Tooltip.DefaultType,
		    content: '(null|string|element|function)'
		  };

		  /**
		   * Class definition
		   */

		  class Popover extends Tooltip {
		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Overrides
		    _isWithContent() {
		      return this._getTitle() || this._getContent();
		    }

		    // Private
		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TITLE]: this._getTitle(),
		        [SELECTOR_CONTENT]: this._getContent()
		      };
		    }
		    _getContent() {
		      return this._resolvePossibleFunction(this._config.content);
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Popover.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Popover);
		  return Popover;
		});
	} (popover$1));

	var popover = popoverExports;

	var scrollspyExports = {};
	var scrollspy$1 = {
	  get exports(){ return scrollspyExports; },
	  set exports(v){ scrollspyExports = v; },
	};

	/*!
	  * Bootstrap scrollspy.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireSelectorEngine(), requireUtil()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, SelectorEngine, index_js) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap scrollspy.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'scrollspy';
		  const DATA_KEY = 'bs.scrollspy';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
		  const EVENT_CLICK = `click${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
		  const SELECTOR_TARGET_LINKS = '[href]';
		  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
		  const SELECTOR_NAV_LINKS = '.nav-link';
		  const SELECTOR_NAV_ITEMS = '.nav-item';
		  const SELECTOR_LIST_ITEMS = '.list-group-item';
		  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
		  const SELECTOR_DROPDOWN = '.dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const Default = {
		    offset: null,
		    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: '0px 0px -25%',
		    smoothScroll: false,
		    target: null,
		    threshold: [0.1, 0.5, 1]
		  };
		  const DefaultType = {
		    offset: '(number|null)',
		    // TODO v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: 'string',
		    smoothScroll: 'boolean',
		    target: 'element',
		    threshold: 'array'
		  };

		  /**
		   * Class definition
		   */

		  class ScrollSpy extends BaseComponent {
		    constructor(element, config) {
		      super(element, config);

		      // this._element is the observablesContainer and config.target the menu links wrapper
		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
		      this._activeTarget = null;
		      this._observer = null;
		      this._previousScrollData = {
		        visibleEntryTop: 0,
		        parentScrollTop: 0
		      };
		      this.refresh(); // initialize
		    }

		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    refresh() {
		      this._initializeTargetsAndObservables();
		      this._maybeEnableSmoothScroll();
		      if (this._observer) {
		        this._observer.disconnect();
		      } else {
		        this._observer = this._getNewObserver();
		      }
		      for (const section of this._observableSections.values()) {
		        this._observer.observe(section);
		      }
		    }
		    dispose() {
		      this._observer.disconnect();
		      super.dispose();
		    }

		    // Private
		    _configAfterMerge(config) {
		      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
		      config.target = index_js.getElement(config.target) || document.body;

		      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
		      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
		      if (typeof config.threshold === 'string') {
		        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
		      }
		      return config;
		    }
		    _maybeEnableSmoothScroll() {
		      if (!this._config.smoothScroll) {
		        return;
		      }

		      // unregister any previous listeners
		      EventHandler.off(this._config.target, EVENT_CLICK);
		      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
		        const observableSection = this._observableSections.get(event.target.hash);
		        if (observableSection) {
		          event.preventDefault();
		          const root = this._rootElement || window;
		          const height = observableSection.offsetTop - this._element.offsetTop;
		          if (root.scrollTo) {
		            root.scrollTo({
		              top: height,
		              behavior: 'smooth'
		            });
		            return;
		          }

		          // Chrome 60 doesn't support `scrollTo`
		          root.scrollTop = height;
		        }
		      });
		    }
		    _getNewObserver() {
		      const options = {
		        root: this._rootElement,
		        threshold: this._config.threshold,
		        rootMargin: this._config.rootMargin
		      };
		      return new IntersectionObserver(entries => this._observerCallback(entries), options);
		    }

		    // The logic of selection
		    _observerCallback(entries) {
		      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
		      const activate = entry => {
		        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
		        this._process(targetElement(entry));
		      };
		      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
		      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
		      this._previousScrollData.parentScrollTop = parentScrollTop;
		      for (const entry of entries) {
		        if (!entry.isIntersecting) {
		          this._activeTarget = null;
		          this._clearActiveClass(targetElement(entry));
		          continue;
		        }
		        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
		        // if we are scrolling down, pick the bigger offsetTop
		        if (userScrollsDown && entryIsLowerThanPrevious) {
		          activate(entry);
		          // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
		          if (!parentScrollTop) {
		            return;
		          }
		          continue;
		        }

		        // if we are scrolling up, pick the smallest offsetTop
		        if (!userScrollsDown && !entryIsLowerThanPrevious) {
		          activate(entry);
		        }
		      }
		    }
		    _initializeTargetsAndObservables() {
		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
		      for (const anchor of targetLinks) {
		        // ensure that the anchor has an id and is not disabled
		        if (!anchor.hash || index_js.isDisabled(anchor)) {
		          continue;
		        }
		        const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);

		        // ensure that the observableSection exists & is visible
		        if (index_js.isVisible(observableSection)) {
		          this._targetLinks.set(decodeURI(anchor.hash), anchor);
		          this._observableSections.set(anchor.hash, observableSection);
		        }
		      }
		    }
		    _process(target) {
		      if (this._activeTarget === target) {
		        return;
		      }
		      this._clearActiveClass(this._config.target);
		      this._activeTarget = target;
		      target.classList.add(CLASS_NAME_ACTIVE);
		      this._activateParents(target);
		      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
		        relatedTarget: target
		      });
		    }
		    _activateParents(target) {
		      // Activate dropdown parents
		      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
		        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
		        return;
		      }
		      for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
		        // Set triggered links parents as active
		        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
		        for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
		          item.classList.add(CLASS_NAME_ACTIVE);
		        }
		      }
		    }
		    _clearActiveClass(parent) {
		      parent.classList.remove(CLASS_NAME_ACTIVE);
		      const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE}`, parent);
		      for (const node of activeNodes) {
		        node.classList.remove(CLASS_NAME_ACTIVE);
		      }
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = ScrollSpy.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
		      ScrollSpy.getOrCreateInstance(spy);
		    }
		  });

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(ScrollSpy);
		  return ScrollSpy;
		});
	} (scrollspy$1));

	var scrollspy = scrollspyExports;

	var tabExports = {};
	var tab$1 = {
	  get exports(){ return tabExports; },
	  set exports(v){ tabExports = v; },
	};

	/*!
	  * Bootstrap tab.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireSelectorEngine(), requireUtil()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, SelectorEngine, index_js) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap tab.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'tab';
		  const DATA_KEY = 'bs.tab';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const HOME_KEY = 'Home';
		  const END_KEY = 'End';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_DROPDOWN = 'dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
		  const NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
		  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
		  const SELECTOR_OUTER = '.nav-item, .list-group-item';
		  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
		  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

		  /**
		   * Class definition
		   */

		  class Tab extends BaseComponent {
		    constructor(element) {
		      super(element);
		      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
		      if (!this._parent) {
		        return;
		        // TODO: should throw exception in v6
		        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
		      }

		      // Set up initial aria attributes
		      this._setInitialAttributes(this._parent, this._getChildren());
		      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		    }

		    // Getters
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    show() {
		      // Shows this elem and deactivate the active sibling if exists
		      const innerElem = this._element;
		      if (this._elemIsActive(innerElem)) {
		        return;
		      }

		      // Search for active tab on same parent to deactivate it
		      const active = this._getActiveElem();
		      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE, {
		        relatedTarget: innerElem
		      }) : null;
		      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW, {
		        relatedTarget: active
		      });
		      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
		        return;
		      }
		      this._deactivate(active, innerElem);
		      this._activate(innerElem, active);
		    }

		    // Private
		    _activate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.add(CLASS_NAME_ACTIVE);
		      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.add(CLASS_NAME_SHOW);
		          return;
		        }
		        element.removeAttribute('tabindex');
		        element.setAttribute('aria-selected', true);
		        this._toggleDropDown(element, true);
		        EventHandler.trigger(element, EVENT_SHOWN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _deactivate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.remove(CLASS_NAME_ACTIVE);
		      element.blur();
		      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.remove(CLASS_NAME_SHOW);
		          return;
		        }
		        element.setAttribute('aria-selected', false);
		        element.setAttribute('tabindex', '-1');
		        this._toggleDropDown(element, false);
		        EventHandler.trigger(element, EVENT_HIDDEN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _keydown(event) {
		      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
		        return;
		      }
		      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
		      event.preventDefault();
		      const children = this._getChildren().filter(element => !index_js.isDisabled(element));
		      let nextActiveElement;
		      if ([HOME_KEY, END_KEY].includes(event.key)) {
		        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
		      } else {
		        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
		        nextActiveElement = index_js.getNextActiveElement(children, event.target, isNext, true);
		      }
		      if (nextActiveElement) {
		        nextActiveElement.focus({
		          preventScroll: true
		        });
		        Tab.getOrCreateInstance(nextActiveElement).show();
		      }
		    }
		    _getChildren() {
		      // collection of inner elements
		      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
		    }
		    _getActiveElem() {
		      return this._getChildren().find(child => this._elemIsActive(child)) || null;
		    }
		    _setInitialAttributes(parent, children) {
		      this._setAttributeIfNotExists(parent, 'role', 'tablist');
		      for (const child of children) {
		        this._setInitialAttributesOnChild(child);
		      }
		    }
		    _setInitialAttributesOnChild(child) {
		      child = this._getInnerElement(child);
		      const isActive = this._elemIsActive(child);
		      const outerElem = this._getOuterElement(child);
		      child.setAttribute('aria-selected', isActive);
		      if (outerElem !== child) {
		        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
		      }
		      if (!isActive) {
		        child.setAttribute('tabindex', '-1');
		      }
		      this._setAttributeIfNotExists(child, 'role', 'tab');

		      // set attributes to the related panel too
		      this._setInitialAttributesOnTargetPanel(child);
		    }
		    _setInitialAttributesOnTargetPanel(child) {
		      const target = SelectorEngine.getElementFromSelector(child);
		      if (!target) {
		        return;
		      }
		      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
		      if (child.id) {
		        this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
		      }
		    }
		    _toggleDropDown(element, open) {
		      const outerElem = this._getOuterElement(element);
		      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
		        return;
		      }
		      const toggle = (selector, className) => {
		        const element = SelectorEngine.findOne(selector, outerElem);
		        if (element) {
		          element.classList.toggle(className, open);
		        }
		      };
		      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
		      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
		      outerElem.setAttribute('aria-expanded', open);
		    }
		    _setAttributeIfNotExists(element, attribute, value) {
		      if (!element.hasAttribute(attribute)) {
		        element.setAttribute(attribute, value);
		      }
		    }
		    _elemIsActive(elem) {
		      return elem.classList.contains(CLASS_NAME_ACTIVE);
		    }

		    // Try to get the inner element (usually the .nav-link)
		    _getInnerElement(elem) {
		      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
		    }

		    // Try to get the outer element (usually the .nav-item)
		    _getOuterElement(elem) {
		      return elem.closest(SELECTOR_OUTER) || elem;
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tab.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index_js.isDisabled(this)) {
		      return;
		    }
		    Tab.getOrCreateInstance(this).show();
		  });

		  /**
		   * Initialize on focus
		   */
		  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
		      Tab.getOrCreateInstance(element);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Tab);
		  return Tab;
		});
	} (tab$1));

	var tab = tabExports;

	var toastExports = {};
	var toast$1 = {
	  get exports(){ return toastExports; },
	  set exports(v){ toastExports = v; },
	};

	/*!
	  * Bootstrap toast.js v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireComponentFunctions(), requireUtil()) ;
		})(commonjsGlobal, function (BaseComponent, EventHandler, componentFunctions_js, index_js) {

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap toast.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */
		  const NAME = 'toast';
		  const DATA_KEY = 'bs.toast';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
		  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
		  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
		  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const DefaultType = {
		    animation: 'boolean',
		    autohide: 'boolean',
		    delay: 'number'
		  };
		  const Default = {
		    animation: true,
		    autohide: true,
		    delay: 5000
		  };

		  /**
		   * Class definition
		   */

		  class Toast extends BaseComponent {
		    constructor(element, config) {
		      super(element, config);
		      this._timeout = null;
		      this._hasMouseInteraction = false;
		      this._hasKeyboardInteraction = false;
		      this._setListeners();
		    }

		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    }

		    // Public
		    show() {
		      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._clearTimeout();
		      if (this._config.animation) {
		        this._element.classList.add(CLASS_NAME_FADE);
		      }
		      const complete = () => {
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler.trigger(this._element, EVENT_SHOWN);
		        this._maybeScheduleHide();
		      };
		      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
		      index_js.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    hide() {
		      if (!this.isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const complete = () => {
		        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
		        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
		        EventHandler.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    dispose() {
		      this._clearTimeout();
		      if (this.isShown()) {
		        this._element.classList.remove(CLASS_NAME_SHOW);
		      }
		      super.dispose();
		    }
		    isShown() {
		      return this._element.classList.contains(CLASS_NAME_SHOW);
		    }

		    // Private

		    _maybeScheduleHide() {
		      if (!this._config.autohide) {
		        return;
		      }
		      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
		        return;
		      }
		      this._timeout = setTimeout(() => {
		        this.hide();
		      }, this._config.delay);
		    }
		    _onInteraction(event, isInteracting) {
		      switch (event.type) {
		        case 'mouseover':
		        case 'mouseout':
		          {
		            this._hasMouseInteraction = isInteracting;
		            break;
		          }
		        case 'focusin':
		        case 'focusout':
		          {
		            this._hasKeyboardInteraction = isInteracting;
		            break;
		          }
		      }
		      if (isInteracting) {
		        this._clearTimeout();
		        return;
		      }
		      const nextElement = event.relatedTarget;
		      if (this._element === nextElement || this._element.contains(nextElement)) {
		        return;
		      }
		      this._maybeScheduleHide();
		    }
		    _setListeners() {
		      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
		      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
		      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
		      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
		    }
		    _clearTimeout() {
		      clearTimeout(this._timeout);
		      this._timeout = null;
		    }

		    // Static
		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Toast.getOrCreateInstance(this, config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config](this);
		        }
		      });
		    }
		  }

		  /**
		   * Data API implementation
		   */

		  componentFunctions_js.enableDismissTrigger(Toast);

		  /**
		   * jQuery
		   */

		  index_js.defineJQueryPlugin(Toast);
		  return Toast;
		});
	} (toast$1));

	var toast = toastExports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	        element;
	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }
	      element = document.getElementById(id);
	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }
	        element.focus();
	      }
	    }, false);
	  }
	})();

	class TypeSearch {
	  constructor(evTarget) {
	    this.namespace = 'type-search';
	    this.resultActive = false;
	    this.searchForm = [...document.querySelectorAll('.' + this.namespace)];
	    if (this.searchForm.length === 0) {
	      return;
	    }
	    this.attachEvents();
	    this.inputVal;
	    this.gmapURL = `${themeData.gmURL}place/autocomplete/json?key=${themeData.gmKey}&components=country:uk&input=`;
	    this.locationRes;
	    this.evTarget = evTarget;
	    // this.gmPlaces();//https://carehome.test/wp-json/
	  }
	  debounce(cbFnc, timeout = 300) {
	    let timer;
	    return (...args) => {
	      clearTimeout(timer);
	      timer = setTimeout(() => {
	        cbFnc(...args);
	      }, timeout);
	    };
	  }
	  async output(field, val) {
	    if (val.length >= 2) {
	      field.classList.add(this.namespace + '__results--active');
	      field.innerHTML = await this.fetchSuggestions(val); //
	    } else {
	      field.innerHTML = '';
	      field.classList.remove(this.namespace + '__results--active');
	    }
	    this.inputVal = val;
	  }
	  attachEvents() {
	    this.searchForm.forEach(item => {
	      let inputField = item.querySelector('.' + this.namespace + '__input');
	      let resultsField = item.querySelector('.' + this.namespace + '__results');
	      let btn = item.querySelector('.' + this.namespace + '__btn');
	      let handler = this.debounce(() => this.output(resultsField, inputField.value));
	      if (item.tagName === "FORM") {
	        item.addEventListener('submit', e => {
	          // e.preventDefault();
	          // this.setFormParams(item, inputField.value);
	        });
	      }
	      if (inputField) {
	        inputField.addEventListener('keyup', e => {
	          handler();
	        });
	        if (resultsField) {
	          resultsField.addEventListener('click', () => {
	            this.locationRes = resultsField.innerHTML;
	            this.createEvent();
	            inputField.value = resultsField.innerHTML;
	            resultsField.innerHTML = '';
	            resultsField.classList.remove(this.namespace + '__results--active');
	            if (btn) {
	              btn.disabled = false;
	            }
	          });
	        }
	      }
	    });
	  }
	  async fetchSuggestions(val) {
	    let json;
	    try {
	      let response = await fetch(themeData.restURL + 'quantum-care/v1/location-suggestion/' + val);
	      if (!response.ok) {
	        throw new Error(`Response status: ${response.status}`);
	      }
	      json = await response.json();
	      this.locationRes = json;
	    } catch (error) {
	      console.error(error.message);
	    }
	    return json;
	  }
	  createEvent() {
	    if (this.evTarget) {
	      this.formEvent = new CustomEvent('searchSubmitted', {
	        detail: {
	          location: this.locationRes
	        }
	      });
	      this.evTarget.dispatchEvent(this.formEvent);
	    }
	  }
	  getLocationVar() {
	    return this.locationRes;
	  }
	  setFormParams(form, val) {
	    const paramKey = 'location';
	    const paramVal = val;
	    let formURL = new URL(form.action);
	    formURL.searchParams.set(paramKey, paramVal);
	    form.action = formURL.toString();
	    window.location.href = form.action;
	  }
	  // async gmPlaces() {
	  //   await google.maps.importLibrary("places");

	  //   // Create the input HTML element, and append it.
	  //   //@ts-ignore
	  //   const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();

	  //   //@ts-ignore
	  //   document.body.appendChild(placeAutocomplete);
	  // }
	}

	class CareHomeResults {
	  constructor() {
	    this.stage = document.getElementById('care-homes-list');
	    if (!this.stage) {
	      return;
	    }
	    this.attachEvents();
	  }
	  attachEvents() {
	    this.stage.addEventListener('searchSubmitted', e => {
	      //   alert(e.detail.location);
	    });
	  }
	}

	const getPosts = async postIDs => {
	  let response = await fetch(themeData.restURL + 'quantum-care/v1/location-posts', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
	      post_ids: postIDs
	    })
	  });
	  if (!response.ok) {
	    throw new Error(`Response status: ${response.status}`);
	  }
	  let json = await response.json();
	  console.log(json);
	  return json;
	};

	class MapCareHomes {
	  constructor() {
	    this.mapStage = document.getElementById('care-homes-maps');
	    this.map;
	    if (!this.mapStage) {
	      return;
	    }
	    this.locations;
	    this.lngLats = [];
	    // this.coordsEles = [...document.querySelectorAll('[data-map-coords]')];
	    this.chEles = [...document.querySelectorAll('[data-post-id]')];
	    this.postIds = this.getPostIds();
	    this.imgArr = [];
	    console.log('postIds=', this.postIds);
	    console.log('longLats=', this.lngLats);
	    getPosts(this.postIds).then(posts => {
	      console.log('Posts = ', posts);
	      if (posts.length > 0) {
	        this.initMap(posts);
	      }
	    });
	    const queryString = window.location.search;
	    console.log('queryString', queryString);
	    const urlParams = new URLSearchParams(queryString);
	    console.log('urlParams', urlParams.get('location'));
	  }
	  extractLngLat(str) {
	    let lngLat = str.split('/');
	    return lngLat;
	  }
	  getPostIds() {
	    let ids = [];
	    this.chEles.forEach(item => {
	      ids.push(parseInt(item.getAttribute('data-post-id')));
	      let lngLats = this.extractLngLat(item.getAttribute('data-map-coords'));
	      this.lngLats.push({
	        lng: parseFloat(lngLats[0]),
	        lat: parseFloat(lngLats[1])
	      });
	    });
	    return ids;
	  }
	  async initMap(posts) {
	    const {
	      Map
	    } = await google.maps.importLibrary("maps");
	    const {
	      AdvancedMarkerElement
	    } = await google.maps.importLibrary("marker");
	    const bounds = new google.maps.LatLngBounds();
	    this.map = new Map(this.mapStage, {
	      zoom: 14,
	      center: {
	        lat: this.lngLats[0].lat,
	        lng: this.lngLats[0].lng
	      },
	      mapId: "CARE_HOME_MAP_ID"
	    });
	    posts.forEach((item, index) => {
	      let pin = new google.maps.marker.PinElement({
	        background: "#002147",
	        borderColor: "#B99475",
	        glyphColor: "#B99475"
	      });
	      let marker = new AdvancedMarkerElement({
	        map: this.map,
	        position: {
	          lat: this.lngLats[index].lat,
	          lng: this.lngLats[index].lng
	        },
	        title: item.title,
	        content: pin.element
	      });
	      let img = item.src ? `<figure class="ch__map-thumb"><img src="${item.src}" alt="${item.title}"></figure>` : null;
	      let infowindow = new google.maps.InfoWindow({
	        content: `<h6>${item.title}</h6>
        ${img}
        <a href="${item.link}">View<a/>`,
	        ariaLabel: item.title
	      });
	      // infowindow.open({
	      //   anchor: marker,
	      //   map: this.map,
	      // });
	      marker.addListener("gmp-click", () => {
	        infowindow.open({
	          anchor: marker,
	          map: this.map
	        });
	      });
	      bounds.extend(this.lngLats[index]);
	    });
	    if (this.lngLats.length === 1) {
	      this.map.setCenter(this.lngLats[0]);
	      this.map.setZoom(14);
	    } else {
	      this.map.fitBounds(bounds);
	    }
	    // const marker = new AdvancedMarkerElement({
	    //   map: this.map,
	    //   position: position,
	    //   title: "Uluru",
	    // });
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}

	/*!
	 * Splide.js
	 * Version  : 4.1.4
	 * License  : MIT
	 * Copyright: 2022 Naotoshi Fujita
	 */
	var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
	var CREATED = 1;
	var MOUNTED = 2;
	var IDLE = 3;
	var MOVING = 4;
	var SCROLLING = 5;
	var DRAGGING = 6;
	var DESTROYED = 7;
	var STATES = {
	  CREATED: CREATED,
	  MOUNTED: MOUNTED,
	  IDLE: IDLE,
	  MOVING: MOVING,
	  SCROLLING: SCROLLING,
	  DRAGGING: DRAGGING,
	  DESTROYED: DESTROYED
	};
	function empty(array) {
	  array.length = 0;
	}
	function slice(arrayLike, start, end) {
	  return Array.prototype.slice.call(arrayLike, start, end);
	}
	function apply(func) {
	  return func.bind.apply(func, [null].concat(slice(arguments, 1)));
	}
	var nextTick = setTimeout;
	var noop = function noop() {};
	function raf(func) {
	  return requestAnimationFrame(func);
	}
	function typeOf(type, subject) {
	  return typeof subject === type;
	}
	function isObject(subject) {
	  return !isNull(subject) && typeOf("object", subject);
	}
	var isArray = Array.isArray;
	var isFunction = apply(typeOf, "function");
	var isString = apply(typeOf, "string");
	var isUndefined = apply(typeOf, "undefined");
	function isNull(subject) {
	  return subject === null;
	}
	function isHTMLElement(subject) {
	  try {
	    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
	  } catch (e) {
	    return false;
	  }
	}
	function toArray(value) {
	  return isArray(value) ? value : [value];
	}
	function forEach(values, iteratee) {
	  toArray(values).forEach(iteratee);
	}
	function includes(array, value) {
	  return array.indexOf(value) > -1;
	}
	function push(array, items) {
	  array.push.apply(array, toArray(items));
	  return array;
	}
	function toggleClass(elm, classes, add) {
	  if (elm) {
	    forEach(classes, function (name) {
	      if (name) {
	        elm.classList[add ? "add" : "remove"](name);
	      }
	    });
	  }
	}
	function addClass(elm, classes) {
	  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
	}
	function append(parent, children) {
	  forEach(children, parent.appendChild.bind(parent));
	}
	function before(nodes, ref) {
	  forEach(nodes, function (node) {
	    var parent = (ref || node).parentNode;
	    if (parent) {
	      parent.insertBefore(node, ref);
	    }
	  });
	}
	function matches(elm, selector) {
	  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
	}
	function children(parent, selector) {
	  var children2 = parent ? slice(parent.children) : [];
	  return selector ? children2.filter(function (child) {
	    return matches(child, selector);
	  }) : children2;
	}
	function child(parent, selector) {
	  return selector ? children(parent, selector)[0] : parent.firstElementChild;
	}
	var ownKeys = Object.keys;
	function forOwn(object, iteratee, right) {
	  if (object) {
	    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function (key) {
	      key !== "__proto__" && iteratee(object[key], key);
	    });
	  }
	  return object;
	}
	function assign(object) {
	  slice(arguments, 1).forEach(function (source) {
	    forOwn(source, function (value, key) {
	      object[key] = source[key];
	    });
	  });
	  return object;
	}
	function merge(object) {
	  slice(arguments, 1).forEach(function (source) {
	    forOwn(source, function (value, key) {
	      if (isArray(value)) {
	        object[key] = value.slice();
	      } else if (isObject(value)) {
	        object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
	      } else {
	        object[key] = value;
	      }
	    });
	  });
	  return object;
	}
	function omit(object, keys) {
	  forEach(keys || ownKeys(object), function (key) {
	    delete object[key];
	  });
	}
	function removeAttribute(elms, attrs) {
	  forEach(elms, function (elm) {
	    forEach(attrs, function (attr) {
	      elm && elm.removeAttribute(attr);
	    });
	  });
	}
	function setAttribute(elms, attrs, value) {
	  if (isObject(attrs)) {
	    forOwn(attrs, function (value2, name) {
	      setAttribute(elms, name, value2);
	    });
	  } else {
	    forEach(elms, function (elm) {
	      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
	    });
	  }
	}
	function create(tag, attrs, parent) {
	  var elm = document.createElement(tag);
	  if (attrs) {
	    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
	  }
	  parent && append(parent, elm);
	  return elm;
	}
	function style(elm, prop, value) {
	  if (isUndefined(value)) {
	    return getComputedStyle(elm)[prop];
	  }
	  if (!isNull(value)) {
	    elm.style[prop] = "" + value;
	  }
	}
	function display(elm, display2) {
	  style(elm, "display", display2);
	}
	function focus(elm) {
	  elm["setActive"] && elm["setActive"]() || elm.focus({
	    preventScroll: true
	  });
	}
	function getAttribute(elm, attr) {
	  return elm.getAttribute(attr);
	}
	function hasClass(elm, className) {
	  return elm && elm.classList.contains(className);
	}
	function rect(target) {
	  return target.getBoundingClientRect();
	}
	function remove(nodes) {
	  forEach(nodes, function (node) {
	    if (node && node.parentNode) {
	      node.parentNode.removeChild(node);
	    }
	  });
	}
	function parseHtml(html) {
	  return child(new DOMParser().parseFromString(html, "text/html").body);
	}
	function prevent(e, stopPropagation) {
	  e.preventDefault();
	  if (stopPropagation) {
	    e.stopPropagation();
	    e.stopImmediatePropagation();
	  }
	}
	function query(parent, selector) {
	  return parent && parent.querySelector(selector);
	}
	function queryAll(parent, selector) {
	  return selector ? slice(parent.querySelectorAll(selector)) : [];
	}
	function removeClass(elm, classes) {
	  toggleClass(elm, classes, false);
	}
	function timeOf(e) {
	  return e.timeStamp;
	}
	function unit(value) {
	  return isString(value) ? value : value ? value + "px" : "";
	}
	var PROJECT_CODE = "splide";
	var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
	function assert(condition, message) {
	  if (!condition) {
	    throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
	  }
	}
	var min = Math.min,
	  max = Math.max,
	  floor = Math.floor,
	  ceil = Math.ceil,
	  abs = Math.abs;
	function approximatelyEqual(x, y, epsilon) {
	  return abs(x - y) < epsilon;
	}
	function between(number, x, y, exclusive) {
	  var minimum = min(x, y);
	  var maximum = max(x, y);
	  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
	}
	function clamp(number, x, y) {
	  var minimum = min(x, y);
	  var maximum = max(x, y);
	  return min(max(minimum, number), maximum);
	}
	function sign(x) {
	  return +(x > 0) - +(x < 0);
	}
	function format(string, replacements) {
	  forEach(replacements, function (replacement) {
	    string = string.replace("%s", "" + replacement);
	  });
	  return string;
	}
	function pad(number) {
	  return number < 10 ? "0" + number : "" + number;
	}
	var ids = {};
	function uniqueId(prefix) {
	  return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
	}
	function EventBinder() {
	  var listeners = [];
	  function bind(targets, events, callback, options) {
	    forEachEvent(targets, events, function (target, event, namespace) {
	      var isEventTarget = "addEventListener" in target;
	      var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
	      isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
	      listeners.push([target, event, namespace, callback, remover]);
	    });
	  }
	  function unbind(targets, events, callback) {
	    forEachEvent(targets, events, function (target, event, namespace) {
	      listeners = listeners.filter(function (listener) {
	        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
	          listener[4]();
	          return false;
	        }
	        return true;
	      });
	    });
	  }
	  function dispatch(target, type, detail) {
	    var e;
	    var bubbles = true;
	    if (typeof CustomEvent === "function") {
	      e = new CustomEvent(type, {
	        bubbles: bubbles,
	        detail: detail
	      });
	    } else {
	      e = document.createEvent("CustomEvent");
	      e.initCustomEvent(type, bubbles, false, detail);
	    }
	    target.dispatchEvent(e);
	    return e;
	  }
	  function forEachEvent(targets, events, iteratee) {
	    forEach(targets, function (target) {
	      target && forEach(events, function (events2) {
	        events2.split(" ").forEach(function (eventNS) {
	          var fragment = eventNS.split(".");
	          iteratee(target, fragment[0], fragment[1]);
	        });
	      });
	    });
	  }
	  function destroy() {
	    listeners.forEach(function (data) {
	      data[4]();
	    });
	    empty(listeners);
	  }
	  return {
	    bind: bind,
	    unbind: unbind,
	    dispatch: dispatch,
	    destroy: destroy
	  };
	}
	var EVENT_MOUNTED = "mounted";
	var EVENT_READY = "ready";
	var EVENT_MOVE = "move";
	var EVENT_MOVED = "moved";
	var EVENT_CLICK = "click";
	var EVENT_ACTIVE = "active";
	var EVENT_INACTIVE = "inactive";
	var EVENT_VISIBLE = "visible";
	var EVENT_HIDDEN = "hidden";
	var EVENT_REFRESH = "refresh";
	var EVENT_UPDATED = "updated";
	var EVENT_RESIZE = "resize";
	var EVENT_RESIZED = "resized";
	var EVENT_DRAG = "drag";
	var EVENT_DRAGGING = "dragging";
	var EVENT_DRAGGED = "dragged";
	var EVENT_SCROLL = "scroll";
	var EVENT_SCROLLED = "scrolled";
	var EVENT_OVERFLOW = "overflow";
	var EVENT_DESTROY = "destroy";
	var EVENT_ARROWS_MOUNTED = "arrows:mounted";
	var EVENT_ARROWS_UPDATED = "arrows:updated";
	var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
	var EVENT_PAGINATION_UPDATED = "pagination:updated";
	var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
	var EVENT_AUTOPLAY_PLAY = "autoplay:play";
	var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
	var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
	var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
	var EVENT_SLIDE_KEYDOWN = "sk";
	var EVENT_SHIFTED = "sh";
	var EVENT_END_INDEX_CHANGED = "ei";
	function EventInterface(Splide2) {
	  var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
	  var binder = EventBinder();
	  function on(events, callback) {
	    binder.bind(bus, toArray(events).join(" "), function (e) {
	      callback.apply(callback, isArray(e.detail) ? e.detail : []);
	    });
	  }
	  function emit(event) {
	    binder.dispatch(bus, event, slice(arguments, 1));
	  }
	  if (Splide2) {
	    Splide2.event.on(EVENT_DESTROY, binder.destroy);
	  }
	  return assign(binder, {
	    bus: bus,
	    on: on,
	    off: apply(binder.unbind, bus),
	    emit: emit
	  });
	}
	function RequestInterval(interval, onInterval, onUpdate, limit) {
	  var now = Date.now;
	  var startTime;
	  var rate = 0;
	  var id;
	  var paused = true;
	  var count = 0;
	  function update() {
	    if (!paused) {
	      rate = interval ? min((now() - startTime) / interval, 1) : 1;
	      onUpdate && onUpdate(rate);
	      if (rate >= 1) {
	        onInterval();
	        startTime = now();
	        if (limit && ++count >= limit) {
	          return pause();
	        }
	      }
	      id = raf(update);
	    }
	  }
	  function start(resume) {
	    resume || cancel();
	    startTime = now() - (resume ? rate * interval : 0);
	    paused = false;
	    id = raf(update);
	  }
	  function pause() {
	    paused = true;
	  }
	  function rewind() {
	    startTime = now();
	    rate = 0;
	    if (onUpdate) {
	      onUpdate(rate);
	    }
	  }
	  function cancel() {
	    id && cancelAnimationFrame(id);
	    rate = 0;
	    id = 0;
	    paused = true;
	  }
	  function set(time) {
	    interval = time;
	  }
	  function isPaused() {
	    return paused;
	  }
	  return {
	    start: start,
	    rewind: rewind,
	    pause: pause,
	    cancel: cancel,
	    set: set,
	    isPaused: isPaused
	  };
	}
	function State(initialState) {
	  var state = initialState;
	  function set(value) {
	    state = value;
	  }
	  function is(states) {
	    return includes(toArray(states), state);
	  }
	  return {
	    set: set,
	    is: is
	  };
	}
	function Throttle(func, duration) {
	  var interval = RequestInterval(duration || 0, func, null, 1);
	  return function () {
	    interval.isPaused() && interval.start();
	  };
	}
	function Media(Splide2, Components2, options) {
	  var state = Splide2.state;
	  var breakpoints = options.breakpoints || {};
	  var reducedMotion = options.reducedMotion || {};
	  var binder = EventBinder();
	  var queries = [];
	  function setup() {
	    var isMin = options.mediaQuery === "min";
	    ownKeys(breakpoints).sort(function (n, m) {
	      return isMin ? +n - +m : +m - +n;
	    }).forEach(function (key) {
	      register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
	    });
	    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
	    update();
	  }
	  function destroy(completely) {
	    if (completely) {
	      binder.destroy();
	    }
	  }
	  function register(options2, query) {
	    var queryList = matchMedia(query);
	    binder.bind(queryList, "change", update);
	    queries.push([options2, queryList]);
	  }
	  function update() {
	    var destroyed = state.is(DESTROYED);
	    var direction = options.direction;
	    var merged = queries.reduce(function (merged2, entry) {
	      return merge(merged2, entry[1].matches ? entry[0] : {});
	    }, {});
	    omit(options);
	    set(merged);
	    if (options.destroy) {
	      Splide2.destroy(options.destroy === "completely");
	    } else if (destroyed) {
	      destroy(true);
	      Splide2.mount();
	    } else {
	      direction !== options.direction && Splide2.refresh();
	    }
	  }
	  function reduce(enable) {
	    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
	      enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
	    }
	  }
	  function set(opts, base, notify) {
	    merge(options, opts);
	    base && merge(Object.getPrototypeOf(options), opts);
	    if (notify || !state.is(CREATED)) {
	      Splide2.emit(EVENT_UPDATED, options);
	    }
	  }
	  return {
	    setup: setup,
	    destroy: destroy,
	    reduce: reduce,
	    set: set
	  };
	}
	var ARROW = "Arrow";
	var ARROW_LEFT = ARROW + "Left";
	var ARROW_RIGHT = ARROW + "Right";
	var ARROW_UP = ARROW + "Up";
	var ARROW_DOWN = ARROW + "Down";
	var RTL = "rtl";
	var TTB = "ttb";
	var ORIENTATION_MAP = {
	  width: ["height"],
	  left: ["top", "right"],
	  right: ["bottom", "left"],
	  x: ["y"],
	  X: ["Y"],
	  Y: ["X"],
	  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
	  ArrowRight: [ARROW_DOWN, ARROW_LEFT]
	};
	function Direction(Splide2, Components2, options) {
	  function resolve(prop, axisOnly, direction) {
	    direction = direction || options.direction;
	    var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
	    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function (match, offset) {
	      var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
	      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
	    });
	  }
	  function orient(value) {
	    return value * (options.direction === RTL ? 1 : -1);
	  }
	  return {
	    resolve: resolve,
	    orient: orient
	  };
	}
	var ROLE = "role";
	var TAB_INDEX = "tabindex";
	var DISABLED = "disabled";
	var ARIA_PREFIX = "aria-";
	var ARIA_CONTROLS = ARIA_PREFIX + "controls";
	var ARIA_CURRENT = ARIA_PREFIX + "current";
	var ARIA_SELECTED = ARIA_PREFIX + "selected";
	var ARIA_LABEL = ARIA_PREFIX + "label";
	var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
	var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
	var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
	var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
	var ARIA_LIVE = ARIA_PREFIX + "live";
	var ARIA_BUSY = ARIA_PREFIX + "busy";
	var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
	var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
	var CLASS_PREFIX = PROJECT_CODE + "__";
	var STATUS_CLASS_PREFIX = "is-";
	var CLASS_ROOT = PROJECT_CODE;
	var CLASS_TRACK = CLASS_PREFIX + "track";
	var CLASS_LIST = CLASS_PREFIX + "list";
	var CLASS_SLIDE = CLASS_PREFIX + "slide";
	var CLASS_CLONE = CLASS_SLIDE + "--clone";
	var CLASS_CONTAINER = CLASS_SLIDE + "__container";
	var CLASS_ARROWS = CLASS_PREFIX + "arrows";
	var CLASS_ARROW = CLASS_PREFIX + "arrow";
	var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
	var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
	var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
	var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
	var CLASS_PROGRESS = CLASS_PREFIX + "progress";
	var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
	var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
	var CLASS_SPINNER = CLASS_PREFIX + "spinner";
	var CLASS_SR = CLASS_PREFIX + "sr";
	var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
	var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
	var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
	var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
	var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
	var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
	var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
	var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
	var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
	var CLASSES = {
	  slide: CLASS_SLIDE,
	  clone: CLASS_CLONE,
	  arrows: CLASS_ARROWS,
	  arrow: CLASS_ARROW,
	  prev: CLASS_ARROW_PREV,
	  next: CLASS_ARROW_NEXT,
	  pagination: CLASS_PAGINATION,
	  page: CLASS_PAGINATION_PAGE,
	  spinner: CLASS_SPINNER
	};
	function closest(from, selector) {
	  if (isFunction(from.closest)) {
	    return from.closest(selector);
	  }
	  var elm = from;
	  while (elm && elm.nodeType === 1) {
	    if (matches(elm, selector)) {
	      break;
	    }
	    elm = elm.parentElement;
	  }
	  return elm;
	}
	var FRICTION = 5;
	var LOG_INTERVAL = 200;
	var POINTER_DOWN_EVENTS = "touchstart mousedown";
	var POINTER_MOVE_EVENTS = "touchmove mousemove";
	var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
	function Elements(Splide2, Components2, options) {
	  var _EventInterface = EventInterface(Splide2),
	    on = _EventInterface.on,
	    bind = _EventInterface.bind;
	  var root = Splide2.root;
	  var i18n = options.i18n;
	  var elements = {};
	  var slides = [];
	  var rootClasses = [];
	  var trackClasses = [];
	  var track;
	  var list;
	  var isUsingKey;
	  function setup() {
	    collect();
	    init();
	    update();
	  }
	  function mount() {
	    on(EVENT_REFRESH, destroy);
	    on(EVENT_REFRESH, setup);
	    on(EVENT_UPDATED, update);
	    bind(document, POINTER_DOWN_EVENTS + " keydown", function (e) {
	      isUsingKey = e.type === "keydown";
	    }, {
	      capture: true
	    });
	    bind(root, "focusin", function () {
	      toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
	    });
	  }
	  function destroy(completely) {
	    var attrs = ALL_ATTRIBUTES.concat("style");
	    empty(slides);
	    removeClass(root, rootClasses);
	    removeClass(track, trackClasses);
	    removeAttribute([track, list], attrs);
	    removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
	  }
	  function update() {
	    removeClass(root, rootClasses);
	    removeClass(track, trackClasses);
	    rootClasses = getClasses(CLASS_ROOT);
	    trackClasses = getClasses(CLASS_TRACK);
	    addClass(root, rootClasses);
	    addClass(track, trackClasses);
	    setAttribute(root, ARIA_LABEL, options.label);
	    setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
	  }
	  function collect() {
	    track = find("." + CLASS_TRACK);
	    list = child(track, "." + CLASS_LIST);
	    assert(track && list, "A track/list element is missing.");
	    push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
	    forOwn({
	      arrows: CLASS_ARROWS,
	      pagination: CLASS_PAGINATION,
	      prev: CLASS_ARROW_PREV,
	      next: CLASS_ARROW_NEXT,
	      bar: CLASS_PROGRESS_BAR,
	      toggle: CLASS_TOGGLE
	    }, function (className, key) {
	      elements[key] = find("." + className);
	    });
	    assign(elements, {
	      root: root,
	      track: track,
	      list: list,
	      slides: slides
	    });
	  }
	  function init() {
	    var id = root.id || uniqueId(PROJECT_CODE);
	    var role = options.role;
	    root.id = id;
	    track.id = track.id || id + "-track";
	    list.id = list.id || id + "-list";
	    if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
	      setAttribute(root, ROLE, role);
	    }
	    setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
	    setAttribute(list, ROLE, "presentation");
	  }
	  function find(selector) {
	    var elm = query(root, selector);
	    return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
	  }
	  function getClasses(base) {
	    return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
	  }
	  return assign(elements, {
	    setup: setup,
	    mount: mount,
	    destroy: destroy
	  });
	}
	var SLIDE = "slide";
	var LOOP = "loop";
	var FADE = "fade";
	function Slide$1(Splide2, index, slideIndex, slide) {
	  var event = EventInterface(Splide2);
	  var on = event.on,
	    emit = event.emit,
	    bind = event.bind;
	  var Components = Splide2.Components,
	    root = Splide2.root,
	    options = Splide2.options;
	  var isNavigation = options.isNavigation,
	    updateOnMove = options.updateOnMove,
	    i18n = options.i18n,
	    pagination = options.pagination,
	    slideFocus = options.slideFocus;
	  var resolve = Components.Direction.resolve;
	  var styles = getAttribute(slide, "style");
	  var label = getAttribute(slide, ARIA_LABEL);
	  var isClone = slideIndex > -1;
	  var container = child(slide, "." + CLASS_CONTAINER);
	  var destroyed;
	  function mount() {
	    if (!isClone) {
	      slide.id = root.id + "-slide" + pad(index + 1);
	      setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
	      setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
	      setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
	    }
	    listen();
	  }
	  function listen() {
	    bind(slide, "click", apply(emit, EVENT_CLICK, self));
	    bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
	    on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
	    on(EVENT_NAVIGATION_MOUNTED, initNavigation);
	    if (updateOnMove) {
	      on(EVENT_MOVE, onMove);
	    }
	  }
	  function destroy() {
	    destroyed = true;
	    event.destroy();
	    removeClass(slide, STATUS_CLASSES);
	    removeAttribute(slide, ALL_ATTRIBUTES);
	    setAttribute(slide, "style", styles);
	    setAttribute(slide, ARIA_LABEL, label || "");
	  }
	  function initNavigation() {
	    var controls = Splide2.splides.map(function (target) {
	      var Slide2 = target.splide.Components.Slides.getAt(index);
	      return Slide2 ? Slide2.slide.id : "";
	    }).join(" ");
	    setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
	    setAttribute(slide, ARIA_CONTROLS, controls);
	    setAttribute(slide, ROLE, slideFocus ? "button" : "");
	    slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
	  }
	  function onMove() {
	    if (!destroyed) {
	      update();
	    }
	  }
	  function update() {
	    if (!destroyed) {
	      var curr = Splide2.index;
	      updateActivity();
	      updateVisibility();
	      toggleClass(slide, CLASS_PREV, index === curr - 1);
	      toggleClass(slide, CLASS_NEXT, index === curr + 1);
	    }
	  }
	  function updateActivity() {
	    var active = isActive();
	    if (active !== hasClass(slide, CLASS_ACTIVE)) {
	      toggleClass(slide, CLASS_ACTIVE, active);
	      setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
	      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
	    }
	  }
	  function updateVisibility() {
	    var visible = isVisible();
	    var hidden = !visible && (!isActive() || isClone);
	    if (!Splide2.state.is([MOVING, SCROLLING])) {
	      setAttribute(slide, ARIA_HIDDEN, hidden || "");
	    }
	    setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
	    if (slideFocus) {
	      setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
	    }
	    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
	      toggleClass(slide, CLASS_VISIBLE, visible);
	      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
	    }
	    if (!visible && document.activeElement === slide) {
	      var Slide2 = Components.Slides.getAt(Splide2.index);
	      Slide2 && focus(Slide2.slide);
	    }
	  }
	  function style$1(prop, value, useContainer) {
	    style(useContainer && container || slide, prop, value);
	  }
	  function isActive() {
	    var curr = Splide2.index;
	    return curr === index || options.cloneStatus && curr === slideIndex;
	  }
	  function isVisible() {
	    if (Splide2.is(FADE)) {
	      return isActive();
	    }
	    var trackRect = rect(Components.Elements.track);
	    var slideRect = rect(slide);
	    var left = resolve("left", true);
	    var right = resolve("right", true);
	    return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
	  }
	  function isWithin(from, distance) {
	    var diff = abs(from - index);
	    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
	      diff = min(diff, Splide2.length - diff);
	    }
	    return diff <= distance;
	  }
	  var self = {
	    index: index,
	    slideIndex: slideIndex,
	    slide: slide,
	    container: container,
	    isClone: isClone,
	    mount: mount,
	    destroy: destroy,
	    update: update,
	    style: style$1,
	    isWithin: isWithin
	  };
	  return self;
	}
	function Slides(Splide2, Components2, options) {
	  var _EventInterface2 = EventInterface(Splide2),
	    on = _EventInterface2.on,
	    emit = _EventInterface2.emit,
	    bind = _EventInterface2.bind;
	  var _Components2$Elements = Components2.Elements,
	    slides = _Components2$Elements.slides,
	    list = _Components2$Elements.list;
	  var Slides2 = [];
	  function mount() {
	    init();
	    on(EVENT_REFRESH, destroy);
	    on(EVENT_REFRESH, init);
	  }
	  function init() {
	    slides.forEach(function (slide, index) {
	      register(slide, index, -1);
	    });
	  }
	  function destroy() {
	    forEach$1(function (Slide2) {
	      Slide2.destroy();
	    });
	    empty(Slides2);
	  }
	  function update() {
	    forEach$1(function (Slide2) {
	      Slide2.update();
	    });
	  }
	  function register(slide, index, slideIndex) {
	    var object = Slide$1(Splide2, index, slideIndex, slide);
	    object.mount();
	    Slides2.push(object);
	    Slides2.sort(function (Slide1, Slide2) {
	      return Slide1.index - Slide2.index;
	    });
	  }
	  function get(excludeClones) {
	    return excludeClones ? filter(function (Slide2) {
	      return !Slide2.isClone;
	    }) : Slides2;
	  }
	  function getIn(page) {
	    var Controller = Components2.Controller;
	    var index = Controller.toIndex(page);
	    var max = Controller.hasFocus() ? 1 : options.perPage;
	    return filter(function (Slide2) {
	      return between(Slide2.index, index, index + max - 1);
	    });
	  }
	  function getAt(index) {
	    return filter(index)[0];
	  }
	  function add(items, index) {
	    forEach(items, function (slide) {
	      if (isString(slide)) {
	        slide = parseHtml(slide);
	      }
	      if (isHTMLElement(slide)) {
	        var ref = slides[index];
	        ref ? before(slide, ref) : append(list, slide);
	        addClass(slide, options.classes.slide);
	        observeImages(slide, apply(emit, EVENT_RESIZE));
	      }
	    });
	    emit(EVENT_REFRESH);
	  }
	  function remove$1(matcher) {
	    remove(filter(matcher).map(function (Slide2) {
	      return Slide2.slide;
	    }));
	    emit(EVENT_REFRESH);
	  }
	  function forEach$1(iteratee, excludeClones) {
	    get(excludeClones).forEach(iteratee);
	  }
	  function filter(matcher) {
	    return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
	      return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
	    });
	  }
	  function style(prop, value, useContainer) {
	    forEach$1(function (Slide2) {
	      Slide2.style(prop, value, useContainer);
	    });
	  }
	  function observeImages(elm, callback) {
	    var images = queryAll(elm, "img");
	    var length = images.length;
	    if (length) {
	      images.forEach(function (img) {
	        bind(img, "load error", function () {
	          if (! --length) {
	            callback();
	          }
	        });
	      });
	    } else {
	      callback();
	    }
	  }
	  function getLength(excludeClones) {
	    return excludeClones ? slides.length : Slides2.length;
	  }
	  function isEnough() {
	    return Slides2.length > options.perPage;
	  }
	  return {
	    mount: mount,
	    destroy: destroy,
	    update: update,
	    register: register,
	    get: get,
	    getIn: getIn,
	    getAt: getAt,
	    add: add,
	    remove: remove$1,
	    forEach: forEach$1,
	    filter: filter,
	    style: style,
	    getLength: getLength,
	    isEnough: isEnough
	  };
	}
	function Layout(Splide2, Components2, options) {
	  var _EventInterface3 = EventInterface(Splide2),
	    on = _EventInterface3.on,
	    bind = _EventInterface3.bind,
	    emit = _EventInterface3.emit;
	  var Slides = Components2.Slides;
	  var resolve = Components2.Direction.resolve;
	  var _Components2$Elements2 = Components2.Elements,
	    root = _Components2$Elements2.root,
	    track = _Components2$Elements2.track,
	    list = _Components2$Elements2.list;
	  var getAt = Slides.getAt,
	    styleSlides = Slides.style;
	  var vertical;
	  var rootRect;
	  var overflow;
	  function mount() {
	    init();
	    bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
	    on([EVENT_UPDATED, EVENT_REFRESH], init);
	    on(EVENT_RESIZE, resize);
	  }
	  function init() {
	    vertical = options.direction === TTB;
	    style(root, "maxWidth", unit(options.width));
	    style(track, resolve("paddingLeft"), cssPadding(false));
	    style(track, resolve("paddingRight"), cssPadding(true));
	    resize(true);
	  }
	  function resize(force) {
	    var newRect = rect(root);
	    if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
	      style(track, "height", cssTrackHeight());
	      styleSlides(resolve("marginRight"), unit(options.gap));
	      styleSlides("width", cssSlideWidth());
	      styleSlides("height", cssSlideHeight(), true);
	      rootRect = newRect;
	      emit(EVENT_RESIZED);
	      if (overflow !== (overflow = isOverflow())) {
	        toggleClass(root, CLASS_OVERFLOW, overflow);
	        emit(EVENT_OVERFLOW, overflow);
	      }
	    }
	  }
	  function cssPadding(right) {
	    var padding = options.padding;
	    var prop = resolve(right ? "right" : "left");
	    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
	  }
	  function cssTrackHeight() {
	    var height = "";
	    if (vertical) {
	      height = cssHeight();
	      assert(height, "height or heightRatio is missing.");
	      height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
	    }
	    return height;
	  }
	  function cssHeight() {
	    return unit(options.height || rect(list).width * options.heightRatio);
	  }
	  function cssSlideWidth() {
	    return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
	  }
	  function cssSlideHeight() {
	    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
	  }
	  function cssSlideSize() {
	    var gap = unit(options.gap);
	    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
	  }
	  function listSize() {
	    return rect(list)[resolve("width")];
	  }
	  function slideSize(index, withoutGap) {
	    var Slide = getAt(index || 0);
	    return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
	  }
	  function totalSize(index, withoutGap) {
	    var Slide = getAt(index);
	    if (Slide) {
	      var right = rect(Slide.slide)[resolve("right")];
	      var left = rect(list)[resolve("left")];
	      return abs(right - left) + (withoutGap ? 0 : getGap());
	    }
	    return 0;
	  }
	  function sliderSize(withoutGap) {
	    return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
	  }
	  function getGap() {
	    var Slide = getAt(0);
	    return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
	  }
	  function getPadding(right) {
	    return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
	  }
	  function isOverflow() {
	    return Splide2.is(FADE) || sliderSize(true) > listSize();
	  }
	  return {
	    mount: mount,
	    resize: resize,
	    listSize: listSize,
	    slideSize: slideSize,
	    sliderSize: sliderSize,
	    totalSize: totalSize,
	    getPadding: getPadding,
	    isOverflow: isOverflow
	  };
	}
	var MULTIPLIER = 2;
	function Clones(Splide2, Components2, options) {
	  var event = EventInterface(Splide2);
	  var on = event.on;
	  var Elements = Components2.Elements,
	    Slides = Components2.Slides;
	  var resolve = Components2.Direction.resolve;
	  var clones = [];
	  var cloneCount;
	  function mount() {
	    on(EVENT_REFRESH, remount);
	    on([EVENT_UPDATED, EVENT_RESIZE], observe);
	    if (cloneCount = computeCloneCount()) {
	      generate(cloneCount);
	      Components2.Layout.resize(true);
	    }
	  }
	  function remount() {
	    destroy();
	    mount();
	  }
	  function destroy() {
	    remove(clones);
	    empty(clones);
	    event.destroy();
	  }
	  function observe() {
	    var count = computeCloneCount();
	    if (cloneCount !== count) {
	      if (cloneCount < count || !count) {
	        event.emit(EVENT_REFRESH);
	      }
	    }
	  }
	  function generate(count) {
	    var slides = Slides.get().slice();
	    var length = slides.length;
	    if (length) {
	      while (slides.length < count) {
	        push(slides, slides);
	      }
	      push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
	        var isHead = index < count;
	        var clone = cloneDeep(Slide.slide, index);
	        isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
	        push(clones, clone);
	        Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
	      });
	    }
	  }
	  function cloneDeep(elm, index) {
	    var clone = elm.cloneNode(true);
	    addClass(clone, options.classes.clone);
	    clone.id = Splide2.root.id + "-clone" + pad(index + 1);
	    return clone;
	  }
	  function computeCloneCount() {
	    var clones2 = options.clones;
	    if (!Splide2.is(LOOP)) {
	      clones2 = 0;
	    } else if (isUndefined(clones2)) {
	      var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
	      var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
	      clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
	    }
	    return clones2;
	  }
	  return {
	    mount: mount,
	    destroy: destroy
	  };
	}
	function Move(Splide2, Components2, options) {
	  var _EventInterface4 = EventInterface(Splide2),
	    on = _EventInterface4.on,
	    emit = _EventInterface4.emit;
	  var set = Splide2.state.set;
	  var _Components2$Layout = Components2.Layout,
	    slideSize = _Components2$Layout.slideSize,
	    getPadding = _Components2$Layout.getPadding,
	    totalSize = _Components2$Layout.totalSize,
	    listSize = _Components2$Layout.listSize,
	    sliderSize = _Components2$Layout.sliderSize;
	  var _Components2$Directio = Components2.Direction,
	    resolve = _Components2$Directio.resolve,
	    orient = _Components2$Directio.orient;
	  var _Components2$Elements3 = Components2.Elements,
	    list = _Components2$Elements3.list,
	    track = _Components2$Elements3.track;
	  var Transition;
	  function mount() {
	    Transition = Components2.Transition;
	    on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
	  }
	  function reposition() {
	    if (!Components2.Controller.isBusy()) {
	      Components2.Scroll.cancel();
	      jump(Splide2.index);
	      Components2.Slides.update();
	    }
	  }
	  function move(dest, index, prev, callback) {
	    if (dest !== index && canShift(dest > prev)) {
	      cancel();
	      translate(shift(getPosition(), dest > prev), true);
	    }
	    set(MOVING);
	    emit(EVENT_MOVE, index, prev, dest);
	    Transition.start(index, function () {
	      set(IDLE);
	      emit(EVENT_MOVED, index, prev, dest);
	      callback && callback();
	    });
	  }
	  function jump(index) {
	    translate(toPosition(index, true));
	  }
	  function translate(position, preventLoop) {
	    if (!Splide2.is(FADE)) {
	      var destination = preventLoop ? position : loop(position);
	      style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
	      position !== destination && emit(EVENT_SHIFTED);
	    }
	  }
	  function loop(position) {
	    if (Splide2.is(LOOP)) {
	      var index = toIndex(position);
	      var exceededMax = index > Components2.Controller.getEnd();
	      var exceededMin = index < 0;
	      if (exceededMin || exceededMax) {
	        position = shift(position, exceededMax);
	      }
	    }
	    return position;
	  }
	  function shift(position, backwards) {
	    var excess = position - getLimit(backwards);
	    var size = sliderSize();
	    position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
	    return position;
	  }
	  function cancel() {
	    translate(getPosition(), true);
	    Transition.cancel();
	  }
	  function toIndex(position) {
	    var Slides = Components2.Slides.get();
	    var index = 0;
	    var minDistance = Infinity;
	    for (var i = 0; i < Slides.length; i++) {
	      var slideIndex = Slides[i].index;
	      var distance = abs(toPosition(slideIndex, true) - position);
	      if (distance <= minDistance) {
	        minDistance = distance;
	        index = slideIndex;
	      } else {
	        break;
	      }
	    }
	    return index;
	  }
	  function toPosition(index, trimming) {
	    var position = orient(totalSize(index - 1) - offset(index));
	    return trimming ? trim(position) : position;
	  }
	  function getPosition() {
	    var left = resolve("left");
	    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
	  }
	  function trim(position) {
	    if (options.trimSpace && Splide2.is(SLIDE)) {
	      position = clamp(position, 0, orient(sliderSize(true) - listSize()));
	    }
	    return position;
	  }
	  function offset(index) {
	    var focus = options.focus;
	    return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
	  }
	  function getLimit(max) {
	    return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
	  }
	  function canShift(backwards) {
	    var shifted = orient(shift(getPosition(), backwards));
	    return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
	  }
	  function exceededLimit(max, position) {
	    position = isUndefined(position) ? getPosition() : position;
	    var exceededMin = max !== true && orient(position) < orient(getLimit(false));
	    var exceededMax = max !== false && orient(position) > orient(getLimit(true));
	    return exceededMin || exceededMax;
	  }
	  return {
	    mount: mount,
	    move: move,
	    jump: jump,
	    translate: translate,
	    shift: shift,
	    cancel: cancel,
	    toIndex: toIndex,
	    toPosition: toPosition,
	    getPosition: getPosition,
	    getLimit: getLimit,
	    exceededLimit: exceededLimit,
	    reposition: reposition
	  };
	}
	function Controller(Splide2, Components2, options) {
	  var _EventInterface5 = EventInterface(Splide2),
	    on = _EventInterface5.on,
	    emit = _EventInterface5.emit;
	  var Move = Components2.Move;
	  var getPosition = Move.getPosition,
	    getLimit = Move.getLimit,
	    toPosition = Move.toPosition;
	  var _Components2$Slides = Components2.Slides,
	    isEnough = _Components2$Slides.isEnough,
	    getLength = _Components2$Slides.getLength;
	  var omitEnd = options.omitEnd;
	  var isLoop = Splide2.is(LOOP);
	  var isSlide = Splide2.is(SLIDE);
	  var getNext = apply(getAdjacent, false);
	  var getPrev = apply(getAdjacent, true);
	  var currIndex = options.start || 0;
	  var endIndex;
	  var prevIndex = currIndex;
	  var slideCount;
	  var perMove;
	  var perPage;
	  function mount() {
	    init();
	    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
	    on(EVENT_RESIZED, onResized);
	  }
	  function init() {
	    slideCount = getLength(true);
	    perMove = options.perMove;
	    perPage = options.perPage;
	    endIndex = getEnd();
	    var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
	    if (index !== currIndex) {
	      currIndex = index;
	      Move.reposition();
	    }
	  }
	  function onResized() {
	    if (endIndex !== getEnd()) {
	      emit(EVENT_END_INDEX_CHANGED);
	    }
	  }
	  function go(control, allowSameIndex, callback) {
	    if (!isBusy()) {
	      var dest = parse(control);
	      var index = loop(dest);
	      if (index > -1 && (allowSameIndex || index !== currIndex)) {
	        setIndex(index);
	        Move.move(dest, index, prevIndex, callback);
	      }
	    }
	  }
	  function scroll(destination, duration, snap, callback) {
	    Components2.Scroll.scroll(destination, duration, snap, function () {
	      var index = loop(Move.toIndex(getPosition()));
	      setIndex(omitEnd ? min(index, endIndex) : index);
	      callback && callback();
	    });
	  }
	  function parse(control) {
	    var index = currIndex;
	    if (isString(control)) {
	      var _ref = control.match(/([+\-<>])(\d+)?/) || [],
	        indicator = _ref[1],
	        number = _ref[2];
	      if (indicator === "+" || indicator === "-") {
	        index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
	      } else if (indicator === ">") {
	        index = number ? toIndex(+number) : getNext(true);
	      } else if (indicator === "<") {
	        index = getPrev(true);
	      }
	    } else {
	      index = isLoop ? control : clamp(control, 0, endIndex);
	    }
	    return index;
	  }
	  function getAdjacent(prev, destination) {
	    var number = perMove || (hasFocus() ? 1 : perPage);
	    var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
	    if (dest === -1 && isSlide) {
	      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
	        return prev ? 0 : endIndex;
	      }
	    }
	    return destination ? dest : loop(dest);
	  }
	  function computeDestIndex(dest, from, snapPage) {
	    if (isEnough() || hasFocus()) {
	      var index = computeMovableDestIndex(dest);
	      if (index !== dest) {
	        from = dest;
	        dest = index;
	        snapPage = false;
	      }
	      if (dest < 0 || dest > endIndex) {
	        if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
	          dest = toIndex(toPage(dest));
	        } else {
	          if (isLoop) {
	            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
	          } else if (options.rewind) {
	            dest = dest < 0 ? endIndex : 0;
	          } else {
	            dest = -1;
	          }
	        }
	      } else {
	        if (snapPage && dest !== from) {
	          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
	        }
	      }
	    } else {
	      dest = -1;
	    }
	    return dest;
	  }
	  function computeMovableDestIndex(dest) {
	    if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
	      var position = getPosition();
	      while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
	        dest < currIndex ? --dest : ++dest;
	      }
	    }
	    return dest;
	  }
	  function loop(index) {
	    return isLoop ? (index + slideCount) % slideCount || 0 : index;
	  }
	  function getEnd() {
	    var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
	    while (omitEnd && end-- > 0) {
	      if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
	        end++;
	        break;
	      }
	    }
	    return clamp(end, 0, slideCount - 1);
	  }
	  function toIndex(page) {
	    return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
	  }
	  function toPage(index) {
	    return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
	  }
	  function toDest(destination) {
	    var closest = Move.toIndex(destination);
	    return isSlide ? clamp(closest, 0, endIndex) : closest;
	  }
	  function setIndex(index) {
	    if (index !== currIndex) {
	      prevIndex = currIndex;
	      currIndex = index;
	    }
	  }
	  function getIndex(prev) {
	    return prev ? prevIndex : currIndex;
	  }
	  function hasFocus() {
	    return !isUndefined(options.focus) || options.isNavigation;
	  }
	  function isBusy() {
	    return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
	  }
	  return {
	    mount: mount,
	    go: go,
	    scroll: scroll,
	    getNext: getNext,
	    getPrev: getPrev,
	    getAdjacent: getAdjacent,
	    getEnd: getEnd,
	    setIndex: setIndex,
	    getIndex: getIndex,
	    toIndex: toIndex,
	    toPage: toPage,
	    toDest: toDest,
	    hasFocus: hasFocus,
	    isBusy: isBusy
	  };
	}
	var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
	var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
	var SIZE = 40;
	function Arrows(Splide2, Components2, options) {
	  var event = EventInterface(Splide2);
	  var on = event.on,
	    bind = event.bind,
	    emit = event.emit;
	  var classes = options.classes,
	    i18n = options.i18n;
	  var Elements = Components2.Elements,
	    Controller = Components2.Controller;
	  var placeholder = Elements.arrows,
	    track = Elements.track;
	  var wrapper = placeholder;
	  var prev = Elements.prev;
	  var next = Elements.next;
	  var created;
	  var wrapperClasses;
	  var arrows = {};
	  function mount() {
	    init();
	    on(EVENT_UPDATED, remount);
	  }
	  function remount() {
	    destroy();
	    mount();
	  }
	  function init() {
	    var enabled = options.arrows;
	    if (enabled && !(prev && next)) {
	      createArrows();
	    }
	    if (prev && next) {
	      assign(arrows, {
	        prev: prev,
	        next: next
	      });
	      display(wrapper, enabled ? "" : "none");
	      addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
	      if (enabled) {
	        listen();
	        update();
	        setAttribute([prev, next], ARIA_CONTROLS, track.id);
	        emit(EVENT_ARROWS_MOUNTED, prev, next);
	      }
	    }
	  }
	  function destroy() {
	    event.destroy();
	    removeClass(wrapper, wrapperClasses);
	    if (created) {
	      remove(placeholder ? [prev, next] : wrapper);
	      prev = next = null;
	    } else {
	      removeAttribute([prev, next], ALL_ATTRIBUTES);
	    }
	  }
	  function listen() {
	    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
	    bind(next, "click", apply(go, ">"));
	    bind(prev, "click", apply(go, "<"));
	  }
	  function go(control) {
	    Controller.go(control, true);
	  }
	  function createArrows() {
	    wrapper = placeholder || create("div", classes.arrows);
	    prev = createArrow(true);
	    next = createArrow(false);
	    created = true;
	    append(wrapper, [prev, next]);
	    !placeholder && before(wrapper, track);
	  }
	  function createArrow(prev2) {
	    var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\" focusable=\"false\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
	    return parseHtml(arrow);
	  }
	  function update() {
	    if (prev && next) {
	      var index = Splide2.index;
	      var prevIndex = Controller.getPrev();
	      var nextIndex = Controller.getNext();
	      var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
	      var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
	      prev.disabled = prevIndex < 0;
	      next.disabled = nextIndex < 0;
	      setAttribute(prev, ARIA_LABEL, prevLabel);
	      setAttribute(next, ARIA_LABEL, nextLabel);
	      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
	    }
	  }
	  return {
	    arrows: arrows,
	    mount: mount,
	    destroy: destroy,
	    update: update
	  };
	}
	var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
	function Autoplay(Splide2, Components2, options) {
	  var _EventInterface6 = EventInterface(Splide2),
	    on = _EventInterface6.on,
	    bind = _EventInterface6.bind,
	    emit = _EventInterface6.emit;
	  var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
	  var isPaused = interval.isPaused;
	  var Elements = Components2.Elements,
	    _Components2$Elements4 = Components2.Elements,
	    root = _Components2$Elements4.root,
	    toggle = _Components2$Elements4.toggle;
	  var autoplay = options.autoplay;
	  var hovered;
	  var focused;
	  var stopped = autoplay === "pause";
	  function mount() {
	    if (autoplay) {
	      listen();
	      toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
	      stopped || play();
	      update();
	    }
	  }
	  function listen() {
	    if (options.pauseOnHover) {
	      bind(root, "mouseenter mouseleave", function (e) {
	        hovered = e.type === "mouseenter";
	        autoToggle();
	      });
	    }
	    if (options.pauseOnFocus) {
	      bind(root, "focusin focusout", function (e) {
	        focused = e.type === "focusin";
	        autoToggle();
	      });
	    }
	    if (toggle) {
	      bind(toggle, "click", function () {
	        stopped ? play() : pause(true);
	      });
	    }
	    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
	    on(EVENT_MOVE, onMove);
	  }
	  function play() {
	    if (isPaused() && Components2.Slides.isEnough()) {
	      interval.start(!options.resetProgress);
	      focused = hovered = stopped = false;
	      update();
	      emit(EVENT_AUTOPLAY_PLAY);
	    }
	  }
	  function pause(stop) {
	    if (stop === void 0) {
	      stop = true;
	    }
	    stopped = !!stop;
	    update();
	    if (!isPaused()) {
	      interval.pause();
	      emit(EVENT_AUTOPLAY_PAUSE);
	    }
	  }
	  function autoToggle() {
	    if (!stopped) {
	      hovered || focused ? pause(false) : play();
	    }
	  }
	  function update() {
	    if (toggle) {
	      toggleClass(toggle, CLASS_ACTIVE, !stopped);
	      setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
	    }
	  }
	  function onAnimationFrame(rate) {
	    var bar = Elements.bar;
	    bar && style(bar, "width", rate * 100 + "%");
	    emit(EVENT_AUTOPLAY_PLAYING, rate);
	  }
	  function onMove(index) {
	    var Slide = Components2.Slides.getAt(index);
	    interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
	  }
	  return {
	    mount: mount,
	    destroy: interval.cancel,
	    play: play,
	    pause: pause,
	    isPaused: isPaused
	  };
	}
	function Cover(Splide2, Components2, options) {
	  var _EventInterface7 = EventInterface(Splide2),
	    on = _EventInterface7.on;
	  function mount() {
	    if (options.cover) {
	      on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
	      on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
	    }
	  }
	  function cover(cover2) {
	    Components2.Slides.forEach(function (Slide) {
	      var img = child(Slide.container || Slide.slide, "img");
	      if (img && img.src) {
	        toggle(cover2, img, Slide);
	      }
	    });
	  }
	  function toggle(cover2, img, Slide) {
	    Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
	    display(img, cover2 ? "none" : "");
	  }
	  return {
	    mount: mount,
	    destroy: apply(cover, false)
	  };
	}
	var BOUNCE_DIFF_THRESHOLD = 10;
	var BOUNCE_DURATION = 600;
	var FRICTION_FACTOR = 0.6;
	var BASE_VELOCITY = 1.5;
	var MIN_DURATION = 800;
	function Scroll(Splide2, Components2, options) {
	  var _EventInterface8 = EventInterface(Splide2),
	    on = _EventInterface8.on,
	    emit = _EventInterface8.emit;
	  var set = Splide2.state.set;
	  var Move = Components2.Move;
	  var getPosition = Move.getPosition,
	    getLimit = Move.getLimit,
	    exceededLimit = Move.exceededLimit,
	    translate = Move.translate;
	  var isSlide = Splide2.is(SLIDE);
	  var interval;
	  var callback;
	  var friction = 1;
	  function mount() {
	    on(EVENT_MOVE, clear);
	    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
	  }
	  function scroll(destination, duration, snap, onScrolled, noConstrain) {
	    var from = getPosition();
	    clear();
	    if (snap && (!isSlide || !exceededLimit())) {
	      var size = Components2.Layout.sliderSize();
	      var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
	      destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
	    }
	    var noDistance = approximatelyEqual(from, destination, 1);
	    friction = 1;
	    duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
	    callback = onScrolled;
	    interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
	    set(SCROLLING);
	    emit(EVENT_SCROLL);
	    interval.start();
	  }
	  function onEnd() {
	    set(IDLE);
	    callback && callback();
	    emit(EVENT_SCROLLED);
	  }
	  function update(from, to, noConstrain, rate) {
	    var position = getPosition();
	    var target = from + (to - from) * easing(rate);
	    var diff = (target - position) * friction;
	    translate(position + diff);
	    if (isSlide && !noConstrain && exceededLimit()) {
	      friction *= FRICTION_FACTOR;
	      if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
	        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
	      }
	    }
	  }
	  function clear() {
	    if (interval) {
	      interval.cancel();
	    }
	  }
	  function cancel() {
	    if (interval && !interval.isPaused()) {
	      clear();
	      onEnd();
	    }
	  }
	  function easing(t) {
	    var easingFunc = options.easingFunc;
	    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
	  }
	  return {
	    mount: mount,
	    destroy: clear,
	    scroll: scroll,
	    cancel: cancel
	  };
	}
	var SCROLL_LISTENER_OPTIONS = {
	  passive: false,
	  capture: true
	};
	function Drag(Splide2, Components2, options) {
	  var _EventInterface9 = EventInterface(Splide2),
	    on = _EventInterface9.on,
	    emit = _EventInterface9.emit,
	    bind = _EventInterface9.bind,
	    unbind = _EventInterface9.unbind;
	  var state = Splide2.state;
	  var Move = Components2.Move,
	    Scroll = Components2.Scroll,
	    Controller = Components2.Controller,
	    track = Components2.Elements.track,
	    reduce = Components2.Media.reduce;
	  var _Components2$Directio2 = Components2.Direction,
	    resolve = _Components2$Directio2.resolve,
	    orient = _Components2$Directio2.orient;
	  var getPosition = Move.getPosition,
	    exceededLimit = Move.exceededLimit;
	  var basePosition;
	  var baseEvent;
	  var prevBaseEvent;
	  var isFree;
	  var dragging;
	  var exceeded = false;
	  var clickPrevented;
	  var disabled;
	  var target;
	  function mount() {
	    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
	    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
	    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
	    bind(track, "click", onClick, {
	      capture: true
	    });
	    bind(track, "dragstart", prevent);
	    on([EVENT_MOUNTED, EVENT_UPDATED], init);
	  }
	  function init() {
	    var drag = options.drag;
	    disable(!drag);
	    isFree = drag === "free";
	  }
	  function onPointerDown(e) {
	    clickPrevented = false;
	    if (!disabled) {
	      var isTouch = isTouchEvent(e);
	      if (isDraggable(e.target) && (isTouch || !e.button)) {
	        if (!Controller.isBusy()) {
	          target = isTouch ? track : window;
	          dragging = state.is([MOVING, SCROLLING]);
	          prevBaseEvent = null;
	          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
	          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
	          Move.cancel();
	          Scroll.cancel();
	          save(e);
	        } else {
	          prevent(e, true);
	        }
	      }
	    }
	  }
	  function onPointerMove(e) {
	    if (!state.is(DRAGGING)) {
	      state.set(DRAGGING);
	      emit(EVENT_DRAG);
	    }
	    if (e.cancelable) {
	      if (dragging) {
	        Move.translate(basePosition + constrain(diffCoord(e)));
	        var expired = diffTime(e) > LOG_INTERVAL;
	        var hasExceeded = exceeded !== (exceeded = exceededLimit());
	        if (expired || hasExceeded) {
	          save(e);
	        }
	        clickPrevented = true;
	        emit(EVENT_DRAGGING);
	        prevent(e);
	      } else if (isSliderDirection(e)) {
	        dragging = shouldStart(e);
	        prevent(e);
	      }
	    }
	  }
	  function onPointerUp(e) {
	    if (state.is(DRAGGING)) {
	      state.set(IDLE);
	      emit(EVENT_DRAGGED);
	    }
	    if (dragging) {
	      move(e);
	      prevent(e);
	    }
	    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
	    unbind(target, POINTER_UP_EVENTS, onPointerUp);
	    dragging = false;
	  }
	  function onClick(e) {
	    if (!disabled && clickPrevented) {
	      prevent(e, true);
	    }
	  }
	  function save(e) {
	    prevBaseEvent = baseEvent;
	    baseEvent = e;
	    basePosition = getPosition();
	  }
	  function move(e) {
	    var velocity = computeVelocity(e);
	    var destination = computeDestination(velocity);
	    var rewind = options.rewind && options.rewindByDrag;
	    reduce(false);
	    if (isFree) {
	      Controller.scroll(destination, 0, options.snap);
	    } else if (Splide2.is(FADE)) {
	      Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
	    } else if (Splide2.is(SLIDE) && exceeded && rewind) {
	      Controller.go(exceededLimit(true) ? ">" : "<");
	    } else {
	      Controller.go(Controller.toDest(destination), true);
	    }
	    reduce(true);
	  }
	  function shouldStart(e) {
	    var thresholds = options.dragMinThreshold;
	    var isObj = isObject(thresholds);
	    var mouse = isObj && thresholds.mouse || 0;
	    var touch = (isObj ? thresholds.touch : +thresholds) || 10;
	    return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
	  }
	  function isSliderDirection(e) {
	    return abs(diffCoord(e)) > abs(diffCoord(e, true));
	  }
	  function computeVelocity(e) {
	    if (Splide2.is(LOOP) || !exceeded) {
	      var time = diffTime(e);
	      if (time && time < LOG_INTERVAL) {
	        return diffCoord(e) / time;
	      }
	    }
	    return 0;
	  }
	  function computeDestination(velocity) {
	    return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
	  }
	  function diffCoord(e, orthogonal) {
	    return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
	  }
	  function diffTime(e) {
	    return timeOf(e) - timeOf(getBaseEvent(e));
	  }
	  function getBaseEvent(e) {
	    return baseEvent === e && prevBaseEvent || baseEvent;
	  }
	  function coordOf(e, orthogonal) {
	    return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
	  }
	  function constrain(diff) {
	    return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
	  }
	  function isDraggable(target2) {
	    var noDrag = options.noDrag;
	    return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
	  }
	  function isTouchEvent(e) {
	    return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
	  }
	  function isDragging() {
	    return dragging;
	  }
	  function disable(value) {
	    disabled = value;
	  }
	  return {
	    mount: mount,
	    disable: disable,
	    isDragging: isDragging
	  };
	}
	var NORMALIZATION_MAP = {
	  Spacebar: " ",
	  Right: ARROW_RIGHT,
	  Left: ARROW_LEFT,
	  Up: ARROW_UP,
	  Down: ARROW_DOWN
	};
	function normalizeKey(key) {
	  key = isString(key) ? key : key.key;
	  return NORMALIZATION_MAP[key] || key;
	}
	var KEYBOARD_EVENT = "keydown";
	function Keyboard(Splide2, Components2, options) {
	  var _EventInterface10 = EventInterface(Splide2),
	    on = _EventInterface10.on,
	    bind = _EventInterface10.bind,
	    unbind = _EventInterface10.unbind;
	  var root = Splide2.root;
	  var resolve = Components2.Direction.resolve;
	  var target;
	  var disabled;
	  function mount() {
	    init();
	    on(EVENT_UPDATED, destroy);
	    on(EVENT_UPDATED, init);
	    on(EVENT_MOVE, onMove);
	  }
	  function init() {
	    var keyboard = options.keyboard;
	    if (keyboard) {
	      target = keyboard === "global" ? window : root;
	      bind(target, KEYBOARD_EVENT, onKeydown);
	    }
	  }
	  function destroy() {
	    unbind(target, KEYBOARD_EVENT);
	  }
	  function disable(value) {
	    disabled = value;
	  }
	  function onMove() {
	    var _disabled = disabled;
	    disabled = true;
	    nextTick(function () {
	      disabled = _disabled;
	    });
	  }
	  function onKeydown(e) {
	    if (!disabled) {
	      var key = normalizeKey(e);
	      if (key === resolve(ARROW_LEFT)) {
	        Splide2.go("<");
	      } else if (key === resolve(ARROW_RIGHT)) {
	        Splide2.go(">");
	      }
	    }
	  }
	  return {
	    mount: mount,
	    destroy: destroy,
	    disable: disable
	  };
	}
	var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
	var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
	var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
	function LazyLoad(Splide2, Components2, options) {
	  var _EventInterface11 = EventInterface(Splide2),
	    on = _EventInterface11.on,
	    off = _EventInterface11.off,
	    bind = _EventInterface11.bind,
	    emit = _EventInterface11.emit;
	  var isSequential = options.lazyLoad === "sequential";
	  var events = [EVENT_MOVED, EVENT_SCROLLED];
	  var entries = [];
	  function mount() {
	    if (options.lazyLoad) {
	      init();
	      on(EVENT_REFRESH, init);
	    }
	  }
	  function init() {
	    empty(entries);
	    register();
	    if (isSequential) {
	      loadNext();
	    } else {
	      off(events);
	      on(events, check);
	      check();
	    }
	  }
	  function register() {
	    Components2.Slides.forEach(function (Slide) {
	      queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
	        var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
	        var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
	        if (src !== img.src || srcset !== img.srcset) {
	          var className = options.classes.spinner;
	          var parent = img.parentElement;
	          var spinner = child(parent, "." + className) || create("span", className, parent);
	          entries.push([img, Slide, spinner]);
	          img.src || display(img, "none");
	        }
	      });
	    });
	  }
	  function check() {
	    entries = entries.filter(function (data) {
	      var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
	      return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
	    });
	    entries.length || off(events);
	  }
	  function load(data) {
	    var img = data[0];
	    addClass(data[1].slide, CLASS_LOADING);
	    bind(img, "load error", apply(onLoad, data));
	    setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
	    setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
	    removeAttribute(img, SRC_DATA_ATTRIBUTE);
	    removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
	  }
	  function onLoad(data, e) {
	    var img = data[0],
	      Slide = data[1];
	    removeClass(Slide.slide, CLASS_LOADING);
	    if (e.type !== "error") {
	      remove(data[2]);
	      display(img, "");
	      emit(EVENT_LAZYLOAD_LOADED, img, Slide);
	      emit(EVENT_RESIZE);
	    }
	    isSequential && loadNext();
	  }
	  function loadNext() {
	    entries.length && load(entries.shift());
	  }
	  return {
	    mount: mount,
	    destroy: apply(empty, entries),
	    check: check
	  };
	}
	function Pagination(Splide2, Components2, options) {
	  var event = EventInterface(Splide2);
	  var on = event.on,
	    emit = event.emit,
	    bind = event.bind;
	  var Slides = Components2.Slides,
	    Elements = Components2.Elements,
	    Controller = Components2.Controller;
	  var hasFocus = Controller.hasFocus,
	    getIndex = Controller.getIndex,
	    go = Controller.go;
	  var resolve = Components2.Direction.resolve;
	  var placeholder = Elements.pagination;
	  var items = [];
	  var list;
	  var paginationClasses;
	  function mount() {
	    destroy();
	    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
	    var enabled = options.pagination;
	    placeholder && display(placeholder, enabled ? "" : "none");
	    if (enabled) {
	      on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
	      createPagination();
	      update();
	      emit(EVENT_PAGINATION_MOUNTED, {
	        list: list,
	        items: items
	      }, getAt(Splide2.index));
	    }
	  }
	  function destroy() {
	    if (list) {
	      remove(placeholder ? slice(list.children) : list);
	      removeClass(list, paginationClasses);
	      empty(items);
	      list = null;
	    }
	    event.destroy();
	  }
	  function createPagination() {
	    var length = Splide2.length;
	    var classes = options.classes,
	      i18n = options.i18n,
	      perPage = options.perPage;
	    var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
	    list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
	    addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
	    setAttribute(list, ROLE, "tablist");
	    setAttribute(list, ARIA_LABEL, i18n.select);
	    setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
	    for (var i = 0; i < max; i++) {
	      var li = create("li", null, list);
	      var button = create("button", {
	        class: classes.page,
	        type: "button"
	      }, li);
	      var controls = Slides.getIn(i).map(function (Slide) {
	        return Slide.slide.id;
	      });
	      var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
	      bind(button, "click", apply(onClick, i));
	      if (options.paginationKeyboard) {
	        bind(button, "keydown", apply(onKeydown, i));
	      }
	      setAttribute(li, ROLE, "presentation");
	      setAttribute(button, ROLE, "tab");
	      setAttribute(button, ARIA_CONTROLS, controls.join(" "));
	      setAttribute(button, ARIA_LABEL, format(text, i + 1));
	      setAttribute(button, TAB_INDEX, -1);
	      items.push({
	        li: li,
	        button: button,
	        page: i
	      });
	    }
	  }
	  function onClick(page) {
	    go(">" + page, true);
	  }
	  function onKeydown(page, e) {
	    var length = items.length;
	    var key = normalizeKey(e);
	    var dir = getDirection();
	    var nextPage = -1;
	    if (key === resolve(ARROW_RIGHT, false, dir)) {
	      nextPage = ++page % length;
	    } else if (key === resolve(ARROW_LEFT, false, dir)) {
	      nextPage = (--page + length) % length;
	    } else if (key === "Home") {
	      nextPage = 0;
	    } else if (key === "End") {
	      nextPage = length - 1;
	    }
	    var item = items[nextPage];
	    if (item) {
	      focus(item.button);
	      go(">" + nextPage);
	      prevent(e, true);
	    }
	  }
	  function getDirection() {
	    return options.paginationDirection || options.direction;
	  }
	  function getAt(index) {
	    return items[Controller.toPage(index)];
	  }
	  function update() {
	    var prev = getAt(getIndex(true));
	    var curr = getAt(getIndex());
	    if (prev) {
	      var button = prev.button;
	      removeClass(button, CLASS_ACTIVE);
	      removeAttribute(button, ARIA_SELECTED);
	      setAttribute(button, TAB_INDEX, -1);
	    }
	    if (curr) {
	      var _button = curr.button;
	      addClass(_button, CLASS_ACTIVE);
	      setAttribute(_button, ARIA_SELECTED, true);
	      setAttribute(_button, TAB_INDEX, "");
	    }
	    emit(EVENT_PAGINATION_UPDATED, {
	      list: list,
	      items: items
	    }, prev, curr);
	  }
	  return {
	    items: items,
	    mount: mount,
	    destroy: destroy,
	    getAt: getAt,
	    update: update
	  };
	}
	var TRIGGER_KEYS = [" ", "Enter"];
	function Sync(Splide2, Components2, options) {
	  var isNavigation = options.isNavigation,
	    slideFocus = options.slideFocus;
	  var events = [];
	  function mount() {
	    Splide2.splides.forEach(function (target) {
	      if (!target.isParent) {
	        sync(Splide2, target.splide);
	        sync(target.splide, Splide2);
	      }
	    });
	    if (isNavigation) {
	      navigate();
	    }
	  }
	  function destroy() {
	    events.forEach(function (event) {
	      event.destroy();
	    });
	    empty(events);
	  }
	  function remount() {
	    destroy();
	    mount();
	  }
	  function sync(splide, target) {
	    var event = EventInterface(splide);
	    event.on(EVENT_MOVE, function (index, prev, dest) {
	      target.go(target.is(LOOP) ? dest : index);
	    });
	    events.push(event);
	  }
	  function navigate() {
	    var event = EventInterface(Splide2);
	    var on = event.on;
	    on(EVENT_CLICK, onClick);
	    on(EVENT_SLIDE_KEYDOWN, onKeydown);
	    on([EVENT_MOUNTED, EVENT_UPDATED], update);
	    events.push(event);
	    event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
	  }
	  function update() {
	    setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
	  }
	  function onClick(Slide) {
	    Splide2.go(Slide.index);
	  }
	  function onKeydown(Slide, e) {
	    if (includes(TRIGGER_KEYS, normalizeKey(e))) {
	      onClick(Slide);
	      prevent(e);
	    }
	  }
	  return {
	    setup: apply(Components2.Media.set, {
	      slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
	    }, true),
	    mount: mount,
	    destroy: destroy,
	    remount: remount
	  };
	}
	function Wheel(Splide2, Components2, options) {
	  var _EventInterface12 = EventInterface(Splide2),
	    bind = _EventInterface12.bind;
	  var lastTime = 0;
	  function mount() {
	    if (options.wheel) {
	      bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
	    }
	  }
	  function onWheel(e) {
	    if (e.cancelable) {
	      var deltaY = e.deltaY;
	      var backwards = deltaY < 0;
	      var timeStamp = timeOf(e);
	      var _min = options.wheelMinThreshold || 0;
	      var sleep = options.wheelSleep || 0;
	      if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
	        Splide2.go(backwards ? "<" : ">");
	        lastTime = timeStamp;
	      }
	      shouldPrevent(backwards) && prevent(e);
	    }
	  }
	  function shouldPrevent(backwards) {
	    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
	  }
	  return {
	    mount: mount
	  };
	}
	var SR_REMOVAL_DELAY = 90;
	function Live(Splide2, Components2, options) {
	  var _EventInterface13 = EventInterface(Splide2),
	    on = _EventInterface13.on;
	  var track = Components2.Elements.track;
	  var enabled = options.live && !options.isNavigation;
	  var sr = create("span", CLASS_SR);
	  var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
	  function mount() {
	    if (enabled) {
	      disable(!Components2.Autoplay.isPaused());
	      setAttribute(track, ARIA_ATOMIC, true);
	      sr.textContent = "\u2026";
	      on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
	      on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
	      on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
	    }
	  }
	  function toggle(active) {
	    setAttribute(track, ARIA_BUSY, active);
	    if (active) {
	      append(track, sr);
	      interval.start();
	    } else {
	      remove(sr);
	      interval.cancel();
	    }
	  }
	  function destroy() {
	    removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
	    remove(sr);
	  }
	  function disable(disabled) {
	    if (enabled) {
	      setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
	    }
	  }
	  return {
	    mount: mount,
	    disable: disable,
	    destroy: destroy
	  };
	}
	var ComponentConstructors = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  Media: Media,
	  Direction: Direction,
	  Elements: Elements,
	  Slides: Slides,
	  Layout: Layout,
	  Clones: Clones,
	  Move: Move,
	  Controller: Controller,
	  Arrows: Arrows,
	  Autoplay: Autoplay,
	  Cover: Cover,
	  Scroll: Scroll,
	  Drag: Drag,
	  Keyboard: Keyboard,
	  LazyLoad: LazyLoad,
	  Pagination: Pagination,
	  Sync: Sync,
	  Wheel: Wheel,
	  Live: Live
	});
	var I18N = {
	  prev: "Previous slide",
	  next: "Next slide",
	  first: "Go to first slide",
	  last: "Go to last slide",
	  slideX: "Go to slide %s",
	  pageX: "Go to page %s",
	  play: "Start autoplay",
	  pause: "Pause autoplay",
	  carousel: "carousel",
	  slide: "slide",
	  select: "Select a slide to show",
	  slideLabel: "%s of %s"
	};
	var DEFAULTS = {
	  type: "slide",
	  role: "region",
	  speed: 400,
	  perPage: 1,
	  cloneStatus: true,
	  arrows: true,
	  pagination: true,
	  paginationKeyboard: true,
	  interval: 5e3,
	  pauseOnHover: true,
	  pauseOnFocus: true,
	  resetProgress: true,
	  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
	  drag: true,
	  direction: "ltr",
	  trimSpace: true,
	  focusableNodes: "a, button, textarea, input, select, iframe",
	  live: true,
	  classes: CLASSES,
	  i18n: I18N,
	  reducedMotion: {
	    speed: 0,
	    rewindSpeed: 0,
	    autoplay: "pause"
	  }
	};
	function Fade(Splide2, Components2, options) {
	  var Slides = Components2.Slides;
	  function mount() {
	    EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
	  }
	  function init() {
	    Slides.forEach(function (Slide) {
	      Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
	    });
	  }
	  function start(index, done) {
	    Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
	    nextTick(done);
	  }
	  return {
	    mount: mount,
	    start: start,
	    cancel: noop
	  };
	}
	function Slide(Splide2, Components2, options) {
	  var Move = Components2.Move,
	    Controller = Components2.Controller,
	    Scroll = Components2.Scroll;
	  var list = Components2.Elements.list;
	  var transition = apply(style, list, "transition");
	  var endCallback;
	  function mount() {
	    EventInterface(Splide2).bind(list, "transitionend", function (e) {
	      if (e.target === list && endCallback) {
	        cancel();
	        endCallback();
	      }
	    });
	  }
	  function start(index, done) {
	    var destination = Move.toPosition(index, true);
	    var position = Move.getPosition();
	    var speed = getSpeed(index);
	    if (abs(destination - position) >= 1 && speed >= 1) {
	      if (options.useScroll) {
	        Scroll.scroll(destination, speed, false, done);
	      } else {
	        transition("transform " + speed + "ms " + options.easing);
	        Move.translate(destination, true);
	        endCallback = done;
	      }
	    } else {
	      Move.jump(index);
	      done();
	    }
	  }
	  function cancel() {
	    transition("");
	    Scroll.cancel();
	  }
	  function getSpeed(index) {
	    var rewindSpeed = options.rewindSpeed;
	    if (Splide2.is(SLIDE) && rewindSpeed) {
	      var prev = Controller.getIndex(true);
	      var end = Controller.getEnd();
	      if (prev === 0 && index >= end || prev >= end && index === 0) {
	        return rewindSpeed;
	      }
	    }
	    return options.speed;
	  }
	  return {
	    mount: mount,
	    start: start,
	    cancel: cancel
	  };
	}
	var _Splide = /*#__PURE__*/function () {
	  function _Splide(target, options) {
	    this.event = EventInterface();
	    this.Components = {};
	    this.state = State(CREATED);
	    this.splides = [];
	    this._o = {};
	    this._E = {};
	    var root = isString(target) ? query(document, target) : target;
	    assert(root, root + " is invalid.");
	    this.root = root;
	    options = merge({
	      label: getAttribute(root, ARIA_LABEL) || "",
	      labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
	    }, DEFAULTS, _Splide.defaults, options || {});
	    try {
	      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
	    } catch (e) {
	      assert(false, "Invalid JSON");
	    }
	    this._o = Object.create(merge({}, options));
	  }
	  var _proto = _Splide.prototype;
	  _proto.mount = function mount(Extensions, Transition) {
	    var _this = this;
	    var state = this.state,
	      Components2 = this.Components;
	    assert(state.is([CREATED, DESTROYED]), "Already mounted!");
	    state.set(CREATED);
	    this._C = Components2;
	    this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
	    this._E = Extensions || this._E;
	    var Constructors = assign({}, ComponentConstructors, this._E, {
	      Transition: this._T
	    });
	    forOwn(Constructors, function (Component, key) {
	      var component = Component(_this, Components2, _this._o);
	      Components2[key] = component;
	      component.setup && component.setup();
	    });
	    forOwn(Components2, function (component) {
	      component.mount && component.mount();
	    });
	    this.emit(EVENT_MOUNTED);
	    addClass(this.root, CLASS_INITIALIZED);
	    state.set(IDLE);
	    this.emit(EVENT_READY);
	    return this;
	  };
	  _proto.sync = function sync(splide) {
	    this.splides.push({
	      splide: splide
	    });
	    splide.splides.push({
	      splide: this,
	      isParent: true
	    });
	    if (this.state.is(IDLE)) {
	      this._C.Sync.remount();
	      splide.Components.Sync.remount();
	    }
	    return this;
	  };
	  _proto.go = function go(control) {
	    this._C.Controller.go(control);
	    return this;
	  };
	  _proto.on = function on(events, callback) {
	    this.event.on(events, callback);
	    return this;
	  };
	  _proto.off = function off(events) {
	    this.event.off(events);
	    return this;
	  };
	  _proto.emit = function emit(event) {
	    var _this$event;
	    (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));
	    return this;
	  };
	  _proto.add = function add(slides, index) {
	    this._C.Slides.add(slides, index);
	    return this;
	  };
	  _proto.remove = function remove(matcher) {
	    this._C.Slides.remove(matcher);
	    return this;
	  };
	  _proto.is = function is(type) {
	    return this._o.type === type;
	  };
	  _proto.refresh = function refresh() {
	    this.emit(EVENT_REFRESH);
	    return this;
	  };
	  _proto.destroy = function destroy(completely) {
	    if (completely === void 0) {
	      completely = true;
	    }
	    var event = this.event,
	      state = this.state;
	    if (state.is(CREATED)) {
	      EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
	    } else {
	      forOwn(this._C, function (component) {
	        component.destroy && component.destroy(completely);
	      }, true);
	      event.emit(EVENT_DESTROY);
	      event.destroy();
	      completely && empty(this.splides);
	      state.set(DESTROYED);
	    }
	    return this;
	  };
	  _createClass(_Splide, [{
	    key: "options",
	    get: function get() {
	      return this._o;
	    },
	    set: function set(options) {
	      this._C.Media.set(options, true, true);
	    }
	  }, {
	    key: "length",
	    get: function get() {
	      return this._C.Slides.getLength(true);
	    }
	  }, {
	    key: "index",
	    get: function get() {
	      return this._C.Controller.getIndex();
	    }
	  }]);
	  return _Splide;
	}();
	var Splide = _Splide;
	Splide.defaults = {};
	Splide.STATES = STATES;

	const carousels = [...document.querySelectorAll('.splide')];
	carousels.forEach(item => {
	  let options = {
	    type: "fade",
	    rewind: true,
	    arrows: item.hasAttribute('data-arrows') ? true : false
	  };
	  if (item.hasAttribute('data-splide-bp')) {
	    let bp = parseInt(item.getAttribute('data-splide-bp'));
	    options.mediaQuery = 'min';
	    options.breakpoints = {
	      [bp]: {
	        destroy: true
	      }
	    };
	  }
	  console.log('options = ', options);
	  new Splide(item, options).mount();
	});

	class ViewSwitch {
	  constructor() {
	    this.btn = document.getElementById('archive-switcher');
	    if (!this.btn) {
	      return;
	    }
	    this.currIndex;
	    this.views = [...document.querySelectorAll('[data-view-switch]')];
	    this.addEvents();
	    this.views.forEach((item, index) => {
	      if (item.classList.contains('active')) {
	        this.currIndex = index;
	      }
	    });
	  }
	  addEvents() {
	    this.btn.addEventListener('click', e => {
	      e.preventDefault;
	      this.btn.disabled = true;
	      this.setAnim(this.views[this.currIndex]);
	      this.currIndex = this.currIndex === this.views.length - 1 ? 0 : this.currIndex + 1;
	      this.setAnim(this.views[this.currIndex], true);
	      this.switchBtnLabel();
	    });
	  }
	  switchBtnLabel() {
	    let nextLabel = this.btn.getAttribute('data-swap-label');
	    let currentLabel = this.btn.innerHTML;
	    this.btn.innerHTML = nextLabel;
	    this.btn.setAttribute('data-swap-label', currentLabel);
	  }
	  setAnim(ele, fadeIn = false) {
	    if (fadeIn === false) {
	      ele.classList.add('fade-out');
	    } else {
	      ele.classList.add('fade-in');
	      ele.classList.remove('d-none');
	    }
	    ele.addEventListener('animationend', e => {
	      console.log('e', e);
	      if (e.animationName === 'fade-out') {
	        ele.classList.remove('fade-out', 'active');
	        ele.classList.add('d-none');
	        console.log('fade out end');
	      }
	      if (e.animationName === 'fade-in') {
	        ele.classList.remove('fade-in');
	        ele.classList.add('active');
	        console.log('fade out in');
	      }
	      this.btn.disabled = false;
	    });
	  }
	}

	class EmailCareer {
	  constructor() {
	    this.form = document.getElementById('career-email');
	    if (!this.form) {
	      return;
	    }
	    this.emailInput = this.form.querySelector('[type=email');
	    this.submitBtn = this.form.querySelector('[type=submit');
	    this.addEvent();
	  }
	  addEvent() {
	    this.form.addEventListener('submit', async e => {
	      e.preventDefault();
	      let postID = themeData.postID;
	      let emailAddress = this.emailInput.value;
	      let response = await fetch(themeData.restURL + 'quantum-care/v1/email-job-spec', {
	        method: 'POST',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({
	          email: emailAddress,
	          post_id: postID
	        })
	      });
	      let json = await response.json();
	      if (response.status === 200) {
	        this.removeForm();
	      }
	      this.responseMessage(json.message);
	      console.log(json);
	    });
	    this.emailInput.addEventListener('input', () => {
	      if (this.emailInput.validity.valid) {
	        this.submitBtn.disabled = false;
	      }
	    });
	  }
	  responseMessage(msg) {
	    let msgEle = document.createElement('div');
	    let textNode = document.createTextNode(msg);
	    msgEle.classList.add('career-single__info-form-msg');
	    msgEle.appendChild(textNode);
	    this.form.appendChild(msgEle);
	  }
	  removeForm() {
	    this.emailInput.remove();
	    this.submitBtn.remove();
	  }
	}

	class MenuCollapse {
	  constructor(bp) {
	    this.bp = bp;
	    this.menus = [...document.querySelectorAll('.menu-collapse')];
	    this.addEvents();
	  }
	  addEvents() {
	    this.menus.forEach(menu => {
	      menu.querySelector('ul');
	      let items = [...menu.querySelectorAll('li')];
	      let displayArea = menu.querySelector('.menu-collapse__display');
	      let displayAreaText = displayArea.querySelector('span');
	      let currentPageLink = menu.querySelector('li.current');
	      menu.addEventListener('click', () => {
	        menu.classList.toggle('menu-collapse--open');

	        // if(menu.classList.contains('menu-collapse--open')) {
	        //   let scrollH = list.scrollHeight + "px";
	        //   list.style.height = "0px";
	        //   list.style.height = scrollH;
	        // }else {
	        //   list.style.height = "";
	        // }
	      });
	      items.forEach((item, index) => {
	        let displayText = currentPageLink ? currentPageLink.innerText : items[0].innerText;
	        displayAreaText.innerHTML = displayText;
	        item.addEventListener('click', () => {
	          displayAreaText.innerHTML = item.innerText;
	        });
	      });
	    });
	    window.addEventListener('resize', this.debounce(e => {
	      let vpWidth = window.innerWidth;
	      if (vpWidth > this.bp) {
	        this.menus.forEach(menu => {
	          let list = menu.querySelector('ul');
	          list.style.height = "";
	          menu.classList.remove('menu-collapse--open');
	        });
	      }
	    }));
	  }
	  debounce(cbFnc, timeout = 300) {
	    let timer;
	    return (...args) => {
	      clearTimeout(timer);
	      timer = setTimeout(() => {
	        cbFnc(...args);
	      }, timeout);
	    };
	  }
	}

	class JumpMenu {
	  constructor() {
	    this.menus = document.querySelectorAll('[data-jump-menu]');
	    this.setEvent();
	  }
	  setEvent() {
	    this.menus.forEach(menu => {
	      menu.addEventListener('change', () => {
	        window.location = menu.value;
	      });
	    });
	  }
	}

	// Add your custom JS here.
	//import './gm';
	const careHomeResults = new CareHomeResults();
	new TypeSearch(careHomeResults.stage);
	new MapCareHomes();
	new ViewSwitch();
	new EmailCareer();
	new MenuCollapse(767); //767 represents the breakpoint to trigger the functionality
	new JumpMenu();
	document.addEventListener("DOMContentLoaded", function () {
	  AOS.init();
	  const navIcons = document.getElementById("nav-icon1");
	  const navMenu = document.querySelector(".burger-menu");
	  const burgerMenu = () => {
	    const mobMenu = document.querySelector(".mobile-menu");
	    document.querySelectorAll(".burger").forEach(function (icon) {
	      icon.classList.toggle("open");
	    });
	    mobMenu.classList.toggle("open");
	  };
	  navIcons.addEventListener("click", function () {
	    burgerMenu();
	  });
	  navMenu.addEventListener("click", function () {
	    burgerMenu();
	  });
	});

	exports.Alert = alert;
	exports.Button = button;
	exports.Carousel = carousel;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = modal;
	exports.Offcanvas = offcanvas;
	exports.Popover = popover;
	exports.Scrollspy = scrollspy;
	exports.Tab = tab;
	exports.Toast = toast;
	exports.Tooltip = tooltip;

}));
//# sourceMappingURL=child-theme.js.map
