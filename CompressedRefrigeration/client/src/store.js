import { createStore } from 'vuex'
import websocketstore from './modules/websocketsStore'
import streamStore from './modules/streamStore.js'
import dataStore from './modules/dataStore.js'
import uiStore from './modules/uiStore.js'
import commandStore from './modules/commandStore.js'
import loggingStore from './modules/logging.js'
import rawDataStore from './modules/rawDataStore.js'

const store = createStore({
    modules:{
      rawData: rawDataStore,
      // websockets:websocketstore,
      stream: streamStore,
      // data: dataStore,
      ui: uiStore,
      command: commandStore,
      logging: loggingStore,
    }
})

export default store