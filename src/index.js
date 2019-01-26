import { Render } from "./render";
import * as cameraPlayer from "./camera-player";
import { GameOver } from "./game-over";
import { StartScreen } from "./start-screen";

window.addEventListener('DOMContentLoaded', function(){
    Render.render();
    GameOver.registerNewGameButtonHandler();
    StartScreen.registerButtonHandler();
});

window.thePlayer = cameraPlayer.player;
window.gameOver = GameOver;
