// The canvas is a large fixed-size surface; node positions in content data
// are offsets from its center, so adding a section never requires resizing
// this surface unless a node lands outside it.
export const CANVAS_SIZE = { width: 8000, height: 6000 };

export const CANVAS_CENTER = {
  x: CANVAS_SIZE.width / 2,
  y: CANVAS_SIZE.height / 2,
};
