import { initCanvas, resizeCanva } from "./canvas/setup";
import { registerCanvasMouseEvents } from "./events/canvasMouseEvents";

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

window.addEventListener('load', () => initCanvas(canvas));
window.addEventListener('resize',() => resizeCanva(canvas, ctx));

registerCanvasMouseEvents(canvas, ctx);

