import React, { Component } from 'react';
import './App.css';

import KnowledgeBlock from './knowledgeBlock/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <KnowledgeBlock />
      </div>
    );
  }
}

export default App;
