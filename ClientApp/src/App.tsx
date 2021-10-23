import React from 'react';

import './App.less';
import GameCard from './components/Card/GameCard';


function App() {
  return (
    <div style={{ margin: 64 }}>
      <GameCard imgSrc="/placeholder2.jpg" w={200} h={315} />
    </div>
  );
}

export default App;
