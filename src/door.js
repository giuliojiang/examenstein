export class Door {
  static buildDoor(x1, z1, x2, z2, scene) {
    var door, door_width;
    if (z1 - z2 == 0) {
      door_width = x1 > x2 ? x1 - x2 : x2 - x1;
      door = BABYLON.MeshBuilder.CreatePlane(
        "door",
        { width: door_width, height: 2.5 },
        scene
      );
      door.setPositionWithLocalVector(
        new BABYLON.Vector3((x1 + x2) / 2, 1.25, z1)
      );
    } else {
      door_width = z1 > z2 ? z1 - z2 : z2 - z1;
      door = BABYLON.MeshBuilder.CreatePlane(
        "door",
        { width: door_width, height: 2.5 },
        scene
      );
      door.setPositionWithLocalVector(
        new BABYLON.Vector3(x1, 1.25, (z1 + z2) / 2)
      );
      door.rotation.y = Math.PI / 2;
    }
    return door;
  }

  static openDoor(evt, door, scene) {
    var frameRate = 1;

    if (evt.keyCode == 17) {
      // CTRL
      var hinge = BABYLON.MeshBuilder.CreateBox("hinge", {}, scene);
      hinge.isVisible = true;
      hinge.sesetPositionWithLocalVector(new BABYLON.Vector3(-1.5, 1.25, 5.0));
      door.parent = hinge;
      console.log("door.js: hinge", hinge);

      // hinge.position.y = 0;

      var sweep = new BABYLON.Animation(
        "sweep",
        "rotation.y",
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
        value: Math.PI / 2
      });

      sweep_keys.push({
        frame: 6 * frameRate,
        value: Math.PI / 2
      });

      sweep_keys.push({
        frame: 8 * frameRate,
        value: 0
      });

      sweep.setKeys(sweep_keys);

      scene.beginDirectAnimation(hinge, [sweep], 0, 25, false);
    }
  }
}
