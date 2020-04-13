import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../logo.svg';

import './hello.css';

class Hello extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/mensagem/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default Hello;