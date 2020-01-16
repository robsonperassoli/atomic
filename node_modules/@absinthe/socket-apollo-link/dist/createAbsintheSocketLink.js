import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';
import { ApolloLink } from 'apollo-link';
import { send, toObservable, unobserveOrCancel } from '@absinthe/socket';
import { compose } from 'flow-static-land/lib/Fun';
import { print } from 'graphql';

var _this = undefined;

var unobserveOrCancelIfNeeded = function unobserveOrCancelIfNeeded(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this);

  if (notifier && observer) {
    unobserveOrCancel(absintheSocket, notifier, observer);
  }
}.bind(undefined);

var notifierToObservable = function notifierToObservable(absintheSocket, onError, onStart) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return function (notifier) {
    _newArrowCheck(this, _this2);

    return toObservable(absintheSocket, notifier, {
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
    operation: print(query),
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

  return new ApolloLink(compose(notifierToObservable(absintheSocket, onError, onStart), function (request) {
    _newArrowCheck(this, _this3);

    return send(absintheSocket, request);
  }.bind(this), getRequest));
}.bind(undefined);

export default createAbsintheSocketLink;
//# sourceMappingURL=createAbsintheSocketLink.js.map
