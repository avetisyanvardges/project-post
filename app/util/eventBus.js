import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();
const listen = (eventName, callback) => {
  eventEmitter.on(eventName, callback);
};
const listenOnce = (eventName, callback) => {
  eventEmitter.once(eventName, callback);
};
const remove = (eventName, callback) => {
  eventEmitter.removeListener(eventName, callback);
};
const emit = (eventName, payload) => {
  eventEmitter.emit(eventName, payload);
};
export const EventBus = {
  listen,
  listenOnce,
  remove,
  emit,
};
