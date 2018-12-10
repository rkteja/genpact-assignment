import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import store from "./redux/store";

import { initializeIcons } from '@uifabric/icons';

import './index.scss';

import EmployeeDetails from './components/EmployeeDetails';

initializeIcons();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <EmployeeDetails />
  </Provider>,
  rootElement
);
