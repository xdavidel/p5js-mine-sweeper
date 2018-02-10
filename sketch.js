var grid;
var cols;
var rows;
var w = 20;
var totalMines = 20;

function setup() {
    createCanvas(201, 201);
    cols = Math.floor(width / w);
    rows = Math.floor(height / w);

    grid = create2dArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    for (let n = 0; n < totalMines;) {
        let i = floor(random(cols));
        let j = floor(random(rows));

        if (!grid[i][j].mine) {
            grid[i][j].mine = true;
            n++;
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countMines();
        }
    }

}

function draw() {
    background(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function gameOver() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].reveal();
        }
    }
}

function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contains(mouseX, mouseY)) {
                grid[i][j].reveal();

                if (grid[i][j].mine) {
                    gameOver();
                }
            }
        }
    }
}

function create2dArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}