import { Example } from "./example-class";
import { Render } from "./render";
import * as cameraPlayer from "./camera-player";

Example.greet();

window.addEventListener('DOMContentLoaded', function(){
    Render.render();

});

window.thePlayer = cameraPlayer.player;