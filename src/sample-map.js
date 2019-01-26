// Wall: {x1: ..., z1: ..., x2: ..., z2: ...}
// Ground: {x: ..., z: ..., w: ..., h: ...}
// Door: like wall with 'isOpen' attr, false bz default

var margin = 0.5;

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
            // room 1
            {'x1': -5.0, 'z1': -5.0, 'x2': 15.0, 'z2': -5.0},
            {'x1': -5.0, 'z1': -5.0,  'x2': -5.0, 'z2': 35.0},
            {'x1': -5.0, 'z1': 5.0,  'x2': -2.0, 'z2': 5.0},
            {'x1': 0.0, 'z1': 5.0,  'x2': 5.0, 'z2': 5.0},
            // room 2 + 3
            {'x1': -5.0, 'z1': 35.0, 'x2': 15.0, 'z2': 35.0},
            {'x1': 5.0, 'z1': 35.0, 'x2': 5.0, 'z2': 32.0},
            {'x1': 5.0, 'z1': 30.0, 'x2': 5.0, 'z2': 0.0},
            {'x1': 5.0, 'z1': -2.0, 'x2': 5.0, 'z2': -5.0},
            {'x1': 15.0, 'z1': 35.0, 'x2': 15.0, 'z2': -5.0}
        ];

        this.doors = [];
    }

    isValidPositionRoomGeneral(x, z, left, right, bottom, top) {
        return (left + margin <= x && x <= right - margin)
            && (bottom + margin <= z && z <= top - margin);
    }

    isValidPositionRoom0(x, z) {
        return this.isValidPositionRoomGeneral(x, z, -5, 5, -5, 5);
    }

    isValidPositionRoom1(x, z) {
        // left: -5
        // right: 5
        // top: 35
        // bottom: 5
        return this.isValidPositionRoomGeneral(x, z, -5, 5, 5, 35);
    }

    isValidPositionRoom2(x, z) {
        // left: 5
        // right: 15
        // bottom: -5
        // top: 35
        return this.isValidPositionRoomGeneral(x, z, 5, 15, -5, 35);
    }

    isValidPositionDoor0(x, z) {
        // TODO check if door is open
        // left: -2
        // right: -1
        // bottom: 4
        // top: 6
        return this.isValidPositionRoomGeneral(x, z, -2.5, 0.5, 4, 6);
    }

    isValidPositionDoor1(x, z) {
        // left: 4
        // right: 6
        // bottom: 31
        // top: 32
        return this.isValidPositionRoomGeneral(x, z, 4, 6, 29.5, 32.5);
    }

    isValidPositionDoor2(x, z) {
        // left: 4
        // right: 6
        // bottom: -2
        // top: -1
        return this.isValidPositionRoomGeneral(x, z, 4, 6, -2.5, 0.5);
    }

    isValidPosition(x, z) {
        return this.isValidPositionRoom0(x, z)
            || this.isValidPositionRoom1(x, z)
            || this.isValidPositionRoom2(x, z)
            || this.isValidPositionDoor0(x, z)
            || this.isValidPositionDoor1(x, z)
            || this.isValidPositionDoor2(x, z)
        ;
    }

}

var map = new SimpleMap();
export {map}
