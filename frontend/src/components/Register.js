import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	function handleChangeEmail(evt) {
		setEmail(evt.target.value)
	};

	function handleChangePassword(evt) {
		setPassword(evt.target.value)
	};

	function handleSubmit(evt) {
		evt.preventDefault();
		onRegister(password, email)
	};

	return (
		<div className='form__wrapper' >
			<h2 className='popup__title form__title'>Регистрация</h2>
			<form
				className='form'
				name='profile-info'
				onSubmit={handleSubmit}
			>
				<div className='form__input-wrapper' >
					<input
						className='form__input'
						type='email'
						name='regemail'
						required
						placeholder='Email'
						value={email || ''}
						onChange={handleChangeEmail}
					/>
					<input
						className='form__input'
						type='password'
						name='regpass'
						required
						placeholder='Пароль'
						value={password || ''}
						onChange={handleChangePassword}
					/>
				</div>

				<button
					className='form__btn-save'
					type='submit'
				>Зарегистрироваться
				</button>
			</form>
			<p className='popup__login-link' >Уже зарегистрированы? <Link className='header__link' to='/sign-in'>Войти</Link></p>
		</div >
	);
};

export default Register