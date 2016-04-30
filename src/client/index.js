import * as ReactDOM from 'react-dom';

import './global';

import Scene from './scene';


const scene = {
  tab: util.prop('repositories')
};


global.redraw = () => {
  ReactDOM.render(<Scene model={scene} />, document.querySelector('.stage'));
};


window.addEventListener('DOMContentLoaded', global.redraw);
