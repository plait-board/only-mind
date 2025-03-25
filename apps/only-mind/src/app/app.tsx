import { useState } from 'react';
import { OnlyMind } from './only-mind';
import { PlaitBoard, PlaitElement, PlaitTheme, Viewport } from '@plait/core';
import { initializeData } from './initialize-data';
import { Drawnix } from '@drawnix/drawnix';
const LOCAL_DATA_KEY = 'only-mind-local-data';

import "./../../../../node_modules/@drawnix/drawnix/index.css";
import "./../../../../node_modules/@drawnix/react-board/index.css";
import "./../../../../node_modules/@drawnix/react-text/index.css";

export function App() {
  const [value, setValue] = useState<{
    children: PlaitElement[];
    viewport?: Viewport;
    theme?: PlaitTheme;
  }>(() => {
    const localData = localStorage.getItem(LOCAL_DATA_KEY);
    if (localData) {
      return JSON.parse(localData);
    }
    return { children: initializeData };
  });
  return (
    // <OnlyMind
    //   value={value.children}
    //   viewport={value.viewport}
    //   theme={value.theme}
    //   onChange={(value) => {
    //     localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(value));
    //   }}
    //   afterInit={(board) => {
    //     console.log('board initialized');
    //   }}
    // ></OnlyMind>
    <Drawnix
        value={value.children}
        viewport={value.viewport}
        theme={value.theme}
        onChange={(value) => {
          // localStorage.setItem(DRAWNIX_LOCAL_DATA_KEY, JSON.stringify(value));
        }}
        afterInit={(board) => {
          console.log('board initialized');
          console.log(
            `add __drawnix__web__debug_log to window, so you can call add log anywhere, like: window.__drawnix__web__console('some thing')`
          );
          (window as any)['__drawnix__web__console'] = (value: string) => {
            // addDebugLog(board, value);
          };
        }}
      ></Drawnix>
  );
}

export default App;
