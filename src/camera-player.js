import * as BABYLON from 'babylonjs';

class CameraPlayer {

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    setup(scene) {
        // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(5, 1, 0), scene);
        // Target the camera to scene origin
        camera.setTarget(new BABYLON.Vector3(1, 0, 0));
        // Attach the camera to the canvas
        camera.attachControl(canvas, true);

        // Let's remove default keyboard:
        camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
        camera.inputs.remove(camera.inputs.attached.mouse);

        // Create our own manager:
        var FreeCameraKeyboardRotateInput = function () {
                this._keys = [];
                this.keysLeft = [68];
                this.keysRight = [65];
                this.sensibility = 0.01;
        }

        // Hooking keyboard events
        FreeCameraKeyboardRotateInput.prototype.attachControl = function (element, noPreventDefault) {
            var _this = this;
            if (!this._onKeyDown) {
                element.tabIndex = 1;
                this._onKeyDown = function (evt) {
                    if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRight.indexOf(evt.keyCode) !== -1) {
                        var index = _this._keys.indexOf(evt.keyCode);
                        if (index === -1) {
                            _this._keys.push(evt.keyCode);
                        }
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
                this._onKeyUp = function (evt) {
                    if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRight.indexOf(evt.keyCode) !== -1) {
                        var index = _this._keys.indexOf(evt.keyCode);
                        if (index >= 0) {
                            _this._keys.splice(index, 1);
                        }
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };

                element.addEventListener("keydown", this._onKeyDown, false);
                element.addEventListener("keyup", this._onKeyUp, false);
                BABYLON.Tools.RegisterTopRootEvents([
                    { name: "blur", handler: this._onLostFocus }
                ]);
            }
        };

        // Unhook
        FreeCameraKeyboardRotateInput.prototype.detachControl = function (element) {
            if (this._onKeyDown) {
                element.removeEventListener("keydown", this._onKeyDown);
                element.removeEventListener("keyup", this._onKeyUp);
                BABYLON.Tools.UnregisterTopRootEvents([
                    { name: "blur", handler: this._onLostFocus }
                ]);
                this._keys = [];
                this._onKeyDown = null;
                this._onKeyUp = null;
            }
        };

        // This function is called by the system on every frame
        FreeCameraKeyboardRotateInput.prototype.checkInputs = function () {
            if (this._onKeyDown) {
                var camera = this.camera;
                // Keyboard
                for (var index = 0; index < this._keys.length; index++) {
                    var keyCode = this._keys[index];
                    if (this.keysLeft.indexOf(keyCode) !== -1) {
                        camera.cameraRotation.y += this.sensibility;
                    }
                    else if (this.keysRight.indexOf(keyCode) !== -1) {
                        camera.cameraRotation.y -= this.sensibility;
                    }
                }
            }
        };
        FreeCameraKeyboardRotateInput.prototype.getTypeName = function () {
            return "FreeCameraKeyboardRotateInput";
        };
        FreeCameraKeyboardRotateInput.prototype._onLostFocus = function (e) {
            this._keys = [];
        };
        FreeCameraKeyboardRotateInput.prototype.getSimpleName = function () {
            return "keyboardRotate";
        };

        // Connect to camera:
        camera.inputs.add(new FreeCameraKeyboardRotateInput());
    }

}

var player = new CameraPlayer();

export {
    player
};

