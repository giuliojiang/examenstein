export function BuildAnimatedDoor(x1, z1, x2, z2, scene) {
  var frameRate = 1;

  var door = BABYLON.MeshBuilder.CreateBox(
    "door",
    { width: 2, height: 4, depth: 0.1 },
    scene
  );
  var hinge = BABYLON.MeshBuilder.CreateBox("hinge", {}, scene);
  hinge.isVisible = false;
  door.parent = hinge;
  hinge.position.y = 2;
  door.position.x = -1;

  var sweep = new BABYLON.Animation(
    "ySlide",
    "position.y",
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  var sweep_keys = [];

  sweep_keys.push({
    frame: 0,
    value: 0
  });

  sweep_keys.push({
    frame: frameRate,
    value: 0
  });

  sweep_keys.push({
    frame: 3 * frameRate,
    value: -3
  });

  sweep_keys.push({
    frame: 6 * frameRate,
    value: -3
  });

  sweep_keys.push({
    frame: 9 * frameRate,
    value: 0
  });

  sweep.setKeys(sweep_keys);

  scene.beginDirectAnimation(hinge, [sweep], 0, 25 * frameRate, false);
}
