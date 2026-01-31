import { state } from "./state";

export const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = state.brushColor;
    ctx.lineWidth = state.brushSize;
    ctx.stroke();
}

export const clearLine = (ctx, x1, y1, x2, y2) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export const fillFromPoint = (ctx, x, y) => {
    const {width, height} = ctx.canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    
    const getIndex = (x, y) => (y * width + x) * 4;
    
    function getColorAt(x, y) {
        const i = getIndex(x, y);
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        return [r,g,b,a];
    }
    
    const r = parseInt(state.brushColor.slice(1,3), 16);
    const g = parseInt(state.brushColor.slice(3,5), 16);
    const b = parseInt(state.brushColor.slice(5,7), 16);
    const fillColor = [r, g, b];
    
    const fillPixelAt = (x, y) => {
        const i = getIndex(x, y);
        data[i]     = fillColor[0]; // R
        data[i + 1] = fillColor[1]; // G
        data[i + 2] = fillColor[2]; // B
        data[i + 3] = 255; // Alpha
    }
    
    const tolerance = 5;
    const sameColor = (c1, c2) =>
        Math.abs(c1[0] - c2[0]) < tolerance &&
        Math.abs(c1[1] - c2[1]) < tolerance &&
        Math.abs(c1[2] - c2[2]) < tolerance;
    
    const isInside = (x, y) =>
        x>=0 && y>=0 && x<width && y<height;
    
    const visited = new Uint8Array(width * height);
    const isVisited = (x, y) => {
        const idx = y * width + x;
        
        
        if (visited[idx]) return true;
        visited[idx] = 1;
        return false;
    }
    
    
    const toFillColor = getColorAt(x,y);
    const stack =  [[x,y]];
    
    while(stack.length) {
        const [cx, cy] = stack.pop()
        if(isVisited(cx, cy)) continue;
        if(!isInside(cx, cy)) continue;

        const color = getColorAt(cx,cy);
        if(!sameColor(color, toFillColor)) continue;
        
        fillPixelAt(cx, cy);
        stack.push(
            [cx, cy + 1], //top
            [cx + 1, cy + 1], //top rigth
            [cx + 1,  cy], //rigth
            [cx + 1, cy - 1], // down rigth
            [cx, cy - 1], //down
            [cx - 1, cy - 1], //down left
            [cx - 1, cy], //left
            [cx - 1, cy + 1], //top left
        );
    }

    ctx.putImageData(imageData, 0, 0);
}
