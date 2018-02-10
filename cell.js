function Cell(i, j, w) {
    this.revealed = false;
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = this.i * this.w;
    this.y = this.j * this.w;
    this.neighborCount;
    this.mine = false;


    this.show = () => {
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);

        if (this.revealed) {
            if (this.mine) {
                fill(127);
                ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            } else {
                fill(200);
                rect(this.x, this.y, this.w, this.w);
                if (this.neighborCount > 0) {
                    textAlign(CENTER);
                    fill(0);
                    text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.8);
                }
            }
        }
    }

    this.contains = (x, y) => {
        return (x > this.x && x < this.x + this.w) && (y > this.y && y < this.y + this.w);
    }

    this.reveal = () => {
        this.revealed = true;

        if (this.neighborCount == 0) {
            this.floodFill();
        }
    }

    this.floodFill = () => {
        for (let xOff = -1; xOff <= 1; xOff++) {
            for (let yOff = -1; yOff <= 1; yOff++) {
                let i = this.i + xOff;
                let j = this.j + yOff;
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    var neighbor = grid[i][j];
                    if (!neighbor.mine && neighbor.revealed == false) {
                        neighbor.reveal();
                    }
                }
            }
        }
    }

    this.countMines = () => {
        if (this.mine) {
            this.neighborCount = -1;
            return;
        }

        let total = 0;

        for (let xOff = -1; xOff <= 1; xOff++) {
            for (let yOff = -1; yOff <= 1; yOff++) {
                let i = this.i + xOff;
                let j = this.j + yOff;
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    var neighbor = grid[i][j];
                    if (neighbor.mine) {
                        total++;
                    }
                }
            }
        }

        this.neighborCount = total;
    }
}