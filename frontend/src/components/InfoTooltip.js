import regSuccessImg from '../images/reg-success.png'
import regFailImg from '../images/reg-fail.png'
import usePopupClose from '../hooks/usePopupClose';

function InfoTooltip({ isOpen, onClose, isDoneSignUp }) {

	usePopupClose(isOpen, onClose)

	return (
		<div className={`popup ${isOpen && 'popup_opened'}`}>
			<div className='popup__container popup__container_type_info'>
				<button
					className='popup__close'
					type='button'
					onClick={onClose}
				>
				</button>
				<img className='popup__icon' src={isDoneSignUp ? regSuccessImg : regFailImg} />
				<h2 className='popup__title popup__title_type_info'>{
					isDoneSignUp
						? 'Вы успешно зарегистрировались!'
						: 'Что-то пошло не так! Попробуйте ещё раз.'
				}</h2>
			</div>
		</div >
	);
};

export default InfoTooltip