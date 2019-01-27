import { StartScreen } from "./start-screen";

export class VictoryScreen {
    static show(averageScore) {
        StartScreen.stopGame();

        let scoreElem = document.querySelector("[data-victory-average-score]");
        scoreElem.innerText = `Average score: ${averageScore.toFixed(2)}`;

        let button = document.querySelector("[data-victory-new-game-button]");
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            document.location.reload();
        });

        let layer = document.querySelector("[data-victory-screen]");
        layer.classList.remove("level-black")
        layer.classList.add("level-front");
    }
}
