export const initCanvas = (canvas) => {
    canvas.width = canvas.offsetWidth; //match the css
    canvas.height = canvas.offsetHeight;
};

// remove image and resize the canva
export const resizeCanva = (canvas, ctx) => {
    const image = ctx.getImageData(0,0,canvas.width, canvas.height);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.putImageData(image, 0, 0);
};