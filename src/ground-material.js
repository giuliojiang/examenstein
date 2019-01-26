import * as BABYLON from 'babylonjs';

var groundMaterial = null;

export class GroundMaterial {
    static addMaterial(mesh, scene) {
        if (groundMaterial == null) {
            groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);

            groundMaterial.diffuseTexture = new BABYLON.Texture("/res/concrete.png", scene);
            groundMaterial.diffuseTexture.uScale = 100;
            groundMaterial.diffuseTexture.vScale = 100;

            groundMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            groundMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
            groundMaterial.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        }
        mesh.material = groundMaterial;
    }
}