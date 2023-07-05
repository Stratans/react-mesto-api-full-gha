import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({card, onCardClick, onCardLike, onCardDelete}) {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeBtn = (
		`element__btn-like ${isLiked && 'element__btn-like_active'}`
	);

	function handleCardClick() {
		onCardClick(card)
	};

	function handleLikeClick() {
		onCardLike(card)
	};

	function handleDeleteClick() {
		onCardDelete(card)
	};

	return (
		<article className='element'>
			<img
				className='element__img'
				src={card.link}
				alt={card.name}
				onClick={handleCardClick}
			/>
			<div className='element__info'>
				<h2 className='element__title'>{card.name}</h2>
				<div className='element__like-container' >
					<button
						type='button'
						className={cardLikeBtn}
						onClick={handleLikeClick}
					></button>
					<p className='element__like-number'>{card.likes.length}</p>
				</div>
			</div>
			{isOwn &&
				<button
					type='button'
					className='element__btn-trash'
					onClick={handleDeleteClick}>
				</button>}
		</article>
	);
};

export default Card