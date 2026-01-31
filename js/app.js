const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let x = 0;
let y = 0;

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}

const init = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

};

// remove image and resize the canva
const resizeCanva = () => {
    const image = ctx.getImageData(0,0,canvas.width, canvas.height);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.putImageData(image, 0, 0);
};

window.addEventListener('load', init);
window.addEventListener('resize', resizeCanva);

const handleDrawing = (e) => {
    if(isDrawing) {
        drawLine(ctx, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
};

const endDrawing = (e) => {
    if (!isDrawing) return;
    drawLine(ctx, x, y, e.offsetX, e.offsetY);
    isDrawing = false; //stop drawing
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true; //start drawing because mouse is down
    x = e.offsetX;
    y = e.offsetY;
});
canvas.addEventListener('mouseenter', (e) => {
    if(e.buttons !== 1) return;
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
})

//moving
canvas.addEventListener('mousemove', handleDrawing);

//finishing drawing
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseleave', endDrawing);