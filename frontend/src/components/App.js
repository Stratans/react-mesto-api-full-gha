import { useState, useEffect, } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { api } from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login'
import Register from './Register'
import ProtectedRouteElement from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
import * as auth from '../utils/auth'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [doneSignUp, setDoneSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState('');



  const handleCardClick = (props) => {
    setSelectedCard(props);
    setIsViewPopupOpen(true);
  };

  function handleLikeCard(element) {
    const isLiked = element.likes.some(i => i._id === currentUser._id);

    api.toggleLike(element._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === element._id ? newCard : c))
    })
      .catch(err => { console.log(err) })
  };

  function handleCardDelete(cardToDelete) {
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state
          .filter((item) => item._id !== cardToDelete._id))
      })
      .catch(err => { console.log(err) })
  };

  function handleUpdateProfile({ name, about }) {
    api.updateProfile({ name, about })
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
  };

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
  };

  function handleAddPlace({ name, link }) {
    api.setCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => { console.log(err) })
  };


  const navigate = useNavigate();

  function handleRegister(password, email) {
    auth.registration(password, email)
      .then((data) => {
        setDoneSignUp(true);
        setInfoTooltipOpen(true);
        navigate('/sign-in');
      })
      .catch(err => {
        console.log(err);
        setDoneSignUp(false);
        setInfoTooltipOpen(true);
      })
  };

  function handleAuthorization(password, email) {
    auth.authorization(password, email)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('token', data.token)
        navigate('/');
      })
      .catch(err => {
        console.log(err)
      })
  };

  function signOut() {
    setLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/sign-in')
  }


  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          // console.log(initialCards)
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch(err => { console.log(err) })
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.email);
            setLoggedIn(true)
            navigate('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsViewPopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={userEmail} signOut={signOut} />
        <Routes>
          <Route path='/' element={
            <ProtectedRouteElement
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleLikeCard}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            />
          } />
          <Route path='/sign-in' element={<Login onAuthorization={handleAuthorization} />} />
          <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
          <Route path='*' element={<Navigate to='/sign-in' />} />
        </Routes>

        <Footer />
        <InfoTooltip isOpen={infoTooltipOpen} onClose={closeAllPopups} isDoneSignUp={doneSignUp} />
        {/* Попап "Редактировать профиль" */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          buttonText='Сохранить'
          onClose={closeAllPopups}
          onUpdateProfile={handleUpdateProfile}
        />

        {/* Попап "Обновить аватар"  */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText='Сохранить'
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Попап "Добавление места" */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText='Создать'
          onAddPlace={handleAddPlace}
        />

        {/* Попап "Просмотр картинки" */}
        <ImagePopup
          isOpen={isViewPopupOpen}
          name='show'
          card={selectedCard}
          onClose={closeAllPopups}
        />

        {/* Попап "Подтверждение удаления карточки"  */}
        <PopupWithForm name='delete' title='Вы уверены?' buttonText='Да' />
      </div>
    </CurrentUserContext.Provider>
  );
};


export default App