'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.function.bind');
var _newArrowCheck = _interopDefault(require('@babel/runtime/helpers/newArrowCheck'));
var apolloLink = require('apollo-link');
var socket = require('@absinthe/socket');
var Fun = require('flow-static-land/lib/Fun');
var graphql = require('graphql');

var _this = undefined;

var unobserveOrCancelIfNeeded = function unobserveOrCancelIfNeeded(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this);

  if (notifier && observer) {
    socket.unobserveOrCancel(absintheSocket, notifier, observer);
  }
}.bind(undefined);

var notifierToObservable = function notifierToObservable(absintheSocket, onError, onStart) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return function (notifier) {
    _newArrowCheck(this, _this2);

    return socket.toObservable(absintheSocket, notifier, {
      onError: onError,
      onStart: onStart,
      unsubscribe: unobserveOrCancelIfNeeded
    });
  }.bind(this);
}.bind(undefined);

var getRequest = function getRequest(_ref) {
  var query = _ref.query,
      variables = _ref.variables;

  _newArrowCheck(this, _this);

  return {
    operation: graphql.print(query),
    variables: variables
  };
}.bind(undefined);
/**
 * Creates a terminating ApolloLink to request operations using given
 * AbsintheSocket instance
 */


var createAbsintheSocketLink = function createAbsintheSocketLink(absintheSocket, onError, onStart) {
  var _this3 = this;

  _newArrowCheck(this, _this);

  return new apolloLink.ApolloLink(Fun.compose(notifierToObservable(absintheSocket, onError, onStart), function (request) {
    _newArrowCheck(this, _this3);

    return socket.send(absintheSocket, request);
  }.bind(this), getRequest));
}.bind(undefined);

module.exports = createAbsintheSocketLink;
//# sourceMappingURL=createAbsintheSocketLink.js.map
