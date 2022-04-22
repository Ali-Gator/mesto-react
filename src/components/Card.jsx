import React from 'react';

export default function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="card" onClick={handleClick}>
            <img className="card__image" alt={props.card.name} src={props.card.link}/>
            <div className="card__description">
                <h2 className="card__text">{props.card.name}</h2>
                <div className="card__like-wrapper">
                    <button className="card__like-icon" type="button"></button>
                    <p className="card__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
            <button className="card__delete-icon" type="button"></button>
        </li>
    );
}