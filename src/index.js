import { Render } from "./render";
import * as cameraPlayer from "./camera-player";
import { GameOver } from "./game-over";
import { StartScreen } from "./start-screen";
import { VictoryScreen } from "./victory-screen";

window.addEventListener('DOMContentLoaded', function(){
    Render.render();
    GameOver.registerNewGameButtonHandler();
    StartScreen.registerButtonHandler();
});

window.thePlayer = cameraPlayer.player;
window.gameOver = GameOver;
window.victory = VictoryScreen.show;