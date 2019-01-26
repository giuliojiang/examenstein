import * as BABYLON from 'babylonjs';
import { player } from './camera-player';

var wallMaterial = null;

export class WallMaterial {
    static addMaterial(mesh, scene) {
        if (wallMaterial == null) {
            wallMaterial = new BABYLON.StandardMaterial("wallMaterialMaterial", scene);

            wallMaterial.diffuseTexture = new BABYLON.Texture("/res/wall1.jpeg", scene);
            wallMaterial.diffuseTexture.uScale = 10;
            wallMaterial.diffuseTexture.vScale = 1;

            wallMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            wallMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
            wallMaterial.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);

            wallMaterial.backFaceCulling = false;
        }
        mesh.material = wallMaterial;
    }
}
