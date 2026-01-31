import {drawLine} from '../canvas/draw';
import { state } from '../canvas/state';

export function registerCanvasMouseEvents(canvas, ctx) {
    const handleDrawing = (e) => {
        if(state.isDrawing) {
            drawLine(ctx, state.x, state.y, e.offsetX, e.offsetY);
            state.x = e.offsetX;
            state.y = e.offsetY;
        }
    };
    
    const endDrawing = (e) => {
        if (!state.isDrawing) return;
        drawLine(ctx, state.x, state.y, e.offsetX, e.offsetY);
        state.isDrawing = false; //stop drawing
    }
    
    canvas.addEventListener('mousedown', (e) => {
        state.isDrawing = true; //start drawing because mouse is down
        state.x = e.offsetX;
        state.y = e.offsetY;
    });
    canvas.addEventListener('mouseenter', (e) => {
        if(e.buttons !== 1) return;
        state.isDrawing = true;
        state.x = e.offsetX;
        state.y = e.offsetY;
    })
    
    //moving
    canvas.addEventListener('mousemove', handleDrawing);
    
    //finishing drawing
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseleave', endDrawing);
}
