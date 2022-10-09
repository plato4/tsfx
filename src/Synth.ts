import * as Tone from "tone";

export type Options = Partial<Tone.OmniOscillatorOptions>;

export interface ISettings {
	options: Options;
	amp: { enabled: true; options: Partial<Tone.EnvelopeOptions> };
	freq: { enabled: boolean; options: Partial<Tone.FrequencyEnvelopeOptions> };
	phaser: { enabled: boolean; options: Partial<Tone.PhaserOptions> };
	chebyshev: { enabled: boolean; options: Partial<Tone.ChebyshevOptions> };
	autoWah: { enabled: boolean; options: Partial<Tone.AutoWahOptions> };
	tremolo: { enabled: boolean; options: Partial<Tone.TremoloOptions> };
	vibrato: { enabled: boolean; options: Partial<Tone.VibratoOptions> };
}

export default class Synth {
	public settings: ISettings = {
		options: {},
		amp: { enabled: true, options: { attack: 0.1, release: 1 } },
		freq: { enabled: true, options: { attack: 0, release: 0.5, octaves: 0 } },
		phaser: {
			enabled: true,
			options: {
				frequency: 15,
				octaves: 5,
				wet: 0.5,
				stages: 5,
				baseFrequency: 1000,
			},
		},
		chebyshev: { enabled: true, options: { order: 50, wet: 0.5 } },
		autoWah: {
			enabled: true,
			options: { Q: 6, baseFrequency: 50, octaves: 5, sensitivity: -30 },
		},
		tremolo: {
			enabled: true,
			options: {
				depth: 0.5,
				frequency: 15,
				spread: 180,
				type: "sine",
				wet: 0.5,
			},
		},
		vibrato: {
			enabled: true,
			options: {
				depth: 0.5,
				frequency: 15,
				maxDelay: 0.1,
				type: "sine",
				wet: 0.5,
			},
		},
	};

	public play(note: string): void {
		const connectables: Tone.ToneAudioNode[] = [];

		this.settings.options.frequency = note;
		const oscillator = new Tone.OmniOscillator(this.settings.options);
		connectables.push(oscillator);
		oscillator.start();

		let freqEnv: Tone.FrequencyEnvelope | undefined = undefined;
		if (this.settings.freq.enabled) {
			freqEnv = new Tone.FrequencyEnvelope(this.settings.freq.options);
			freqEnv.baseFrequency = this.settings.options.frequency;
			freqEnv.connect(oscillator.frequency);
		}

		let amp: Tone.AmplitudeEnvelope | undefined = undefined;
		if (this.settings.amp.enabled) {
			amp = new Tone.AmplitudeEnvelope(this.settings.amp.options);
			connectables.push(amp);
		}

		if (this.settings.tremolo.enabled) {
			const trem = new Tone.Tremolo(this.settings.tremolo.options);
			connectables.push(trem);
		}

		if (this.settings.vibrato.enabled) {
			const vib = new Tone.Vibrato(this.settings.vibrato.options);
			connectables.push(vib);
		}

		if (this.settings.phaser.enabled) {
			this.settings.phaser.options.baseFrequency =
				this.settings.options.frequency;
			const phaser = new Tone.Phaser(this.settings.phaser.options);
			connectables.push(phaser);
		}

		if (this.settings.chebyshev.enabled) {
			const chebyshev = new Tone.Chebyshev(this.settings.chebyshev.options);
			connectables.push(chebyshev);
		}

		if (this.settings.autoWah.enabled) {
			const autoWah = new Tone.AutoWah(this.settings.autoWah.options);
			connectables.push(autoWah);
			autoWah.Q.value = 10;
		}

		this.connectEverything(connectables);

		freqEnv && connectables.push(freqEnv);
		freqEnv?.triggerAttackRelease("32t");
		amp?.triggerAttackRelease("32t");

		setTimeout(() => this.clearConnectables(connectables), 3000);
	}

	private clearConnectables(connectables: Tone.ToneAudioNode[]) {
		connectables.forEach((v) => {
			v.disconnect();
			v.dispose();
		});
		connectables = [];
	}

	private connectEverything(connectables: Tone.ToneAudioNode[]) {
		connectables.forEach((v, i) => {
			if (i < connectables.length - 1) v.connect(connectables[i + 1]);
			else v.toDestination();
		});
	}
}
