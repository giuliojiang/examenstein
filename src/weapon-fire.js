import { camera } from './camera-player';

export class WeaponFire {

    static checkFire(evt, scene) {

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
            if (hit.pickedMesh) {
                console.log("hit the fucking enemy")
            }
        }

        if (evt.keyCode == 32) {
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
    }
}