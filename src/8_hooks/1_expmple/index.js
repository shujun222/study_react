import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './3_useRef';

import { initStateIndex } from '../2_sources/1_useState'

const root = ReactDOM.createRoot(document.getElementById('root'));

export function render() {
    root.render(<App />);

    initStateIndex()
}
render()