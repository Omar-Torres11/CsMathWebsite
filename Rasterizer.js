const Cw = 500, Ch = 500;
const Vw = 1, Vh = 1;
const d = 1;

// Creating a canvas element
const canvas = document.createElement('canvas');
canvas.width = Cw;
canvas.height = Ch;
document.body.appendChild(canvas);

// Getting the canvas context
const ctx = canvas.getContext('2d');

// Function to swap two points
function swap(point0, point1) {
    return [point1, point0];
}

// Function to draw a line
function drawLine(P0, P1, color) {
    let x0 = P0[0], x1 = P1[0], y0 = P0[1], y1 = P1[1];
    
    // Helper function to interpolate values
    function interpolate(i0, d0, i1, d1) {
        if (i0 === i1) {
            return [d0];
        }
        
        const values = [];
        const a = (d1 - d0) / (i1 - i0);
        let d = d0;
        
        for (let i = Math.floor(i0); i < Math.floor(i1); i++) {
            values.push(d);
            d += a;
        }
        
        return values;
    }
    
    if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) {
        // Line is horizontal-ish
        if (x0 > x1) {
            [P0, P1] = swap(P0, P1);
            [x0, x1, y0, y1] = [P0[0], P1[0], P0[1], P1[1]];
        }
        
        const ys = interpolate(x0, y0, x1, y1);
        for (let x = Math.floor(x0); x < Math.floor(x1); x++) {
            putPixel(x, ys[x - Math.floor(x0)], color);
        }
    } else {
        // Line is vertical-ish
        if (y0 > y1) {
            [P0, P1] = swap(P0, P1);
            [x0, x1, y0, y1] = [P0[0], P1[0], P0[1], P1[1]];
        }
        
        const xs = interpolate(y0, x0, y1, x1);
        for (let y = Math.floor(y0); y < Math.floor(y1); y++) {
            putPixel(xs[y - Math.floor(y0)], y, color);
        }
    }
}

// Function to put a pixel on the canvas
function putPixel(x, y, color) {
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.fillRect(Cw / 2 + x, Ch / 2 - y - 1, 1, 1);
}

// Function to project vertex
function projectVertex(v) {
    return [(v[0] * d) / v[2], (v[1] * d) / v[2]];
}

function main() {
    const RED = [255, 0, 0];
    const GREEN = [0, 255, 0];
    const BLUE = [0, 0, 255];
    
    // The four "front" vertices
    const vAf = [-2, -0.5, 5];
    const vBf = [-2, 0.5, 5];
    const vCf = [-1, 0.5, 5];
    const vDf = [-1, -0.5, 5];

    // The four "back" vertices
    const vAb = [-2, -0.5, 6];
    const vBb = [-2, 0.5, 6];
    const vCb = [-1, 0.5, 6];
    const vDb = [-1, -0.5, 6];

    // The front face
    drawLine(projectVertex(vAf), projectVertex(vBf), BLUE);
    drawLine(projectVertex(vBf), projectVertex(vCf), BLUE);
    drawLine(projectVertex(vCf), projectVertex(vDf), BLUE);
    drawLine(projectVertex(vDf), projectVertex(vAf), BLUE);

    // The back face
    drawLine(projectVertex(vAb), projectVertex(vBb), RED);
    drawLine(projectVertex(vBb), projectVertex(vCb), RED);
    drawLine(projectVertex(vCb), projectVertex(vDb), RED);
    drawLine(projectVertex(vDb), projectVertex(vAb), RED);

    // The front-to-back edges
    drawLine(projectVertex(vAf), projectVertex(vAb), GREEN);
    drawLine(projectVertex(vBf), projectVertex(vBb), GREEN);
    drawLine(projectVertex(vCf), projectVertex(vCb), GREEN);
    drawLine(projectVertex(vDf), projectVertex(vDb), GREEN);
}

main();