var started = false;
export class StartScreen {
    static registerButtonHandler() {
        let elem = document.querySelector("[data-start-game-button]");
        elem.addEventListener("click", (e) => {
            e.stopPropagation();

            // hide the start game layer
            let layer = document.querySelector("[data-start-screen]");
            layer.classList.remove("level-front");
            layer.classList.add("level-back");

            // focus on the canvas
            let canvas = document.getElementById("canvas");
            canvas.focus();
            started = true;
        });
    }

    static isStarted() {
        return false;
        return started;
    }

    static stopGame() {
        started = false;
    }
}