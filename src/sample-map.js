// Wall: {x1: ..., z1: ..., x2: ..., z2: ...}
// Ground: {x: ..., z: ..., w: ..., h: ...}
// Door: like wall with 'isOpen' attr, false bz default

class SimpleMap {
  constructor() {
    this.grounds = [
        {'x': 0.0, 'z': 0.0, 'w': 1000.0, 'h': 2000.0}
    ]; // list of grounds
    this.walls = [
      {'x1': -5.0, 'z1': 5.0,  'x2': 5.0, 'z2': 5.0},
      {'x1': 5.0, 'z1': 5.0,  'x2': 5.0, 'z2': -5.0},
      {'x1': 5.0, 'z1': -5.0, 'x2': -5.0, 'z2': -5.0},
      {'x1': -5.0, 'z1': 5.0, 'x2': -5.0, 'z2': -5.0},

      {'x1': -5.0, 'z1': 35.0, 'x2': 5.0, 'z2': 35.0},
      {'x1': -5.0, 'z1': 35.0, 'x2': -5.0, 'z2': 5.0},
      {'x1': 5.0, 'z1': 35.0, 'x2': 5.0, 'z2': 5.0}

  ];
    this.doors = [];
  }

}

var map = new SimpleMap();
export {map}
