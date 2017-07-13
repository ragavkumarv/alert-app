/**
 * Created by Ark on 7/13/2017.
 */
import React, { Component } from 'react';

class Inc extends React.Component {
    render() {
        const { gp, incs } = this.props;
        // log(IncsByGroup)
        console.log(incs);
        return (
            <div>
        <h2>{gp}</h2>
        <ul>
          {incs.map(inc => <li>{inc}</li>)}
        </ul>
      </div>
        );
    }
}

export default Inc;