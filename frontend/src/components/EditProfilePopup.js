import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


/* Попап "Редактировать профиль" */
function EditProfilePopup({isOpen, onUpdateProfile, buttonText, onClose}) {

	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');

	useEffect(() => {
		setName(currentUser.name)
		setAbout(currentUser.about)
	}, [currentUser, isOpen]);

	function handleChangeName(evt) {
		setName(evt.target.value)
	};

	function handleChangeAbout(evt) {
		setAbout(evt.target.value)
	};

	function handleSubmit(evt) {
		evt.preventDefault()
		onUpdateProfile({ name, about })
	};

	return (
		<PopupWithForm
			name='edit'
			title='Редактировать профиль'
			isOpen={isOpen}
			buttonText={buttonText}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				value={name || ''}
				onChange={handleChangeName}
				className='popup__input popup__input_profile_name'
				type='text'
				name='name'
				required
				placeholder='Введите имя'
				minLength='2'
				maxLength='40' />
			<span className='popup__input-error input-name-error'></span>
			<input
				value={about || ''}
				onChange={handleChangeAbout}
				className='popup__input popup__input_profile_about'
				type='text'
				name='about'
				required
				placeholder='Введите профессию'
				minLength='2'
				maxLength='200' />
			<span className='popup__input-error input-about-error'></span>
		</PopupWithForm>
	);
};

export default EditProfilePopup