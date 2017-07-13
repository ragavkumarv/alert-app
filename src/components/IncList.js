/**
 * Created by Ark on 7/13/2017.
 */
import React, { Component } from 'react';
import Inc from "./Inc";

class IncList extends Component {
    render() {
        const alerts = this.props.alerts;
        return (
            <section id="hello-world">
        {Object.keys(alerts).map((keyName, keyIndex) => {
            return <Inc gp={keyName} incs={alerts[keyName]} />;
        })}
      </section>
        );
    }
}

export default IncList;