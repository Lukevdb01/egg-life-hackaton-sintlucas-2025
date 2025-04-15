class AudioEngine {

    private audioCtx: AudioContext;
    /**
     *
     */
    constructor(_ctx: AudioContext) {
        this.audioCtx = _ctx;
    }

    async playAudioFromUrl(url: string): Promise<void> {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
            const source = this.audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(this.audioCtx.destination);
            source.start(0);
        } catch (error) {
            console.error("Fout bij het afspelen van audio:", error);
        }
    }
}
export default AudioEngine;