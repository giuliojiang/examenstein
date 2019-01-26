export class GameOver {
    static showGameOver() {
        let elem = document.querySelector("[data-game-over]");
        elem.classList.remove("level-back");
        elem.classList.add("level-front");
    }
}