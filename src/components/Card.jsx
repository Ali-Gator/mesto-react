import React from 'react';

export default function Card({card, onImageClick}) {

    function handleClick() {
        onImageClick(card);
    }

    return (
        <li className="card">
            <img className="card__image" alt={card.name} src={card.link} onClick={handleClick}/>
            <div className="card__description">
                <h2 className="card__text">{card.name}</h2>
                <div className="card__like-wrapper">
                    <button className="card__like-icon" type="button"></button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
            <button className="card__delete-icon" type="button"></button>
        </li>
    );
}