import Component from 'vue-class-component';
import {Action, Getter, Mutation, namespace, State} from 'vuex-class';
import GetterTranslator from './getterTranslatorDecorator';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'asyncData',
  'fetch',
  'middleware',
  'layout',
  'transition',
  'scrollToTop',
]);

export {Component as default, State, Getter, Action, Mutation, namespace, GetterTranslator};
