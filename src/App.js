import React from 'react';

import LoanProducts from './components/LoanProducts';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoanProducts />
      </header>
    </div>
  );
}

export default App;
