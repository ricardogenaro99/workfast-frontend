import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { API_BACKEND } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../hooks/useForm";
import {
	ButtonPrimaryPurple,
	CardDefault,
	ControlGrid,
	FormDefault,
	InputLabel
} from "../../shared/components";

const initialForm = {
	name: "",
	lastname: "",
	city: "",
	country: "",
	email: "",
};

const ConfigurarCuenta = () => {
	const { setLoading } = useAuth();
	const [userDb, setUserDb] = useState(null);
	const { form, handleChange, setForm } = useForm(initialForm);

	useEffect(() => {
		setLoading(true);
		const userFetch = async () => {
			try {
				const _idUserDb = JSON.parse(localStorage.getItem("_idUserDb"));
				if (_idUserDb) {
					const { data } = await helpHttp().get(
						`${API_BACKEND}/users/${_idUserDb}`,
					);
					if (data) {
						setUserDb(data);
						setForm(data.details);
					}
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		return () => userFetch();
	}, [setForm, setLoading]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const options = {
			body: {
				details: {
					...userDb.details,
					name: form.name,
					lastname: form.lastname,
					city: form.city,
					country: form.country,
				},
			},
		};
		await helpHttp().put(`${API_BACKEND}/users/${userDb._id}`, options);
		setLoading(false);
	};

	return (
		<CardDefault>
			<FormDefault onSubmit={handleSubmit}>
				<Fragment>
					<InputLabel
						label="Nombres"
						name="name"
						placeholder="Ingrese sus nombres"
						value={form.name}
						onChange={handleChange}
					/>
					<InputLabel
						label="Apellidos"
						name="lastname"
						placeholder="Ingrese sus apellidos"
						value={form.lastname}
						onChange={handleChange}
					/>
					<InputLabel
						label="País"
						name="country"
						placeholder="Ingrese su País"
						value={form.country}
						onChange={handleChange}
					/>
					<InputLabel
						label="Ciudad"
						name="city"
						placeholder="Ingrese su Ciudad"
						value={form.city}
						onChange={handleChange}
					/>
				</Fragment>
				<ControlGrid>
					<ButtonPrimaryPurple type="submit">
						Guardar
					</ButtonPrimaryPurple>
				</ControlGrid>
			</FormDefault>
		</CardDefault>
	);
};

export default ConfigurarCuenta;