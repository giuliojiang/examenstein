let playing = new Set();

export class SoundEngine {

    static playUnique(soundfile) {
        if (playing.has(soundfile)) {
            return;
        }

        playing.add(soundfile);
        let audio = new Audio(soundfile);
        audio.play();
        audio.onended = () => {
            playing.delete(soundfile);
        }
    }

    static play(soundfile) {
        let audio = new Audio(soundfile);
        audio.volume = 0.3;
        audio.play();
    }

}