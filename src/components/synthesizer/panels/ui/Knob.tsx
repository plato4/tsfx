import React, { useState } from "react";
import "./knob.css";

interface KnobProps {
	title: string;
	initial: number;
	min: number;
	max: number;
	step: number;
	onChange: (value: number) => void;
}

const Knob: React.FC<KnobProps> = ({ title, initial, min, max, step, onChange }) => {
	const [value, setValue] = useState(initial);
	return (
		<div className="knob-container">
			<div className="knob-text">{title}</div>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				defaultValue={initial}
				className="slider"
				onChange={(e) => {
					const v = parseFloat(e.currentTarget.value);
					setValue(v);
					onChange(v);
				}}
			/>
			<div className="knob-value">{value}</div>
		</div>
	);
};

export default Knob;
