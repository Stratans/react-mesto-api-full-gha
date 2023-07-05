import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm'


/* Попап "Редактировать профиль" */
function EditAvatarPopup({onUpdateAvatar, isOpen, onClose, buttonText}) {

	const avatarRef = useRef();

	function handleSubmit(evt) {
		evt.preventDefault()
		onUpdateAvatar(avatarRef.current.value)
	};

	useEffect(() => {
		avatarRef.current.value = ''
	}, [isOpen]);

	return (
		<PopupWithForm
			name='avatar'
			title='Обновить аватар'
			isOpen={isOpen}
			onClose={onClose}
			buttonText={buttonText}
			onSubmit={handleSubmit}
		>
			<input
				ref={avatarRef}
				className='popup__input popup__input_avatar'
				type='url'
				name='avatar'
				placeholder='Ссылка на картинку'
				required />
			<span className='popup__input-error avatar-error'></span>
		</PopupWithForm>
	);
};

export default EditAvatarPopup