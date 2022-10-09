import "./panels.css";

import * as Tone from "tone";

import Knob from "./ui/Knob";
import { useState } from "react";

interface ChebyshevControlsProps {
	config: { enabled: boolean; options: Partial<Tone.ChebyshevOptions> };
}

const ChebyshevControls: React.FC<ChebyshevControlsProps> = ({ config }) => {
	const [checked, setChecked] = useState(config.enabled);
	return (
		<div className="controls-container">
			<div>Chebyshev</div>
			<input
				type="checkbox"
				onClick={() => {
					config.enabled = !config.enabled;
					setChecked(config.enabled);
				}}
				checked={config.enabled}
			/>
			<Knob
				title={"order"}
				initial={(config.options.order as number) ?? 0}
				max={100}
				min={0}
				step={1}
				onChange={(v) => (config.options.order = v)}
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
export default ChebyshevControls;
