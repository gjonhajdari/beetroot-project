import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../reducer'
import DevTools from '../components/common/DevTools'


const configureStore = preloadState => {
    const store = createStore(
            reducer,
            preloadState,
        compose (
            applyMiddleware(thunk)
            , DevTools.instrument()
        )
    )
    return store;
}

export default configureStore;
