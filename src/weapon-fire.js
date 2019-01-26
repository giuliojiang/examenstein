export class WeaponFire {
    static checkFire(evt) {
        if (evt.keyCode == 32) {
            // SPACE
            let handgunBase = document.querySelector("[data-handgun-base]");
            let handgunFiring = document.querySelector("[data-handgun-firing]");
            handgunBase.classList.add("handgun-hidden");
            handgunFiring.classList.remove("handgun-hidden");

            setTimeout(() => {
                handgunBase.classList.remove("handgun-hidden");
                handgunFiring.classList.add("handgun-hidden");
            }, 100);
        }
    }
}