import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../reducer'

const configureStore = preloadState => {
    const store = createStore(
        reducer,
        preloadState,
        applyMiddleware(thunk, logger)
    )
    return store;
}

export default configureStore;
