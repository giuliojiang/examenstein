import * as BABYLON from 'babylonjs';
import * as cameraPlayer from './camera-player';
import { GameOver } from './game-over';
import { StartScreen } from './start-screen';

export class Enemy {

    constructor(x, z) {
        this.x = x;
        this.z = z;
    }

    setup(scene) {
        var player = cameraPlayer.player;
        var exam = BABYLON.MeshBuilder.CreatePlane("exam", { width: 1.5, height: 2}, scene); //default exam
        
        var dynamicTexture = new BABYLON.DynamicTexture("mydt", {width:384, height:512}, scene)
        var textureContext = dynamicTexture.getContext();
        // textureContext.clearRect();

        var examMaterial = new BABYLON.StandardMaterial("material", scene)
        examMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        examMaterial.diffuseTexture = dynamicTexture;
        exam.material = examMaterial;
        dynamicTexture.drawText("EXAM", null, 100, "bold 100px monospace", "black", "white", 512, true, true)
        exam.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        exam.setPositionWithLocalVector(new BABYLON.Vector3(this.x, 1, this.z));
        exam.checkCollisions = true;

        scene.registerBeforeRender(function () {
            if (StartScreen.isStarted()) {
                var direction = BABYLON.Vector3.Normalize(new BABYLON.Vector3(player.x - exam.position.x, 0, player.z - exam.position.z));
                exam.position.x += direction.x * 0.05;
                exam.position.z += direction.z * 0.05;
                if (new BABYLON.Vector3(player.x - exam.position.x, 0, player.z - exam.position.z).length() < 2) {
                    player.hp -= 25;
                    if(player.hp <= 0) {
                        GameOver.showGameOver();
                    }
                }
            }

        });
    }
}