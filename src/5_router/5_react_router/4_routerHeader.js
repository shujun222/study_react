import React from 'react';
import {withRouter} from 'react-router-dom';

function Header(props) {
    const { goBack, goForward } = props.history || {};
    return (
        <div>
            <h1>React Router Demo</h1>
            <button onClick={goForward}>前进</button>
            &nbsp;
            <button onClick={goBack}>后退</button>
            <hr />
        </div>
    )
};

export default withRouter(Header);