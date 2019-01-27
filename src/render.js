import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import { player } from "./camera-player";
import { Enemy } from "./enemy";
import { GroundMaterial } from "./ground-material";
import { WallMaterial } from "./wall-material";
import * as samplemap from "./sample-map";
import { BuildAnimatedDoor } from "./door";
import { GameOver } from "./game-over";
import { StartScreen } from "./start-screen";

function BuildWall(x1, z1, x2, z2, scene) {
  var wall, wall_width;

  if (z1 - z2 == 0) {
    wall_width = x1 > x2 ? x1 - x2 : x2 - x1;
    wall = BABYLON.MeshBuilder.CreatePlane(
      "wall",
      { width: wall_width, height: 2.5 },
      scene
    );
    wall.setPositionWithLocalVector(
      new BABYLON.Vector3((x1 + x2) / 2, 1.25, z1)
    );
  } else {
    wall_width = z1 > z2 ? z1 - z2 : z2 - z1;
    wall = BABYLON.MeshBuilder.CreatePlane(
      "wall",
      { width: wall_width, height: 2.5 },
      scene
    );
    wall.setPositionWithLocalVector(
      new BABYLON.Vector3(x1, 1.25, (z1 + z2) / 2)
    );
    wall.rotation.y = Math.PI / 2;
  }
  WallMaterial.addMaterial(wall, scene, wall_width);
  wall.checkCollisions = true;
  wall.isPickable = true;
}

class Render {
  static render() {
    // Get the canvas DOM element
    var canvas = document.getElementById("canvas");
    // Load the 3D engine
    var engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    });
    // CreateScene function that creates and return the scene
    var createScene = function() {
      // Create a basic BJS Scene object
      var scene = new BABYLON.Scene(engine);
      scene.collisionsEnabled = true;
      scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

      // setup player and camera
      player.setup(scene);

        var enemy1 = new Enemy(-3, 0, scene, 2);
        var enemy2 = new Enemy(0, 15, scene, 2);
        Enemy.setupMovements(scene);
      // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
      var light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
      var ground;
      for (
        var ground_count = 0;
        ground_count < samplemap.map.grounds.length;
        ground_count++
      ) {
        ground = BABYLON.Mesh.CreateGround(
          "ground",
          samplemap.map.grounds[ground_count].w,
          samplemap.map.grounds[ground_count].h,
          2,
          scene,
          false
        );
        GroundMaterial.addMaterial(ground, scene);
        ground.checkCollisions = true;
      }

      var remainingTime = 90;
      let timerHandle = setInterval(() => {
        if (StartScreen.isStarted()) {
          remainingTime -= 1;

          if (remainingTime < 1) {
            clearInterval(timerHandle);
            GameOver.setGameOverReason("You could not beat the exams in time");
            GameOver.showGameOver();
          }

          let timerElem = document.querySelector("[data-timer-text]");
          timerElem.innerText = `Time: \n ${remainingTime}`;
        }
      }, 1000);

      samplemap.map;

      var walls;
      for (
        var wall_count = 0;
        wall_count < samplemap.map.walls.length;
        wall_count++
      ) {
        var x1 = samplemap.map.walls[wall_count].x1;
        var z1 = samplemap.map.walls[wall_count].z1;
        var x2 = samplemap.map.walls[wall_count].x2;
        var z2 = samplemap.map.walls[wall_count].z2;
        BuildWall(x1, z1, x2, z2, scene);
      }

      // Return the created scene
      return scene;
    };
    // call the createScene function
    var scene = createScene();
    // run the render loop
    engine.runRenderLoop(function() {
      scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener("resize", function() {
      engine.resize();
    });
  }
}
export { Render };
