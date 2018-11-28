import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const { ipcRenderer, shell } = electron;
const { dialog } = electron.remote;

import MainWindow from './mainWindow';

let mainWndComponent = ReactDOM.render(<MainWindow />, document.querySelector('#content'));