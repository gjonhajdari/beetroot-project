import React  from 'react';
import PropTypes from 'prop-types';
import {Icon, Segment} from 'semantic-ui-react'

const Spinner = ({size}) => (
    <Segment basic textAlign="center">
        <Icon size={size} loading name="spinner" />
    </Segment>
    )

Spinner.propTypes = {
    size: PropTypes.string.isRequired,
};
Spinner.defaultProps = {
    size: 'huge'
}



export default Spinner
