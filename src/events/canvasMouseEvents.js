import {drawLine, clearLine, fillFromPoint} from '../canvas/draw';
import { state, BrushType } from '../canvas/state';

function handlePenAction(ctx, e) {
    switch(state.brushType) {
        case BrushType.BRUSH:
            drawLine(ctx, state.x, state.y, e.offsetX, e.offsetY);
            break;
        case BrushType.ERASER:
            clearLine(ctx, state.x, state.y, e.offsetX, e.offsetY)
            break;

    }
}

export function registerCanvasMouseEvents(canvas, ctx) {
    const handleDrawing = (e) => {
        if(state.isDrawing) {
            handlePenAction(ctx, e);
            state.x = e.offsetX;
            state.y = e.offsetY;
        }
    };
    
    const endDrawing = (e) => {
        if (!state.isDrawing) return;

        handlePenAction(ctx, e);
        state.isDrawing = false; //stop drawing
    }
    
    canvas.addEventListener('mousedown', (e) => {
        state.isDrawing = true; //start drawing because mouse is down
        if(state.brushType === BrushType.FILL) {
            fillFromPoint(ctx, e.offsetX, e.offsetY)
        }
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
