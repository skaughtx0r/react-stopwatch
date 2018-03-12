import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import './StopwatchForm.css';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  }
});

export class StopwatchForm extends Component {

  state = {
    formVisible: false,
    watchName: ""
  }

  constructor(props, context) {
    super(props, context);

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.addStopWatch = this.addStopWatch.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  render() {
    return (
      <div>
        <div className="StopwatchForm">
          <Card className="card">
            <div className="details">
              { !this.state.formVisible && (
                <CardContent className="content">
                  <div className="controls">
                    <Button color="primary" variant="raised" onClick={this.showForm}>Add Stopwatch</Button>
                  </div>
                </CardContent>
              )}
              { this.state.formVisible && (
                <CardContent className="content">
                  <form onSubmit={this.addStopWatch} onKeyDown={this.cancel}>
                    <TextField
                      inputRef={(input) => { this.nameInput = input; }}
                      placeholder="Enter Stopwatch Title"
                      label="Stopwatch Title"
                      value={this.state.watchName}
                      onChange={this.nameChanged}
                      />
                    <div className="controls">
                      <Button type="submit" color="primary" variant="raised">Submit</Button>
                      <Button onClick={this.hideForm}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  addStopWatch(event) {
    this.props.onAddWatch(this.state.watchName);
    this.hideForm();
    event.preventDefault();
  }

  cancel(event) {
    if(event.keyCode === 27) {
      this.hideForm();
    }
  }

  nameChanged(event) {
    this.setState({
      watchName: event.target.value
    });
  }

  showForm() {
    this.setState({
      formVisible: true
    });
    setTimeout(() => {
      this.nameInput.focus();
    }, 10);
  }

  hideForm() {
    this.setState({
      formVisible: false,
      watchName: ""
    });
  }

}

export default withRoot(withStyles(styles)(StopwatchForm));
