import React from 'react';
import '../index.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from '../contexts/CardsContext';
import Api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {apiData} from '../utils/constants';

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
    const [isConfirmPopupOpen, setConfirmPopup] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const api = new Api(apiData);

    React.useEffect(() => {
        Promise.all([api.getInitialUser(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch(err => console.log(err));
        ;
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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={cards}>
                <div className="page">
                    <Header/>
                    <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick} onImageClick={handleImageClick}
                    />
                    <Footer/>
                    <PopupWithForm isOpen={isEditAvatarPopupOpen}
                                   onClose={closeAllPopups}
                                   title="Обновить аватар"
                                   name="avatar">
                        <div className="popup__input-wrapper">
                            <input className="popup__text-input popup__text-input_type_avatar-link"
                                   id="avatar-link-field" type="url"
                                   name="avatar-link" placeholder="Ссылка на аватар" required/>
                            <span className="avatar-link-field-error popup__input-error"></span>
                        </div>
                    </PopupWithForm>

                    <PopupWithForm isOpen={isEditProfilePopupOpen}
                                   onClose={closeAllPopups}
                                   title="Редактировать профиль"
                                   name="profile">
                        <div className="popup__input-wrapper">
                            <input className="popup__text-input popup__text-input_type_username" id="name-field"
                                   type="text" name="username"
                                   placeholder="Имя" minLength="2" maxLength="40" required/>
                            <span className="name-field-error popup__input-error"></span>
                        </div>
                        <div className="popup__input-wrapper">
                            <input className="popup__text-input popup__text-input_type_description"
                                   id="description-field" type="text"
                                   name="description" placeholder="Описание" minLength="2" maxLength="200"
                                   required/>
                            <span className="description-field-error popup__input-error"></span>
                        </div>
                    </PopupWithForm>
                    <PopupWithForm isOpen={isAddPlacePopupOpen}
                                   onClose={closeAllPopups}
                                   title="Новое место"
                                   name="card-add">
                        <div className="popup__input-wrapper">
                            <input className="popup__text-input popup__text-input_type_card-heading"
                                   id="card-heading-field" type="text"
                                   name="card-heading" placeholder="Название" minLength="2" maxLength="30"
                                   required/>
                            <span className="card-heading-field-error popup__input-error"></span>
                        </div>
                        <div className="popup__input-wrapper">
                            <input className="popup__text-input popup__text-input_type_image-link"
                                   id="image-link-field" type="url"
                                   name="image-link" placeholder="Ссылка на картинку" required/>
                            <span className="image-link-field-error popup__input-error"></span>
                        </div>
                    </PopupWithForm>
                    <PopupWithForm isOpen={isConfirmPopupOpen}
                                   onClose={closeAllPopups} title="Вы уверены?" name="confirm"/>
                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                </div>
            </CardsContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
