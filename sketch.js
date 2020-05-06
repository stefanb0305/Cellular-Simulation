// A Game of Life Simulation
// by Stefan Baumann

// Global functions
// Makes a grid with r rows and c columns with a random value (0 or 1)
function makeRandomGrid(r, c) {
    let arr = new Array(r);
    for (let i = 0; i < r; i++) {
        arr[i] = new Array(c);
        for (let j = 0; j < c; j++) {
            arr[i][j] = floor(random(2));
        }
    }
    return arr;
}
// Counts the nr of living cells around itself
function countLiveNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let ny = y+i;
            let nx = x+j;
            // Check that it's not out of bounds
            if (ny !== -1 && nx !== -1 && ny !== rows && nx !== cols) {
                sum += grid[ny][nx];
            }
        }
    }
    sum -= grid[y][x]
    return sum;
}
// Depending on the state of cell and nr of neighbors, we return next state
function getNextState(state, liveNg) {
    let nextState;
    if (state && (liveNg < 2 || liveNg > 3)) {
        // Current cell is alive and will die
        nextState = 0;
    }
    else if (!state && liveNg === 3) {
        // Current cell is not alive and will become alive
        nextState = 1;
    }
    else {
        // Don't change state
        nextState = state;
    }
    return nextState;
}


// Global vars
let grid;
let rows;
let cols;
let res = 10;

// Setup function
function setup() {
    createCanvas(600, 400);
    rows = height / res;
    cols = width / res;
    grid = makeRandomGrid(rows, cols);
}

// Draw function
function draw() {
    background(0);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * res;
            let y = i * res;
            if (grid[i][j]) {
                fill(255);
                stroke(255);
                rect(x, y, res, res);
            }
        }
    }

    let next = makeRandomGrid(rows, cols);

    // Compute next generation based on current grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let liveNg = countLiveNeighbors(j, i);
            let state = grid[i][j];
            next[i][j] = getNextState(state, liveNg);
        }
    }

    grid = next;

}
