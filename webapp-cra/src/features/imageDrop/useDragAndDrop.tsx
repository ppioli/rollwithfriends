import React, { useCallback, useRef, useState } from "react";

const validFiles = ["image/png", "image/jpeg"];

export interface DragEndEvent {
  confirmed: boolean;
  event: React.DragEvent<any>;
}

export interface UseDropOpts {
  onDragStart: () => void;
  onDragEnd: (event: DragEndEvent) => void;
}

export function useDragAndDrop({
  onDragStart: dsCallback,
  onDragEnd,
}: UseDropOpts) {
  // Workaround react recreating the div with the listener on each render
}
