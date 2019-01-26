import * as BABYLON from 'babylonjs';

export class Enemy {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setup(scene) {
        var box = BABYLON.Mesh.CreateBox("box", 2, scene);
        var boxMaterial = new BABYLON.StandardMaterial("material", scene);
        boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        box.material = boxMaterial;
        box.setPositionWithLocalVector(new BABYLON.Vector3(this.x, this.y, this.z));
    }
}