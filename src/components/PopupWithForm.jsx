import React from 'react';

export default function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <form className={`popup__form popup__form_edit-${props.name}`} method="post" name={`edit-${props.name}`} noValidate>
                    <h2 className="popup__heading">{props.title}</h2>
                    <div className="popup__input-wrapper">
                        {props.children}
                        <button className="popup__save-button" type="submit">Сохранить</button>
                    </div>
                </form>

                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}
