import { useState } from 'react';
import { OnlyMind } from './only-mind';
import { PlaitElement, PlaitTheme, Viewport } from '@plait/core';
import { initializeData } from './initialize-data';

const LOCAL_DATA_KEY = 'only-mind-local-data';

import './../../../../node_modules/@plait/mind/styles/styles.scss';
import './../../../../node_modules/@plait-board/react-board/index.css';
import './../../../../node_modules/@plait-board/react-text/index.css';

export function App() {
  const [value, setValue] = useState<{
    children: PlaitElement[];
    viewport?: Viewport;
    theme?: PlaitTheme;
  }>(() => {
    return { children: initializeData };
  });
  return (
    <OnlyMind
      value={value.children}
      viewport={value.viewport}
      theme={value.theme}
      onChange={(value) => {
        localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(value));
      }}
      afterInit={(board) => {
        console.log('board initialized');
      }}
    ></OnlyMind>
  );
}

export default App;
