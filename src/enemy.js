import * as BABYLON from 'babylonjs';
import * as cameraPlayer from './camera-player';
import * as sampleMap from "./sample-map";
import { ExamMaterial } from "./exam-material";
import { GameOver } from './game-over';
import { StartScreen } from './start-screen';

export class Enemy {

    constructor(x, z) {
        this.x = x;
        this.z = z;
    }

    setup(scene) {
        var player = cameraPlayer.player;
<<<<<<< HEAD
        var exam = BABYLON.MeshBuilder.CreatePlane("exam", { width: 1.5, height: 2}, scene); //default exam       
        // var dynamicTexture = new BABYLON.DynamicTexture("mydt", {width:384, height:512}, scene)
        // var textureContext = dynamicTexture.getContext();
=======
        var exam = BABYLON.MeshBuilder.CreatePlane("exam", { width: 1.5, height: 2}, scene); //default exam

        var dynamicTexture = new BABYLON.DynamicTexture("mydt", {width:384, height:512}, scene)
        var textureContext = dynamicTexture.getContext();
>>>>>>> 583deef03d29c8b41750a05e21521d8bf36989eb
        // textureContext.clearRect();

        var examMaterial = new BABYLON.StandardMaterial("material", scene)
        examMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);

        // examMaterial.diffuseTexture = dynamicTexture;
        examMaterial.diffuseTexture = new BABYLON.Texture("/res/exam.jpeg", scene)

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

        scene.registerBeforeRender(function () {
            if (StartScreen.isStarted()) {
                var direction = BABYLON.Vector3.Normalize(new BABYLON.Vector3(player.x - exam.position.x, 0, player.z - exam.position.z));
<<<<<<< HEAD
                
                // Collision detection and position update
                let map = sampleMap.map;
                if (map.isValidPosition(exam.position.x, exam.position.z)) {
                    exam.position.x += direction.x * 0.005;
                    exam.position.z += direction.z * 0.005;
                } else {
                    exam.position.x += direction.x * 0.005;
                    exam.position.z += direction.z * 0.005;
                }

=======
                exam.position.x += direction.x * 0.02;
                exam.position.z += direction.z * 0.02;
>>>>>>> 583deef03d29c8b41750a05e21521d8bf36989eb
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
