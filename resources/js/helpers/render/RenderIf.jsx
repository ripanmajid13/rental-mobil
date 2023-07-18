import React from 'react';

const RenderIf = ({children, isTrue}) => {
    return <>{isTrue === true ? children : null}</>;
};

export default RenderIf;
