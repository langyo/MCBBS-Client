import React from 'react';
import ReactDOM from 'react-dom';

import MainWindow from './mainWindow';

try {
    let mainWndComponent = ReactDOM.render(<MainWindow />, document.querySelector('#content'));
} catch (e) {
    console.log(e);
}