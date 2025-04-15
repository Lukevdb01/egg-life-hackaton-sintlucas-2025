class AudioEngine {
    private audioCtx: AudioContext;

    constructor(_ctx: AudioContext) {
        this.audioCtx = _ctx;
    }

    async playAudioFromUrl(url: string, volume: number = 1.0): Promise<void> {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);

            const source = this.audioCtx.createBufferSource();
            source.buffer = audioBuffer;

            const gainNode = this.audioCtx.createGain();
            gainNode.gain.value = volume;

            source.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);

            source.start(0);
        } catch (error) {
            console.error("Fout bij het afspelen van audio:", error);
        }
    }
}

export default AudioEngine;
