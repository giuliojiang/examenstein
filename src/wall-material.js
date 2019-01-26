import * as BABYLON from 'babylonjs';

var materialCounter = 0;

export class WallMaterial {
    static addMaterial(mesh, scene, width) {
        materialCounter += 1;
        var wallMaterial = new BABYLON.StandardMaterial(`wallMaterialMaterial${materialCounter}`, scene);

        wallMaterial.diffuseTexture = new BABYLON.Texture("/res/wall3.jpeg", scene);
        wallMaterial.diffuseTexture.uScale = width / 2;
        wallMaterial.diffuseTexture.vScale = 1;

        wallMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        wallMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
        wallMaterial.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);

        wallMaterial.backFaceCulling = false;
        mesh.material = wallMaterial;
    }
}
