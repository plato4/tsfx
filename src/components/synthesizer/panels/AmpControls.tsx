import "./panels.css";

import * as Tone from "tone";

import Knob from "./ui/Knob";

interface AmpControlsProps {
	config: { enabled: true; options: Partial<Tone.EnvelopeOptions> };
}

const AmpControls: React.FC<AmpControlsProps> = ({ config }) => {
	return (
		<div className="controls-container">
			<div>Amp</div>
			<Knob
				title={"attack"}
				initial={(config.options.attack as number) ?? 0}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => (config.options.attack = v)}
			/>

			<Knob
				title={"release"}
				initial={(config.options.release as number) ?? 0}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => (config.options.release = v)}
			/>
		</div>
	);
};
export default AmpControls;
