"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactNode } from "react";

export const DragDropWrapper = ({ children }: { children: ReactNode }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};
