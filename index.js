"use strict";

exports.__esModule = true;
var subscribes = {};

/**
 * add listener 
 * @param {string} name 
 * @param {function} func 
 * @returns {function} unsubscribe function
 */
exports.on = function on(name, func) {
  if (typeof (func) !== 'function')
    throw ('on(' + name + ', ↴), Second argument is not function, please check');
  if (!subscribes[name])
    subscribes[name] = { count: 0, funcs: {} };

  const key = subscribes[name].count++;
  subscribes[name].funcs[key] = func;
  return function () {
    delete subscribes[name].funcs[key];
  };
};

/**
 * dispatch all listener 
 * @param {string} name 
 * @param {any} arg 
 * @returns {undefined} nothing
 */
exports.emit = function emit(name, arg) {
  if (subscribes[name])
    for (var func in subscribes[name].funcs)
      subscribes[name].funcs[func] && subscribes[name].funcs[func](arg);
};