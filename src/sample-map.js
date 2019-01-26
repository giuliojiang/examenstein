// Wall: {x1: ..., z1: ..., x2: ..., z2: ...}
// Ground: {x: ..., z: ..., w: ..., h: ...}
// Door: like wall with 'isOpen' attr, false bz default

var margin = 1;

class SimpleMap {
    constructor() {
        this.grounds = [
            {'x': 0.0, 'z': 0.0, 'w': 1000.0, 'h': 2000.0}
        ] // list of grounds

        // left limit: -5
        // right limit: 5
        // up limit: 5
        // down limit: -5
        this.walls = [
            { 'x1': -5.0, 'z1': 5.0,  'x2': 5.0, 'z2': 5.0},
            {'x1': 5.0, 'z1': 5.0,  'x2': 5.0, 'z2': -5.0},
            {'x1': 5.0, 'z1': -5.0, 'x2': -5.0, 'z2': -5.0},
            {'x1': -5.0, 'z1': 5.0, 'x2': -5.0,  'z2': -5.0}
        ];

        this.doors = [];
    }

    isValidPositionRoom0(x, z) {
        return (-5 + margin <= x && x <= 5 - margin) 
            && (-5 + margin <= z && z <= 5 - margin);
    }

    isValidPosition(x, z) {
        console.info(`Checking position ${x}, ${z}`);
        return this.isValidPositionRoom0(x, z);
    }

}

var map = new SimpleMap();
export {map}
