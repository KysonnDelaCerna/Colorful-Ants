let width;
let height;
let grid;

const DIR = {
    "UP": 0,
    "RIGHT": 1,
    "DOWN": 2,
    "LEFT": 3
}

let ants = [];

function ant (x, y) {
    this.x = x;
    this.y = y;

    this.r = 0;
    this.g = 0;
    this.b = 0;

    this.facing = Math.floor(Math.random() * 3);

    this.incrementColor = function () {
        this.r++;

        if (this.r >= 255) {
            this.r = 0;
            this.g++;
        }
        if (this.g >= 255) {
            this.g = 0;
            this.b++;
        }
        if (this.b >= 255) {
            this.b = 0;
        };
    };

    this.move = function () {
        let offset = (this.y * width + this.x) * 4;

        if (grid[offset] == 255 && grid[offset + 1] == 255 && grid[offset + 2] == 255) {
            grid[offset] = this.r;
            grid[offset + 1] = this.g;
            grid[offset + 2] = this.b;

            this.facing++;

            if (this.facing > DIR.LEFT) {
                this.facing = DIR.UP;
            }
        } else {
            grid[offset] = 255;
            grid[offset + 1] = 255;
            grid[offset + 2] = 255;

            this.facing--;
            
            if (this.facing < DIR.UP) {
                this.facing = DIR.LEFT;
            }
        }

        if (this.facing == DIR.UP) {
            this.y--;
        } else if (this.facing == DIR.RIGHT) {
            this.x++;
        } else if (this.facing == DIR.DOWN) {
            this.y++;
        } else if (this.facing == DIR.LEFT) {
            this.x--;
        }

        if (this.y > height - 1) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = height - 1;
        }

        if (this.x > width - 1) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = width - 1;
        }

        this.incrementColor();
    }
}

function setup () {
    width = windowWidth;
    height = windowHeight;

    createCanvas(width, height);
    background(255);

    textSize(displayWidth / 15);
    textAlign(CENTER, CENTER);
    text("Langston's Colorful Ants", width / 2, height / 2);

    loadPixels();
    grid = pixels;
}

function draw () {
    for (let i = 0; i < 100; i++) {
        if (ants.length > 0) {
            ants.forEach(function (item) {
                item.move()
            });
        }
    }

    pixels = grid;
    updatePixels();
}

function mouseClicked () {
    if (ants.length == 10) {
        ants.splice(0, 1);
    }
    ants.push(new ant(mouseX, mouseY));
    return false;
}