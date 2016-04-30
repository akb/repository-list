import * as ReactDOM from 'react-dom';

import './global';

import Scene from './scene';


const scene = {
  tab: util.prop('repositories'),
  repositories: {
    namespace: util.prop('')
  }
};


global.redraw = () => {
  ReactDOM.render(<Scene {...scene} />, document.querySelector('.stage'));
};


window.addEventListener('DOMContentLoaded', global.redraw);
