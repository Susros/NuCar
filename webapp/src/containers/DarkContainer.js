/**
 * Container with dark backgroun
 * 
 * @author Kelvin Yin
 */

import React from 'react';

function DarkContainer(props) {
    return(
        <div className="bg-dark text-white w-100 h-100">
            { props.children }
        </div>
    );
}

export default DarkContainer;