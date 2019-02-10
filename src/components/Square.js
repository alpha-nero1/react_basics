import React from 'react'

export default function Square (props) {
    // If no need to track state do not include constructor.

    // We sent in onClick from parent as a prop so we can make changes in parent ~state
    return (
        <button onClick={ props.onClick } 
                className="square"
        >
            {props.value}
        </button>
    )
}