import * as ReactDOM from 'react-dom';

import './global';

import {Scene} from './scene';


const scene = {
  tab: util.prop('repositories'),
  repositories: {
    namespace : util.prop(''),
    offset    : util.prop(0),
    total     : util.prop(1),
    form: {
      visible     : util.prop(false),
      namespace   : util.prop(''),
      name        : util.prop(''),
      isPrivate   : util.prop(false),
      description : util.prop('')
    }
  }
};


global.redraw = () => {
  ReactDOM.render(<Scene {...scene} />, document.querySelector('.stage'));
};


window.addEventListener('DOMContentLoaded', global.redraw);
