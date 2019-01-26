// Wall: {x1: ..., y1: ..., x2: ..., y2: ...}
// Ground: {x: ..., y: ..., w: ..., h: ...}
// Door: like wall with 'isOpen' attr, false by default

export class SimpleMap {
  constructor() {
    this.grounds = [{'x': 0.0, 'y': 0.0, 'w': 10.0, 'h': 20.0}] // list of grounds
    this.walls = [
                  {'x1': 0.0, 'x2': 10.0, 'y1': 0.0, 'y2': 0.0},
                  {'x1': 10.0, 'x2': 10.0, 'y1': 0.0, 'y2': 20.0},
                  {'x1': 10.0, 'x2': 10.0, 'y1': 20.0, 'y2': 20.0},
                  {'x1': 10.0, 'x2': 0.0, 'y1': 20.0, 'y2': 0.0},
                 ] // array with walls 
    this.doors = [] // array with doors 
  }
}
