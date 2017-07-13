/**
 * Created by Ark on 7/13/2017.
 */
import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class InputForm extends Component {
    constructor(props) {
        super(props);
        // bind onSubmit and onInput
        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
        // init state
        this.state = {
            input: ""
        };
    }
    // input change handler
    onInput(e) {
        this.setState({
            input: e.target.value
        });
    }
    // submit handler
    onSubmit() {
        console.log("new", this.state.input);
        this.props.onSubmit(this.state.input);
    }
    render() {
        return (
            <section>
        <textarea
            // use value and onChange so it will be a controlled component
            value={this.state.value}
            onChange={this.onInput}
            type="text"
        />
        {/*<RaisedButton label="Primary" primary={true} onClick={this.onSubmit} />*/}
        {/*<button label="Primary" primary={true} onClick={this.onSubmit}>*/}
            {/*submit*/}
        {/*</button>*/}
        <MuiThemeProvider>
        <RaisedButton label="Alerts!" onClick={this.onSubmit} />

      </MuiThemeProvider>
                </section>
        );
    }
}

export default InputForm;