import * as BABYLON from "babylonjs";
import { player } from "./camera-player";

var doorMaterial = null;

export class DoorMaterial {
  static addMaterial(mesh, scene) {
    if (doorMaterial == null) {
      doorMaterial = new BABYLON.StandardMaterial("doorMaterial", scene);

      doorMaterial.diffuseTexture = new BABYLON.Texture("/res/door.jpg", scene);
      doorMaterial.diffuseTexture.uScale = 1;
      doorMaterial.diffuseTexture.vScale = 10;

      doorMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      doorMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
      doorMaterial.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    }
    mesh.material = doorMaterial;
  }
}
