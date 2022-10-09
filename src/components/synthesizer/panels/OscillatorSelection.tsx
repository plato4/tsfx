import "./panels.css";

import Select from "./ui/Select";

interface OscillatorSelectionProps {
	selection: string[];
	onChange: (osc: string) => void;
}

const OscillatorSelection: React.FC<OscillatorSelectionProps> = ({
	selection,
	onChange,
}) => (
	<Select
		title={"Oscillator"}
		selection={selection}
		onChange={(v) => onChange(v)}
	/>
);

export default OscillatorSelection;
