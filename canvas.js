class Canvas {
  constructor() {
    this.lines = [];
    this.click = null;
    this.context = null;
    this.isLineDrawing = false;
    this.mouseCoordinates = {};
    this.surfaceWidth = null;
    this.surfaceHeight = null;
  }

  init(context) {
    this.context = context;
    this.surfaceWidth = this.context.canvas.width;
    this.surfaceHeight = this.context.canvas.height;
    this.addLine(new Line(this));
    this.start();
  }

  getMouseCoordinates(e) {
    let x = e.clientX - this.context.canvas.getBoundingClientRect().left;
    let y = e.clientY - this.context.canvas.getBoundingClientRect().top;
    return { x: x, y: y };
  }

  start() {
    this.context.canvas.addEventListener(
      "mousedown",
      (e) => {
        switch (e.button) {
          case 0:
            this.click = this.getMouseCoordinates(e);
            this.isLineDrawing = true;
            break;
          case 2:
            if (this.isLineDrawing) {
              this.lines.pop();
              let newLine = new Line(this);
              this.addLine(newLine);
            }
            break;
        }
        this.update();
      },
      false
    );
    this.context.canvas.addEventListener(
      "mousemove",
      (e) => {
        this.mouseCoordinates = this.getMouseCoordinates(e);
        this.update();
      },
      false
    );
    this.context.canvas.oncontextmenu = (e) => {
      e.preventDefault();
    };
  }

  addLine(line) {
    this.lines.push(line);
  }

  clear() {
    this.lines.forEach((line) => {
      line.clear();
    });
  }

  update() {
    this.lines.forEach((line) => {
      line.update();
    });
    this.context.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.lines.forEach((line) => {
      line.draw(this.context);
    });
  }
}
