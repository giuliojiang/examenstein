import * as BABYLON from 'babylonjs';
import * as cameraPlayer from './camera-player';
import * as sampleMap from "./sample-map";
import { GameOver } from './game-over';
import { StartScreen } from './start-screen';

export class Enemy {

    constructor(x, z) {
        this.x = x;
        this.z = z;
        this.hitCount = 0; //goes to 4, exam dies at 5
    }

    setup(scene) {
        var player = cameraPlayer.player;
        var exam = BABYLON.MeshBuilder.CreatePlane("exam", { width: 1.5, height: 2}, scene); //default exam       
        // var dynamicTexture = new BABYLON.DynamicTexture("mydt", {width:384, height:512}, scene)
        // var textureContext = dynamicTexture.getContext();
        // textureContext.clearRect();

        var examMaterial = new BABYLON.StandardMaterial("material", scene)
        examMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);

        // examMaterial.diffuseTexture = dynamicTexture;
        examMaterial.diffuseTexture = new BABYLON.Texture("/res/exam0.jpeg", scene)

        // var examPic = new Image();
        // examPic.src = "/res/exam.jpeg";

        // examPic.onLoad = function() {
        //     dynamicTexture.drawText("EXAM", null, 100, "bold 100px monospace", "black", "white", 512, true, true);
        //     textureContext.drawImage(this, 0,0);
        //     dynamicTexture.update();
        //     // dynamicTexture.drawText("EXAM", null, 100, "bold 100px monospace", "black", "white", 512, true, true);
        // }

        exam.material = examMaterial;
        // ExamMaterial.addMaterial(exam,scene);

        // dynamicTexture.drawText("EXAM", null, 100, "bold 100px monospace", "black", "white", 512, true, true);
        exam.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        exam.setPositionWithLocalVector(new BABYLON.Vector3(this.x, 1, this.z));
        exam.checkCollisions = true;

        var examEnemy = this;

        scene.registerBeforeRender(function () {
            if (StartScreen.isStarted()) {
                var direction = BABYLON.Vector3.Normalize(new BABYLON.Vector3(player.x - exam.position.x, 0, player.z - exam.position.z));
                
                examEnemy.x = exam.position.x;
                examEnemy.z = exam.position.z;

                // Collision detection and position update
                let map = sampleMap.map;
                if (map.isValidPosition(exam.position.x, exam.position.z)) {
                    exam.position.x += direction.x * 0.01;
                    exam.position.z += direction.z * 0.01;
                } else {
                    exam.position.x += direction.x * 0.01;
                    exam.position.z += direction.z * 0.01;
                }

                if (new BABYLON.Vector3(player.x - exam.position.x, 0, player.z - exam.position.z).length() < 2) {
                    // player.hp -= 25;
                    // player.hpText = player.hp.toString();
                    // player.x -= direction.x * 1;
                    // player.z -= direction.z * 1;
                    // if(player.hp <= 0) {
                        GameOver.showGameOver();
                    // }
                }

                //dispose if hitCount hits 5
                if (exam.hitCount >= 5) {
                    exam.dispose();
                }
            }

        });
    }
}
