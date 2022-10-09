import "./key.css";

interface KeyProps {
	note: string;
	onPlay: (n: string) => void;
}
const Key: React.FC<KeyProps> = ({ note, onPlay }) => {
	const bg = note.includes("#") ? "black" : "white";
	return (
		<div
			className="key key-in"
			style={{
				background: bg,
				color: bg === "black" ? "white" : "black",
				boxShadow:
					bg === "black" ? "0px 0px 15px 0px black" : "0px 0px 0px 0px black",
				zIndex: bg === "black" ? 2 : 1,
			}}
			onClick={() => onPlay(note)}
		></div>
	);
};

export default Key;
