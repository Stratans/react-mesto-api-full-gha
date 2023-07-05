import { useState } from 'react';

function Login({ onAuthorization }) {

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
		onAuthorization(password, email)
	};


	return (
		<div className='form__wrapper'>
			<h2 className='popup__title form__title'>Вход</h2>
			<form
				className={`form`}
				name='profile-info'
				onSubmit={handleSubmit}
			>
				<div className='form__input-wrapper' >
					<input
						className='form__input'
						type='email'
						name='signupemail'
						required
						placeholder='Email'
						value={email || ''}
						onChange={handleChangeEmail}
					/>
					<input
						className='form__input'
						type='password'
						name='signuppass'
						required
						placeholder='Пароль'
						value={password || ''}
						onChange={handleChangePassword}
					/>
				</div>

				<button
					className='form__btn-save'
					type='submit'
				>Войти
				</button>
			</form>
		</div >
	);
};

export default Login