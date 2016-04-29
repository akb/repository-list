import * as ReactDOM from 'react-dom';

import './global';

import Scene from './scene';


const scene = {
  tab: util.prop('repositories'),
  repositories: {
  }
};


function redraw() {
  ReactDOM.render(<Scene model={scene} />, document.querySelector('.stage'))
}

global.redraw = redraw;


window.addEventListener('DOMContentLoaded', redraw);
