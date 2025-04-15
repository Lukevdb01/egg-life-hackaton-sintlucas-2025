class AudioEngine {

    private audioCtx: AudioContext;
    /**
     *
     */
    constructor(_ctx: AudioContext) {
        this.audioCtx = _ctx;
    }

    async playAudioFromUrl(url: string): Promise<void> {
        
    }
}
export default AudioEngine;