import "./panels.css";

import * as Tone from "tone";
import { NonCustomOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";

import Knob from "./ui/Knob";
import Select from "./ui/Select";

import { useState } from "react";

interface TremoloControlsProps {
	config: { enabled: boolean; options: Partial<Tone.TremoloOptions> };
}

const TremoloControls: React.FC<TremoloControlsProps> = ({ config }) => {
	const [checked, setChecked] = useState(config.enabled);
	return (
		<div className="controls-container">
			<div>Tremolo</div>
			<input
				type="checkbox"
				onClick={() => {
					config.enabled = !config.enabled;
					setChecked(config.enabled);
				}}
				checked={config.enabled}
			/>
			<Knob
				title={"depth"}
				initial={(config.options.depth as number) ?? 0}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => (config.options.depth = v)}
			/>
			<Knob
				title={"frequency"}
				initial={(config.options.frequency as number) ?? 0}
				max={100}
				min={0}
				step={1}
				onChange={(v) => (config.options.frequency = v)}
			/>
			<Knob
				title={"spread"}
				initial={(config.options.spread as number) ?? 0}
				max={360}
				min={0}
				step={1}
				onChange={(v) => (config.options.spread = v)}
			/>
			<Select
				title={"type"}
				selection={["sine", "square", "triangle", "sawtooth"]}
				onChange={(v) => (config.options.type = v as NonCustomOscillatorType)}
			/>
			<Knob
				title={"wet"}
				initial={(config.options.wet as number) ?? 0}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => (config.options.wet = v)}
			/>
		</div>
	);
};
export default TremoloControls;
