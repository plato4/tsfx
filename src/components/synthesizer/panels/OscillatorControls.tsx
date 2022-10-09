import "./panels.css";

import {
	AMOscillatorOptions,
	FatOscillatorOptions,
	FMOscillatorOptions,
	NonCustomOscillatorType,
	PulseOscillatorOptions,
	PWMOscillatorOptions,
} from "tone/build/esm/source/oscillator/OscillatorInterface";
import { AudioRange, Hertz } from "tone/build/esm/core/type/Units";

import Knob from "./ui/Knob";
import Select from "./ui/Select";
import { Options } from "../../../Synth";

interface OscillatorControlsProps {
	oscType: string;
	options: Options;
}

const OscillatorControls: React.FC<OscillatorControlsProps> = ({
	oscType,
	options,
}) => {
	let controls = <div style={{ textAlign: "center" }}>Unknown Oscillator</div>;
	switch (oscType) {
		case "OSC":
			controls = <OSC options={options} />;
			break;
		case "AM":
			controls = <AM options={options} />;
			break;
		case "FM":
			controls = <FM options={options} />;
			break;
		case "FAT":
			controls = <FAT options={options} />;
			break;
		case "PWM":
			controls = <PWM options={options} />;
			break;
		case "PULSE":
			controls = <PULSE options={options} />;
			break;
	}
	return <div>{controls}</div>;
};

interface OscillatorProps {
	options: Options;
}

const OSC: React.FC<OscillatorProps> = ({ options }) => {
	options.type = "sine";
	return (
		<div className="controls-container">
			<Select
				title={"Waveform"}
				selection={["sine", "square", "triangle", "sawtooth"]}
				onChange={(v) => (options.type = v as NonCustomOscillatorType)}
			/>
		</div>
	);
};

const AM: React.FC<OscillatorProps> = ({ options }) => {
	options.type = "amsine";
	(options as AMOscillatorOptions).harmonicity = 0.5;
	(options as AMOscillatorOptions).modulationType = "sine";
	return (
		<div className="controls-container">
			<Select
				title={"Waveform"}
				selection={["amsine", "amsquare", "amtriangle", "amsawtooth"]}
				onChange={(v) => (options.type = v as NonCustomOscillatorType)}
			/>

			<Knob
				title={"harminocity"}
				initial={(options as AMOscillatorOptions).harmonicity}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => ((options as AMOscillatorOptions).harmonicity = v)}
			/>
			<Select
				title={"Modulation"}
				selection={["sine", "square", "triangle", "sawtooth"]}
				onChange={(v) =>
					((options as AMOscillatorOptions).modulationType =
						v as NonCustomOscillatorType)
				}
			/>
		</div>
	);
};

const FM: React.FC<OscillatorProps> = ({ options }) => {
	options.type = "fmsine";
	(options as FMOscillatorOptions).harmonicity = 0.5;
	(options as FMOscillatorOptions).modulationType = "sine";
	(options as FMOscillatorOptions).modulationIndex = 50;
	return (
		<div className="controls-container">
			<Select
				title={"Waveform"}
				selection={["fmsine", "fmsquare", "fmtriangle", "fmsawtooth"]}
				onChange={(v) => (options.type = v as NonCustomOscillatorType)}
			/>

			<Knob
				title={"harminocity"}
				initial={(options as FMOscillatorOptions).harmonicity}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => ((options as FMOscillatorOptions).harmonicity = v)}
			/>
			<Select
				title={"Modulation"}
				selection={["sine", "square", "triangle", "sawtooth"]}
				onChange={(v) =>
					((options as FMOscillatorOptions).modulationType =
						v as NonCustomOscillatorType)
				}
			/>
			<Knob
				title={"modulation index"}
				initial={(options as FMOscillatorOptions).modulationIndex}
				max={100}
				min={0}
				step={1}
				onChange={(v) => ((options as FMOscillatorOptions).modulationIndex = v)}
			/>
		</div>
	);
};

const FAT: React.FC<OscillatorProps> = ({ options }) => {
	options.type = "fatsine";
	(options as FatOscillatorOptions).spread = 50;
	(options as FatOscillatorOptions).count = 5;
	return (
		<div className="controls-container">
			<Select
				title={"Waveform"}
				selection={["fatsine", "fatsquare", "fattriangle", "fatsawtooth"]}
				onChange={(v) => (options.type = v as NonCustomOscillatorType)}
			/>

			<Knob
				title={"spread"}
				initial={(options as FatOscillatorOptions).spread}
				max={100}
				min={0}
				step={1}
				onChange={(v) => ((options as FatOscillatorOptions).spread = v)}
			/>
			<Knob
				title={"count"}
				initial={(options as FatOscillatorOptions).count}
				max={10}
				min={1}
				step={1}
				onChange={(v) => ((options as FatOscillatorOptions).count = v)}
			/>
		</div>
	);
};

const PULSE: React.FC<OscillatorProps> = ({ options }) => {
	options.type = "pulse";
	(options as PulseOscillatorOptions).width = 0.5;
	return (
		<div className="controls-container">
			<Knob
				title={"width"}
				initial={(options as PulseOscillatorOptions).width as AudioRange}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) =>
					((options as PulseOscillatorOptions).width = v as AudioRange)
				}
			/>
		</div>
	);
};

const PWM: React.FC<OscillatorProps> = ({ options }) => {
	options.type = "pwm";
	(options as PWMOscillatorOptions).modulationFrequency = 50;
	return (
		<div className="controls-container">
			<Knob
				title={"modulation"}
				initial={(options as PWMOscillatorOptions).modulationFrequency as Hertz}
				max={100}
				min={0}
				step={1}
				onChange={(v) =>
					((options as PWMOscillatorOptions).modulationFrequency = v as Hertz)
				}
			/>
		</div>
	);
};

export default OscillatorControls;
