import { Render } from "./render";
import * as cameraPlayer from "./camera-player";
import { GameOver } from "./game-over";

window.addEventListener('DOMContentLoaded', function(){
    Render.render();
});

window.thePlayer = cameraPlayer.player;
window.gameOver = GameOver;