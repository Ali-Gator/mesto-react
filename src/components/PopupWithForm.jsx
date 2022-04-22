import React from 'react';

export default function PopupWithForm({title, name, children, isOpen, onClose}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <form className={`popup__form popup__form_edit-${name}`} method="post" name={`edit-${name}`} noValidate>
                    <h2 className="popup__heading">{title}</h2>
                    <div className="popup__input-wrapper">
                        {children}
                        <button className="popup__save-button" type="submit">Сохранить</button>
                    </div>
                </form>

                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    );
}
