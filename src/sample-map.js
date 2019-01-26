// Wall: {x1: ..., z1: ..., x2: ..., z2: ...}
// Ground: {x: ..., z: ..., w: ..., h: ...}
// Door: like wall with 'isOpen' attr, false bz default

class SimpleMap {
  constructor() {
    this.grounds = [
        {'x': 0.0, 'z': 0.0, 'w': 1000.0, 'h': 2000.0}
    ] // list of grounds
    this.walls = [
      { 'x1': 0.0, 'z1': 0.0,  'x2': 10.0, 'z2': 0.0},
      {'x1': 10.0, 'z1': 0.0,  'x2': 10.0, 'z2': 20.0},
      {'x1': 10.0, 'z1': 20.0, 'x2': 10.0, 'z2': 20.0},
      {'x1': 10.0, 'z1': 20.0, 'x2': 0.0,  'z2': 0.0}
    ]
    this.doors = []
  }

}

var map = new SimpleMap();
export {map}
