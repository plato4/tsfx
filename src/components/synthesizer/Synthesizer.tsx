import "./synthesizer.css";

import { useState } from "react";

import * as Synth from "../../Synth";

import OscillatorSelection from "./panels/OscillatorSelection";
import OscillatorControls from "./panels/OscillatorControls";
import AmpControls from "./panels/AmpControls";
import FreqControls from "./panels/FreqControls";
import PhaserControls from "./panels/PhaserControls";
import ChebyshevControls from "./panels/ChebyshevControls";
import AutoWahControls from "./panels/AutoWahControls";
import TremoloControls from "./panels/TremoloControls";
import VibratoControls from "./panels/VibratoControls";

interface SynthesizerProps {
	settings: Synth.ISettings;
}

const Synthesizer: React.FC<SynthesizerProps> = ({ settings }) => {
	const [oscType, setOscType] = useState("OSC");

	const selection = ["OSC", "AM", "FM", "FAT", "PULSE", "PWM"];

	return (
		<div className="synthesizer">
			<div className="synthesizer-inner">
				<div className="panel panel-sfx">1</div>
				<div className="panel panel-osc">
					<OscillatorSelection
						selection={selection}
						onChange={(v) => setOscType(v)}
					/>
				</div>
				<div className="panel panel-settings">
					<OscillatorControls oscType={oscType} options={settings.options} />
				</div>
				<div className="panel" style={{ gridColumn: 2, gridRow: 3 }}>
					4
				</div>
				<div className="panel" style={{ gridColumn: 3, gridRow: 3 }}>
					<AmpControls config={settings.amp} />
				</div>
				<div className="panel" style={{ gridColumn: 4, gridRow: 3 }}>
					<FreqControls config={settings.freq} />
				</div>
				<div className="panel" style={{ gridColumn: 5, gridRow: 3 }}>
					<VibratoControls config={settings.vibrato} />
				</div>
				<div className="panel" style={{ gridColumn: 6, gridRow: 3 }}>
					<TremoloControls config={settings.tremolo} />
				</div>
				<div className="panel" style={{ gridColumn: 2, gridRow: 4 }}>
					9
				</div>
				<div className="panel" style={{ gridColumn: 3, gridRow: 4 }}>
					<PhaserControls config={settings.phaser} />
				</div>
				<div className="panel" style={{ gridColumn: 4, gridRow: 4 }}>
					<ChebyshevControls config={settings.chebyshev} />
				</div>
				<div className="panel" style={{ gridColumn: 5, gridRow: 4 }}>
					<AutoWahControls config={settings.autoWah} />
				</div>
				<div className="panel" style={{ gridColumn: 6, gridRow: 4 }}>
					13
				</div>
			</div>
		</div>
	);
};

export default Synthesizer;
