// Wall: {x1: ..., z1: ..., x2: ..., z2: ...}
// Ground: {x: ..., z: ..., w: ..., h: ...}
// Door: like wall with 'isOpen' attr, false bz default

class SimpleMap {
    constructor() {
        this.grounds = [
            {'x': 0.0, 'z': 0.0, 'w': 1000.0, 'h': 2000.0}
        ] // list of grounds

        // left limit: 0
        // right limit: 10
        // up limit: 0
        // down limit: 20
        this.walls = [
            {'x1': 0.0, 'z1': 0.0,  'x2': 10.0, 'z2': 0.0},
            {'x1': 10.0, 'z1': 0.0,  'x2': 10.0, 'z2': 20.0},
            {'x1': 10.0, 'z1': 20.0, 'x2': 10.0, 'z2': 20.0},
            {'x1': 10.0, 'z1': 20.0, 'x2': 0.0,  'z2': 0.0}
        ]
        this.doors = []
    }

    isValidPositionRoom0(x, z) {
        return (0 <= x && x <= 10) 
            && (0 <= z && z <= 20);
    }

    isValidPosition(x, z) {
        console.info(`Checking position ${x}, ${z}`);
        return this.isValidPositionRoom0(x, z);
    }

}

var map = new SimpleMap();
export {map}
