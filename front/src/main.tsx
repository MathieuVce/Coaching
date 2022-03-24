import ReactDOM from 'react-dom'
import React from 'react'
import './assets/index.css'
import Navigation from "./navigation/Navigation";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.TOP_RIGHT,
  timeout: 6000,
  offset: '10px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <Navigation/>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
