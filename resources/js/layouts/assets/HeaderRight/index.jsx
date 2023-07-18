import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import User from './User';

const HeaderRight = ({ dispatch, app_token }) => {
    return (
        <>
            {/* <HeaderLanguage dispatch={dispatch} lang={lang} /> */}

            {/* <HeaderNotification /> */}

            <User dispatch={dispatch} token={app_token} />
        </>
    );
};

const mapStateToProps = ({ app }) => {
    return {
        // app_lang: app.app_lang,
        app_token: app.app_token,
    };
};

HeaderRight.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app_token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(HeaderRight);
