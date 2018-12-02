import {omitBy} from 'lodash';

class Context {

  constructor () {
    this.listeners = [];
    this.elements = {};
    this.getters = {};
    this.triggerCache = {};
  }

  clear = () => {
    delete this.listeners;
    delete this.elements;
    delete this.getters;
    delete this.triggerCache;
  };

  addElement = (key, element) => {;
    this.elements[key] = element;
  };

  getElement = (key) => {
    return this.elements[key];
  };

  removeElement = (key) => {
    delete this.elements[key];
  };

  cleanElements = () => {
    this.elements = {};
  };

  setGetter = (name, func) => {
    this.getters[name] = func;
  };

  get = (name, ...args) => {
    const getter = this.getters[name];
    if (getter) {
      return this.getters[name](...args);
    }
    throw Error(`Context error: getter with ${name} name was not found.`);
  };

  addListener = (name, func) => {
    this.listeners.push({
      name,
      func: func
    });
  };

  removeListener = (name) => {
    const {triggerCache, listeners} = this;
    this.listeners = listeners.filter(i => i.name !== name);
    this.triggerCache = omitBy(triggerCache, (value, prop) => name.indexOf(prop) >= 0);
  };

  trigger = (name, ...args) => {
    const {triggerCache, listeners} = this;
    const foundListeners = triggerCache[name] || listeners.filter(i => i.name.indexOf(name) >= 0);
    if (foundListeners && foundListeners.length > 0) {
      foundListeners.forEach(listener => listener.func(...args));
      triggerCache[name] = foundListeners;
    }
  };

}

export default Context;
