import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {inClean,incsByGroup} from './functions/fun'

import InputForm from "./components/InputForm";
import IncList from "./components/IncList";

class App extends Component {
    constructor() {
        super();
        this.state = {
            alerts: {}
        };

        // bind addTodo once in constructor
        this.addTodo = this.addTodo.bind(this);
    }
    // addTodo will receive the needed value without refs
    addTodo(alerts) {
        // console.log("match",match(/\w.+\n/g)(alerts))
        const InClean = inClean(alerts);
        const IncsByGroup = incsByGroup(InClean);
        // console.log("reached", InClean);
        this.setState({ alerts: IncsByGroup });
    }
    render() {
        return (
                <section>
              <InputForm onSubmit={this.addTodo} />
              <IncList alerts={this.state.alerts} />
            </section>
        );
    }
}

export default App;
