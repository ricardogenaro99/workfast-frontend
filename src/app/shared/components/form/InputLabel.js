import { useId } from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	outline: 1px solid var(--color-grey);
	padding: 8px 16px;
	gap: 3px;
	border-radius: var(--border-radius-global);
	* {
		background: transparent;
		font-weight: 400;
	}

	label {
		color: var(--color-grey);
	}

	input {
		color: var(--color-black);
		border: none;
		outline: none;
	}
`;
const InputLabel = ({
	name,
	type = "text",
	placeholder,
	label,
	value,
	onChange,
	validation,
}) => {
	const inputId = useId();
	return (
		<Container>
			<label htmlFor={inputId}>{label}</label>
			<input
				id={inputId}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</Container>
	);
};

export default InputLabel;
