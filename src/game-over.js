import { StartScreen } from "./start-screen";

let reason = "An exam got you!";

export class GameOver {

    static setGameOverReason(r) {
        reason = r;
    }

    static showGameOver() {
        if (!StartScreen.isStarted()) {
            return;
        }

        let elem = document.querySelector("[data-game-over]");
        elem.classList.remove("level-back");
        elem.classList.add("level-front");

        let reasonElem = document.querySelector("[data-game-over-reason]");
        reasonElem.innerText = reason;

        StartScreen.stopGame();
    }

    static registerNewGameButtonHandler() {
        let elem = document.querySelector("[data-new-game-button]");
        elem.addEventListener("click", (e) => {
            e.stopPropagation();
            document.location.reload();
        });
    }
}