import React, { Component } from 'react';
import './App.css';
import Stopwatch from './Stopwatch/Stopwatch';
import StopwatchForm from './StopwatchForm/StopwatchForm'

class App extends Component {
  state = {
    stopWatches: []
  }

  stopWatchID = 0;

  constructor(props, context) {
    super(props, context);

    this.addStopWatch = this.addStopWatch.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stopwatch App</h1>
        </header>
        { this.state.stopWatches.map((watch, idx) => 
          <Stopwatch  key={watch.key}
                      name={watch.name}
                      onDelete={this.removeStopWatch.bind(this, idx)} />
        )}
        <StopwatchForm onAddWatch={this.addStopWatch}/>
      </div>
    );
  }

  addStopWatch(name) {
    const id = this.stopWatchID++;
    this.state.stopWatches.push({
      key: parseInt(id),
      name: name
    });
    this.setState({
      stopWatches: this.state.stopWatches
    });
  }

  removeStopWatch(idx) {
    this.state.stopWatches.splice(idx, 1);
    this.setState({
      stopWatches: this.state.stopWatches
    });
  }
}

export default App;
