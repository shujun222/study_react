import React from 'react';
import {withRouter} from 'react-router-dom';

function Header(props) {
    const { goBack, goForward } = props.history || {};
    return (
        <div>
            <h1>React Router Demo</h1>
            <button onClick={goForward}>εθΏ</button>
            &nbsp;
            <button onClick={goBack}>ει</button>
            <hr />
        </div>
    )
};

export default withRouter(Header);