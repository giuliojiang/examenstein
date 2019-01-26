import * as BABYLON from 'babylonjs';

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
            // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
            var box = BABYLON.Mesh.CreateBox("box", 2, scene);
            var boxMaterial = new BABYLON.StandardMaterial("material", scene);
            boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
            box.material = boxMaterial;
            // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
            var ground = BABYLON.Mesh.CreateGround('ground1', 10, 10, 2, scene, false);
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

    }
}