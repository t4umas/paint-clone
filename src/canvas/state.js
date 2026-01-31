export const BrushType = {
    BRUSH: 'brush',
    ERASER: 'eraser',
    FILL: 'fill' 
}

export const state = {
    isDrawing: false,
    x: 0,
    y: 0,
    brushType: BrushType.BRUSH,
    brushColor: '#00000',
    brushSize: 10,
}