import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import { player } from "./camera-player";
import { Enemy } from "./enemy";
import { GroundMaterial } from "./ground-material";
import { WallMaterial } from "./wall-material";
import * as samplemap from "./sample-map";
import { BuildAnimatedDoor } from "./door";

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
  WallMaterial.addMaterial(wall, scene);
  wall.checkCollisions = true;
}

export class Render {
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

        // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight("light1",new BABYLON.Vector3(0, 1, 0),scene);

        var enemy1 = new Enemy(-5, 0);
        enemy1.setup(scene);


        // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
        var ground = BABYLON.Mesh.CreateGround("ground1",1000,1000,2,scene,false);
        GroundMaterial.addMaterial(ground, scene);
        ground.checkCollisions = true;

        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
        var textblock = new GUI.TextBlock();
        textblock.text = "HP: "+player.hp.toString();
        textblock.fontSize = 24;
        textblock.top = -100;
        textblock.color = "white";
        textblock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(textblock);

        samplemap.map;
        BuildWall(-5, 5, 5, 5, scene);
        BuildWall(5, 5, 5, -5, scene);
        BuildWall(5, -5, -5, -5, scene);
        BuildWall(-5, 5, -5, -5, scene);
        BuildAnimatedDoor(-5, 5, -5, -5, scene);

      // var ground;
      // for(var ground_count = 0; ground_count < samplemap.map.grounds.length; ground_count++){
      //     ground = BABYLON.Mesh.CreateGround('ground', samplemap.map.grounds[ground_count].w, samplemap.map.grounds[ground_count].h, 2, scene, false);
      //     GroundMaterial.addMaterial(ground, scene);
      //     ground.checkCollisions = true;
      // }
      //
      // var walls;
      // for(var wall_count = 0; wall_count < samplemap.map.grounds.length; wall_count++){
      //     BuildWall(samplemap.map.walls[wall_count].x1, samplemap.map.walls[wall_count].y1, samplemap.map.walls[wall_count].x2, samplemap.map.walls[wall_count].y2)
      // }

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
