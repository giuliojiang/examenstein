export class GameOver {
    static showGameOver() {
        let elem = document.querySelector("[data-game-over]");
        elem.classList.remove("level-back");
        elem.classList.add("level-front");
    }

    static registerNewGameButtonHandler() {
        let elem = document.querySelector("[data-new-game-button]");
        elem.addEventListener("click", (e) => {
            e.stopPropagation();
            document.location.reload();
        });
    }
}