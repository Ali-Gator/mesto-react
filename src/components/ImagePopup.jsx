import React from 'react';

export default function ImagePopup(props) {
    return props.card && (
        <div className="popup popup_type_picture popup_opened">
            <div className="popup__container popup__container_type_picture">
                <figure className="popup__image-container">
                    <img alt={props.card.name} className="popup__image" src={props.card && props.card.link}/>
                    <figcaption className="popup__image-caption"></figcaption>
                </figure>
                <button className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}