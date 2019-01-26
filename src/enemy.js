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
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1, diameterX: 1 }, scene); //default sphere
        var sphereMaterial = new BABYLON.StandardMaterial("material", scene);
        sphereMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
        sphere.material = sphereMaterial;
        sphere.setPositionWithLocalVector(new BABYLON.Vector3(this.x, 0.5, this.z));
        sphere.checkCollisions = true;

        scene.registerBeforeRender(function () {
            if (StartScreen.isStarted()) {
                var direction = BABYLON.Vector3.Normalize(new BABYLON.Vector3(player.x - sphere.position.x, 0, player.z - sphere.position.z));
                sphere.position.x += direction.x * 0.1;
                sphere.position.z += direction.z * 0.1;
                if (new BABYLON.Vector3(player.x - sphere.position.x, 0, player.z - sphere.position.z).length() < 2) {
                    GameOver.showGameOver();
                }
            }

        });
    }
}