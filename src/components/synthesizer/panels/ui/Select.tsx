import { useEffect, useState } from "react";
import "./select.css";

interface SelectProps {
	title: string;
	selection: string[];
	onChange: (osc: string) => void;
}

const Select: React.FC<SelectProps> = ({ title, selection, onChange }) => {
	const [selected, setSelected] = useState(0);

	return (
		<div>
			<div className="select-title">{title}</div>
			<form className="select-form">
				{selection.map((v, i) => {
					return (
						<label key={i}>
							{v}
							<input
								className="select-radio"
								type="radio"
								name="selection"
								value={v}
								onChange={() => {
									onChange(v);
									setSelected(i);
								}}
								checked={selected === i}
							/>
						</label>
					);
				})}
			</form>
		</div>
	);
};

export default Select;
