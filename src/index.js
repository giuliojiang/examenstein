import { Example } from "./example-class";
import { Render } from "./render";

Example.greet();

window.addEventListener('DOMContentLoaded', function(){
    Render.render();

});