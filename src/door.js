export class Door {
  static buildDoor(x1, z1, x2, z2, scene) {
    var frameRate = 1;
    const door_width = x1 - x2;
    var door = BABYLON.MeshBuilder.CreateBox(
      "door",
      { width: door_width, height: 2.5, depth: 0.1 },
      scene
    );
    door.setPositionWithLocalVector(
      new BABYLON.Vector3((x1 + x2) / 2, 1.25, z1)
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
}
