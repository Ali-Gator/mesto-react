import '../index.css';
import React, {useState} from 'react';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
    const [isConfirmPopupOpen, setConfirmPopup] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [isSaving, setIsSaving] = useState(false);

    React.useEffect(() => {
        Promise.all([api.getInitialUser(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch(err => console.log(err));
    }, []);

    function handleEditAvatarClick() {
        setEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopup(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopup(true);
    }

    function handleImageClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setEditAvatarPopup(false);
        setEditProfilePopup(false);
        setAddPlacePopup(false);
        setConfirmPopup(false);
        setSelectedCard(null);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(user => user._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => {
                setCards(state => state.map(c => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .finally(() => {
                setCards(state => state.filter(c => c._id !== card._id));
            })
            .catch(err => console.log(err));
    }

    function handleUpdateUser(user) {
        setIsSaving(true);
        api.patchProfile(user)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch(err => {
                alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
            })
            .finally(() => setIsSaving(false));
    }

    function handleUpdateAvatar(avatar) {
        setIsSaving(true);
        api.patchAvatar(avatar)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch(err => {
                alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
            })
            .finally(() => setIsSaving(false));
    }

    function handleAddCard(card) {
        setIsSaving(true);
        api.postCard(card)
            .then(newCard => {
                setCards(state => [newCard, ...state]);
                closeAllPopups();
            })
            .catch(err => {
                alert(`${err}. Не удается отправить. Попробуйте ещё раз`);
            })
            .finally(() => setIsSaving(false));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick} onImageClick={handleImageClick} cards={cards}
                      onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                />
                <Footer/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar} isSaving={isSaving}/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser} isSaving={isSaving}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}
                               isSaving={isSaving}/>
                <PopupWithForm isOpen={isConfirmPopupOpen}
                               onClose={closeAllPopups} title="Вы уверены?" name="confirm"/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
