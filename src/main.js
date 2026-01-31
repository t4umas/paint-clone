import { initCanvas, resizeCanva } from "./canvas/setup";
import { state, BrushType } from "./canvas/state";
import { registerCanvasMouseEvents } from "./events/canvasMouseEvents";

//canvas
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
window.addEventListener('load', () => initCanvas(canvas));
window.addEventListener('resize',() => resizeCanva(canvas, ctx));
registerCanvasMouseEvents(canvas, ctx);


//tools
const [brushButton, eraserButton, fillButton ] = document.querySelectorAll('.tool-button')
const tools = [brushButton, eraserButton, fillButton];
const selectBrush = (brush) => {
    state.brushType = brush;
    tools.forEach((tool) => {
        if (tool.id === brush) {
            tool.classList.add('active');
        } else {
            tool.classList.remove('active');
        }
    });
}
brushButton.addEventListener('click', () => selectBrush(BrushType.BRUSH));
eraserButton.addEventListener('click', () => selectBrush(BrushType.ERASER));
fillButton.addEventListener('click', () => selectBrush(BrushType.FILL));

//brush color
const brushColorPicker = document.getElementById('color-picker');
state.brushColor = brushColorPicker.value;
brushColorPicker.addEventListener('input', () => {
    state.brushColor = brushColorPicker.value;
})

//brush size
const brushSizeSlider = document.getElementById('brush-size');
state.brushSize = brushSizeSlider.value = 10.5;
brushSizeSlider.oninput = (event) => {
    state.brushSize = brushSizeSlider.value; 
}

//action
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
