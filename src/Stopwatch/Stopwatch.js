import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import DeleteIcon from 'material-ui-icons/Delete';
import Typography from 'material-ui/Typography';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import 'dseg/css/dseg.css';
import './Stopwatch.css';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  }
});

export class Stopwatch extends Component {

  state = {
    startTime: 0,
    currentTime: 0,
    running: false
  };
  _watchInterval = null;

  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.start = this.start.bind(this);
    this.tick = this.tick.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    return (
      <div>
        <div className="Stopwatch">
          <Card className="card">
            <div className="details">
              <CardContent className="content">
              <Typography variant="headline">{ this.props.name }</Typography>
              <div className="controls">
                <Button color={!this.state.running ? "primary" : "secondary"} variant="raised" onClick={this.toggle}>{ !this.state.running ? 'Start' : 'Stop' }</Button>
                <Button onClick={this.reset}>Reset</Button>
              </div>
              </CardContent>
            </div>
            <CardContent className="time">
              <div className="time-value">{moment(this.state.currentTime).format('m:ss')}</div>
            </CardContent>
            <CardContent>
              <Button variant="fab" size="small" aria-label="delete" className="delete" onClick={this.onDelete}>
                <DeleteIcon />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  toggle() {
    if(!this.state.running) {
      this.start();
    }
    else {
      this.stop();
    }
  }

  start() {
    this.setState({
      startTime: this.state.startTime ? this.state.startTime : Date.now(),
      running: true,
    });
    this._watchInterval = setInterval(this.tick.bind(this));
  }

  tick() {
    let time = this.state.startTime;
    const nextTime = Date.now() - time;
    if(!this.state.running) {
      time = this.state.startTime + (nextTime - this.state.currentTime)
      this.setState({
        startTime: time,
        currentTime: this.state.currentTime
      })
    }
    else {
      this.setState({
        currentTime: nextTime
      });
    }
  }

  stop() {
    
    this.setState({
      running: false
    });
  }

  reset() {
    this.stop();
    this.setState({
      currentTime: 0,
      startTime: 0,
    });
    clearInterval(this._watchInterval);
    this._watchInterval = null;
  }

  onDelete() {
    this.props.onDelete();
  }

}

export default withRoot(withStyles(styles)(Stopwatch));
