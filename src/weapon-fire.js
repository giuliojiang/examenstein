import { camera } from './camera-player';
import { SoundEngine } from './sound';

export class WeaponFire {

    static checkFire(evt, scene) {
        
        var didHit = false;

        var shoot = (scene) => {
            let enemy = scene.getMeshByName("exam");
            // let p0 = camera.getDirection(BABYLON.Axis.Z);
            // let p1 = camera.position;
            // let a = (p0.z - p1.z) / (p0.x - p1.x);
            // let b = 1;
            // let c = (p1.z - p0.z) / (p1.x - p0.x) * (p1.x + p1.z);

            // let distance = Math.abs(a * enemy.position.x + b * enemy.position.z + c)/ Math.sqrt(a * a + b * b);

            var pos = camera.position;
            var forward = new BABYLON.Vector3(0,0,1);
            var m = camera.getWorldMatrix();
            forward = BABYLON.Vector3.TransformCoordinates(forward, m);
            
            var dir = forward.subtract(pos);
            dir = BABYLON.Vector3.Normalize(dir);

            var ray = new BABYLON.Ray(pos, dir, 100);

            var hit = scene.pickWithRay(ray);

            // console.log(distance);
            if (hit.pickedMesh == enemy) {
                console.log("hit the fucking enemy");
                // hit.pickedMesh.position.x += dir.x * 1;
                // hit.pickedMesh.position.z += dir.z * 1;
                enemy.position.x += dir.x * 1;
                enemy.position.z += dir.z * 1;
                enemy.hitCount += 1;
                console.log("Hit count: "+String(enemy.hitCount));
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