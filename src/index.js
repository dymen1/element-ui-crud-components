import List from '../packages/list/index.js';
import Form from '../packages/form/index.js';

const components = [
  List,
  Form,
];

const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
  List,
  Form,
};
