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
    laps: [],
    lastLap: 0,
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
    this.lap = this.lap.bind(this);
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
      startTime: Date.now(),
      running: true,
      currentLap: 0
    });
    this._watchInterval = setInterval(this.tick.bind(this));
  }

  tick() {
    let time = this.state.startTime;
    if(this.state.laps.length > 0) {
      time = this.state.laps[this.state.currentLap - 1];
    }
    this.setState({
      currentTime: Date.now() - time
    });
  }

  stop() {
    clearInterval(this._watchInterval);
    this._watchInterval = null;
    this.setState({
      running: false
    });
  }

  lap() {
    
    this.setState({
      currentLap: this.state.currentLap++,
      laps: this.state.laps.push(Date.now())
    });
  }

  reset() {
    this.stop();
    this.setState({
      currentTime: 0,
      startTime: 0,
      currentLap: 0,
      laps: []
    });
  }

  onDelete() {
    this.props.onDelete();
  }

}

export default withRoot(withStyles(styles)(Stopwatch));
