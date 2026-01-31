import { initCanvas, resizeCanva } from "./canvas/setup";
import { state } from "./canvas/state";
import { registerCanvasMouseEvents } from "./events/canvasMouseEvents";

// --- Getting all elements ---
//canvas
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

//brush size
const brushSizeSlider = document.getElementById('brush-size');
state.brushSize = brushSizeSlider.value;
brushSizeSlider.oninput = (event) => {
    state.brushSize = brushSizeSlider.value; 
}

window.addEventListener('load', () => initCanvas(canvas));
window.addEventListener('resize',() => resizeCanva(canvas, ctx));

registerCanvasMouseEvents(canvas, ctx);