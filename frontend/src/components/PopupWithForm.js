import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({ name, isOpen, onClose, title, onSubmit, children, buttonText }) {

	usePopupClose(isOpen, onClose)

	return (
		<div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
			<div className='popup__container'>
				<button
					className='popup__close'
					type='button'
					onClick={onClose}
				>
				</button>
				<h2 className='popup__title'>{title}</h2>
				<form
					className={`popup__form popup__form_type_${name}`}
					name='profile-info'
					onSubmit={onSubmit}
				>
					{children}
					<button
						className='popup__btn-save'
						type='submit'
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div >
	);
};

export default PopupWithForm