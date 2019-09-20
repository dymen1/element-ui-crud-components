import {createDecorator} from 'vue-class-component';
import {mapGetters} from 'vuex';

function createBindingHelper(bindTo, mapFn) {
  function wrapper(getterName, getterFunction, filter) {
    return function() {
      let data = getterFunction.call(this);
      if (data instanceof String) {
        return this.$t(data);
      }
      if (data instanceof Array) {
        if (typeof filter !== 'function') {
          return data.map(value => this.$t(value))
        }
        return data.map(value => filter(this.$t, value));
      }
      throw Error('\'' + getterName + '\' didn\'t return a String or Array');
    };
  }

  function makeDecorator(map, namespace, filter) {
    return createDecorator(function(componentOptions, key) {
      if (!componentOptions[bindTo]) {
        componentOptions[bindTo] = {};
      }
      let mapObject = (_a = {}, _a[key] = map, _a);
      componentOptions[bindTo][key] = namespace !== undefined
        ? wrapper(map, mapFn(namespace, mapObject)[key], filter)
        : wrapper(map, mapFn(mapObject)[key], filter);
      let _a;
    });
  }

  function helper(a, b) {
    if (typeof b === 'string') {
      let key = b;
      return makeDecorator(key, undefined)(a, key);
    }
    let namespace = extractNamespace(b);
    return makeDecorator(a, namespace, b);
  }

  return helper;
}

function extractNamespace(options) {
  let n = options && options.namespace;
  if (typeof n !== 'string') {
    return undefined;
  }
  if (n[n.length - 1] !== '/') {
    return n + '/';
  }
  return n;
}

export default createBindingHelper('computed', mapGetters);
