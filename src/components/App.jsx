import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
    const [isConfirmPopupOpen, setConfirmPopup] = React.useState(false);

    function handleEditAvatarClick() {
        setEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopup(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopup(true);
    }

    function closeAllPopups() {
        setEditAvatarPopup(false);
        setEditProfilePopup(false);
        setAddPlacePopup(false);
        setConfirmPopup(false)
    }

    return (
        <div className="page">
            <Header/>
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
            />
            <Footer/>
            <PopupWithForm isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}
                           title={'Обновить аватар'}
                           name={'avatar'}
                           children={<div class="popup__input-wrapper">
                               <input class="popup__text-input popup__text-input_type_avatar-link"
                                      id="avatar-link-field" type="url"
                                      name="avatar-link" placeholder="Ссылка на аватар" required/>
                               <span class="avatar-link-field-error popup__input-error"></span>
                           </div>}
            />
            <PopupWithForm isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}
                           title={'Редактировать профиль'}
                           name={'profile'}
                           children={<>
                               <div class="popup__input-wrapper">
                                   <input class="popup__text-input popup__text-input_type_username" id="name-field"
                                          type="text" name="username"
                                          placeholder="Имя" minlength="2" maxlength="40" required/>
                                   <span class="name-field-error popup__input-error"></span>
                               </div>
                               <div class="popup__input-wrapper">
                                   <input class="popup__text-input popup__text-input_type_description"
                                          id="description-field" type="text"
                                          name="description" placeholder="Описание" minlength="2" maxlength="200"
                                          required/>
                                   <span class="description-field-error popup__input-error"></span>
                               </div>
                           </>}
            />
            <PopupWithForm isOpen={isAddPlacePopupOpen}
                           onClose={closeAllPopups}
                           title={'Новое место'}
                           name={'card-add'}
                           children={<>
                               <div class="popup__input-wrapper">
                                   <input class="popup__text-input popup__text-input_type_card-heading"
                                          id="card-heading-field" type="text"
                                          name="card-heading" placeholder="Название" minlength="2" maxlength="30"
                                          required/>
                                   <span class="card-heading-field-error popup__input-error"></span>
                               </div>
                               <div class="popup__input-wrapper">
                                   <input class="popup__text-input popup__text-input_type_image-link"
                                          id="image-link-field" type="url"
                                          name="image-link" placeholder="Ссылка на картинку" required/>
                                   <span class="image-link-field-error popup__input-error"></span>
                               </div>
                           </>}
            />
            <PopupWithForm isOpen={isConfirmPopupOpen}
                           onClose={closeAllPopups} title={'Вы уверены?'} name={'confirm'}/>
            <ImagePopup/>


            {/* Card's template */}
            <template className="template-card">
                <li className="card">
                    <img className="card__image" alt=""/>
                    <div className="card__description">
                        <h2 className="card__text"></h2>
                        <div className="card__like-wrapper">
                            <button className="card__like-icon" type="button"></button>
                            <p className="card__like-counter"></p>
                        </div>
                    </div>
                    <button className="card__delete-icon" type="button"></button>
                </li>
            </template>
        </div>
    );
}

export default App;
