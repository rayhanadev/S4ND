class WaterParticle {
    constructor(xval, yval) {
        this.x = xval;
        this.y = yval;

        this.stoppedStrikes = 0;
    }

    fall() {
        if (this.stoppedStrikes > 30) {
            if (this.y >= height - 11) {
                return;
            }

            if (system.board[this.y + 5][this.x] == undefined) {
                this.stoppedStrikes = 0;
            } else if (system.board[this.y][this.x + 5] == undefined) {
                this.x += 5;
                this.stoppedStrikes = 0;
            } else if (system.board[this.y][this.x - 5] == undefined) {
                this.x -= 5;
                this.stoppedStrikes = 0;
            } else {
                return;
            }
        }

        let collisionCode = system.collided(this.x, this.y);

        if (collisionCode == 1) {
            let below = system.board[this.y + 5][this.x];
            let right = system.board[this.y + 5][this.x + 5];

            if (below != undefined || right != undefined) {
                return;
            }

            this.set(undefined);

            if (below == undefined) {
                this.y += 5;
            }

            if (right == undefined) {
                this.x += 5;
            }
        } else if (collisionCode == 2) {
            let below = system.board[this.y + 5][this.x];
            let left = system.board[this.y + 5][this.x - 5];

            if (below != undefined || left != undefined) {
                return;
            }

            this.set(undefined);

            if (below == undefined) {
                this.y += 5;
            }

            if (left == undefined) {
                this.x -= 5;
            }
        } else if (collisionCode == 3) {
            this.set(this);
            return;
        } else {
            let below = system.board[this.y + 5][this.x];
            let left = system.board[this.y][this.x - 5];
            let right = system.board[this.y][this.x + 5];

            if (below != undefined && left != undefined && right != undefined) {
                this.stoppedStrikes++;
                return;
            } else if (below != undefined) {

                this.set(undefined);

                if (left == undefined && right == undefined) {
                    this.x += [-5, 5][Math.floor(Math.random() * 2)];
                } else if (left == undefined) {
                    this.x -= 5;
                } else if (right == undefined) {
                    this.x += 5;
                }

                this.set(this);
                return;
            }

            this.set(undefined);

            this.stoppedStrikes = 0;

            this.y += 5;
        }

        if (this.y > height - 12) {
            this.y = height - 12;
            this.stoppedStrikes++;
        }

        this.set(this);
    }

    set(dat) {
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                system.board[this.y + i][this.x + j] = dat;
            }
        }
    }

    display() {
        push()
        stroke(0, 220, 220);
        fill(0, 180, 225);
        square(this.x, this.y, 5);
        pop();
    }
}