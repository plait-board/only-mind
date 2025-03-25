import { Board, BoardChangeData, Wrapper } from '@drawnix/react-board';
import {
  PlaitBoard,
  PlaitBoardOptions,
  PlaitElement,
  PlaitPlugin,
  PlaitPointerType,
  PlaitTheme,
  Selection,
  ThemeColorMode,
  Viewport,
} from '@plait/core';
import React, { useEffect, useRef, useState } from 'react';
import { MindThemeColors, withMind } from '@plait/mind';
import { withDraw } from '@plait/draw';
import { withGroup } from '@plait/common';
import { DrawnixContext, DrawnixState } from './use-drawnix';

export type OnlyMindProps = {
  value: PlaitElement[];
  viewport?: Viewport;
  theme?: PlaitTheme;
  onChange?: (value: BoardChangeData) => void;
  onSelectionChange?: (selection: Selection | null) => void;
  onValueChange?: (value: PlaitElement[]) => void;
  onViewportChange?: (value: Viewport) => void;
  onThemeChange?: (value: ThemeColorMode) => void;
  afterInit?: (board: PlaitBoard) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const OnlyMind: React.FC<OnlyMindProps> = ({
  value,
  viewport,
  theme,
  onChange,
  onSelectionChange,
  onViewportChange,
  onThemeChange,
  onValueChange,
  afterInit,
}) => {
  const options: PlaitBoardOptions = {
    readonly: false,
    hideScrollbar: false,
    disabledScrollOnNonFocus: false,
    themeColors: MindThemeColors,
  };
  const plugins: PlaitPlugin[] = [withDraw, withGroup, withMind];
  // 添加一个 ref 来追踪组件是否已挂载
  const isMounted = useRef(false);

  const [appState, setAppState] = useState<DrawnixState>(() => {
    // TODO: need to consider how to maintenance the pointer state in future
    return {
      pointer: PlaitPointerType.hand,
      isPencilMode: false,
      openDialog: false,
    };
  });
  return (
    <Wrapper
      value={value}
      viewport={viewport}
      theme={theme}
      options={options}
      plugins={plugins}
      onChange={(data: BoardChangeData) => {
        onChange && onChange(data);
      }}
      onSelectionChange={onSelectionChange}
      onViewportChange={onViewportChange}
      onThemeChange={onThemeChange}
      onValueChange={onValueChange}
    >
      <Board afterInit={afterInit}></Board>
    </Wrapper>
  );
};
