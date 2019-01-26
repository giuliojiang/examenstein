import { Render } from "./render";
import * as cameraPlayer from "./camera-player";

window.addEventListener('DOMContentLoaded', function(){
    Render.render();
});

window.thePlayer = cameraPlayer.player;