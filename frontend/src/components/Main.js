import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {

	const currentUser = useContext(CurrentUserContext);
	const cardsElements = cards.map(card => (
		<Card
			key={card._id}
			card={card}
			onCardClick={onCardClick}
			onCardLike={onCardLike}
			onCardDelete={onCardDelete}
		/>
	));

	return (
		<main className='content'>
			<section className='profile'>
				<div className='profile__avatar-container' onClick={onEditAvatar}>
					<img
						className='profile__avatar'
						src={currentUser.avatar}
						alt='пользовательский аватар'
					/>
				</div>
				<div className='profile__info'>
					<h1 className='profile__name'>{currentUser.name}</h1>
					<button
						type='button'
						className='profile__edit-btn'
						onClick={onEditProfile}
					></button>
					<p className='profile__job'>{currentUser.about}</p>
				</div>
				<button
					type='button'
					className='profile__add-btn'
					onClick={onAddPlace}>
				</button>
			</section>
			<section className='elements' aria-label='Фотогалерея'>
				{cardsElements}
			</section>
		</main>
	);
};

export default Main