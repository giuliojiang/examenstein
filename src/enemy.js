import * as BABYLON from 'babylonjs';
import * as cameraPlayer from './camera-player';
import * as sampleMap from "./sample-map";
import { StartScreen } from './start-screen';

let allEnemis = [];
let enemyNumber = 0;

class Enemy {

    constructor(x, z, scene) {
        enemyNumber += 1;

        this.hitCount = 0; //goes to 4, exam dies at 5

        var exam = BABYLON.MeshBuilder.CreatePlane("exam" + enemyNumber, { width: 1.5, height: 2}, scene);     

        var examMaterial = new BABYLON.StandardMaterial("material" + enemyNumber, scene)
        examMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);

        // examMaterial.diffuseTexture = dynamicTexture;
        examMaterial.diffuseTexture = new BABYLON.Texture("/res/exam0.jpeg", scene)

        exam.material = examMaterial;

        exam.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        exam.checkCollisions = true;
        console.info(`Created enemy at ${x} ${z}`);
        exam.position.x = x;
        exam.position.z = z;
        exam.position.y = 1;

        allEnemis.push(exam);
    }

    static setupMovements(scene) {
        scene.registerBeforeRender(function () {
            let player = cameraPlayer.player;

            if (StartScreen.isStarted()) {
                for (let exam of allEnemis) {

                    var direction = BABYLON.Vector3.Normalize(new BABYLON.Vector3(player.x - exam.position.x, 0, player.z - exam.position.z));
                    
                    // Collision detection and position update
                    let map = sampleMap.map;
                    if (map.isValidPosition(exam.position.x, exam.position.z)) {
                        exam.position.x += direction.x * 0.01;
                        exam.position.z += direction.z * 0.01;
                    } else {
                        exam.position.x += direction.x * 0.01;
                        exam.position.z += direction.z * 0.01;
                    }

                    //dispose if hitCount hits 5
                    if (exam.hitCount >= 5) {
                        exam.dispose();
                    }
                }
            }

        });
    }
}


export {allEnemis, Enemy}