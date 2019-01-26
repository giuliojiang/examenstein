import * as BABYLON from 'babylonjs';
import { player } from './camera-player';
import { Enemy } from './enemy';

export class Render {
    static render() {
        // Get the canvas DOM element
        var canvas = document.getElementById('canvas');
        // Load the 3D engine
        var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        // CreateScene function that creates and return the scene
        var createScene = function () {
            // Create a basic BJS Scene object
            var scene = new BABYLON.Scene(engine);
            scene.collisionsEnabled = true;
            // setup player and camera
            player.setup(scene);

            // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            var enemy1 = new Enemy(0, 0, 0);
            enemy1.setup(scene);
            // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
            var ground = BABYLON.Mesh.CreateGround('ground1', 10, 10, 2, scene, false);
            ground.checkCollisions = true;
            var wall = BABYLON.MeshBuilder.CreatePlane("wall", {width: 5, height: 2}, scene);
            wall.setPositionWithLocalVector(new BABYLON.Vector3(10, 0, 5));
            // Return the created scene
            return scene;
        }
        // call the createScene function
        var scene = createScene();
        // run the render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', function () {
            engine.resize();
        });

        setInterval(() => {
            canvas.focus();
        }, 250);

    }
}