import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux'
import App from '../App'

const  Root  = ({store}) => (
    <Provider store={store}>
        <div>
            <App />
        </div>
    </Provider>
)

export default Root