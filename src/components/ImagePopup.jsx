import React from 'react';

export default function ImagePopup() {
    return (
        <div className="popup popup_type_picture">
            <div className="popup__container popup__container_type_picture">
                <figure className="popup__image-container">
                    <img alt="" className="popup__image"/>
                    <figcaption className="popup__image-caption"></figcaption>
                </figure>
                <button className="popup__close-button"></button>
            </div>
        </div>
    );
}