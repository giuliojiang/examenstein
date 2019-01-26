import * as BABYLON from 'babylonjs';

function BuildWall(x1, z1, x2, z2, scene){
    var wall;
    if ((z1 - z2) == 0){
        wall = BABYLON.MeshBuilder.CreatePlane("wall", {width: Math.abs(x1-x2), height: 2.5}, scene);
        wall.setPositionWithLocalVector(new BABYLON.Vector3(0, 1.25, (z1)));
    }
    else{
        wall = BABYLON.MeshBuilder.CreatePlane("wall", {width: Math.abs(z1-z2), height: 2.5}, scene);
        wall.rotation.y = Math.PI/2;
        wall.setPositionWithLocalVector(new BABYLON.Vector3((x1), 1.25, 0));
    }
}

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
            // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
            var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            // Target the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            // Attach the camera to the canvas
            camera.attachControl(canvas, false);
            // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

            // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
            var ground = BABYLON.Mesh.CreateGround('ground1', 10, 10, 2, scene, false);
            BuildWall(5,5,-5,5, scene);
            BuildWall(5,5,5,-5,scene);
            BuildWall(5,-5,5,-5,scene);
            BuildWall(-5,5,5,-5,scene);
            // var wall1 = BABYLON.MeshBuilder.CreatePlane("wall", {width: 10, height: 2.5}, scene);
            // var wall2 = BABYLON.MeshBuilder.CreatePlane("wall", {width: 10, height: 2.5}, scene);
            // var wall3 = BABYLON.MeshBuilder.CreatePlane("wall", {width: 10, height: 2.5}, scene);
            // var wall4 = BABYLON.MeshBuilder.CreatePlane("wall", {width: 10, height: 2.5}, scene);
            // wall1.setPositionWithLocalVector(new BABYLON.Vector3(0, 1.25, 5));
            // wall2.setPositionWithLocalVector(new BABYLON.Vector3(5, 1.25, 0));
            // wall3.setPositionWithLocalVector(new BABYLON.Vector3(0, 1.25, -5));
            // wall4.setPositionWithLocalVector(new BABYLON.Vector3(-5, 1.25, 0));
            // wall2.rotation.y = Math.PI/2;
            // wall4.rotation.y = Math.PI/2;

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

    }
}
