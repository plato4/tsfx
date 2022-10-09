import "./panels.css";

import * as Tone from "tone";

import Knob from "./ui/Knob";
import { useState } from "react";

interface PhaserControlsProps {
	config: { enabled: boolean; options: Partial<Tone.PhaserOptions> };
}

const PhaserControls: React.FC<PhaserControlsProps> = ({ config }) => {
	const [checked, setChecked] = useState(config.enabled);
	return (
		<div className="controls-container">
			<div>Phaser</div>
			<input
				type="checkbox"
				onClick={() => {
					config.enabled = !config.enabled;
					setChecked(config.enabled);
				}}
				checked={config.enabled}
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
				title={"octaves"}
				initial={(config.options.octaves as number) ?? 0}
				max={5}
				min={-5}
				step={1}
				onChange={(v) => (config.options.octaves = v)}
			/>
			<Knob
				title={"wet"}
				initial={(config.options.wet as number) ?? 0}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => (config.options.wet = v)}
			/>
			<Knob
				title={"stages"}
				initial={(config.options.stages as number) ?? 0}
				max={10}
				min={0}
				step={1}
				onChange={(v) => (config.options.stages = v)}
			/>
		</div>
	);
};
export default PhaserControls;
