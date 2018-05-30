import React, { Component } from 'react';
import './App.css';

import KnowledgeBlock from './knowledgeBlock/index';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <KnowledgeBlock />
      </div>
    );
  }
}
