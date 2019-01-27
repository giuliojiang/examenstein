import { camera } from './camera-player';
import { SoundEngine } from './sound';
import { allEnemis } from './enemy';
import { map } from './sample-map';

export class WeaponFire {

    static checkFire(evt, scene) {
        
        var didHit = false;

        var shoot = (scene) => {
            let enemies = allEnemis;

            var pos = camera.position;
            var forward = new BABYLON.Vector3(0,0,1);
            var m = camera.getWorldMatrix();
            forward = BABYLON.Vector3.TransformCoordinates(forward, m);
            
            var dir = forward.subtract(pos);
            dir = BABYLON.Vector3.Normalize(dir);

            var ray = new BABYLON.Ray(pos, dir, 100);

            var hit = scene.pickWithRay(ray);

            // console.log(distance);
            let hitEnemy = null;
            for (let e of enemies) {
                if (e == hit.pickedMesh) {
                    hitEnemy = e;
                }
            }

            if (hitEnemy != null) {
                hitEnemy.shot = true;
                console.log("hit the fucking enemy");
                // hit.pickedMesh.position.x += dir.x * 1;
                // hit.pickedMesh.position.z += dir.z * 1;
                hitEnemy.position.x += dir.x * 1;
                hitEnemy.position.z += dir.z * 1;
                hitEnemy.hitCount += 1;
                console.log("Hit count: " + String(hitEnemy.hitCount));
                didHit = true;
              }
        }

        if (evt.keyCode == 32) {
            // Play sound
            SoundEngine.play("/res/gunshot.ogg");

            // SPACE
            let handgunBase = document.querySelector("[data-handgun-base]");
            let handgunFiring = document.querySelector("[data-handgun-firing]");
            handgunBase.classList.add("handgun-hidden");
            handgunFiring.classList.remove("handgun-hidden");
            shoot(scene);

            setTimeout(() => {
                handgunBase.classList.remove("handgun-hidden");
                handgunFiring.classList.add("handgun-hidden");
            }, 100);
        }


        return didHit;
    }
}