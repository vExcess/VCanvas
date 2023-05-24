const fs = require("fs");
const VCanvas = require("./VCanvas");

// CONNECT CODECS TO VCANVAS
// https://github.com/jpeg-js/jpeg-js
{
    const JPEG_CODEC = require("pngjs").PNG;
    VCanvas.JPEG = {
        encode(imgData, quality) {
            return JPEG_CODEC.encode(imgData, quality).data;
        }
    };
}
// https://github.com/pngjs/pngjs
{
    const PNG_CODEC = require("pngjs").PNG;
    VCanvas.PNG = {
        encode(imgData) {
            let png = new PNG_CODEC({ width: imgData.width, height: imgData.height });
            png.data.set(imgData.data);
            return PNG_CODEC.sync.write(png);
        }
    };
}

let canvas = new VCanvas(400, 400);
let ctx = canvas.getContext("2d");

// const font = Processing.utils.opentype.loadSync('./arial.ttf');
// console.log(font.getPath("Hello World!", -4, 72, 72))

ctx.fillStyle = "RGB(255,0,0)";
ctx.strokeStyle = "GREEN";
ctx.lineWidth = 10;
ctx.strokeRect(75, 140, 150, 110);
ctx.fillRect(130, 190, 40, 60);

let base64Data = canvas.toDataURL("png").split(",")[1];
fs.writeFile("./img.png", base64Data, "base64", () => {
    console.log("Image Rendered");
});
