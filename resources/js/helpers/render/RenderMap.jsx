import React from 'react';
import PropTypes from 'prop-types';

const RenderMap = ({ data = [], render }) => {
    return (
        <>
            {data.map((value, idx) => {
                return render(value, idx);
            })}
        </>
    );
};

RenderMap.propTypes = {
    data: PropTypes.array.isRequired,
    render: PropTypes.func.isRequired,
};

export default RenderMap;
