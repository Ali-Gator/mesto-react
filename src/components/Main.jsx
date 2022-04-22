import React from 'react';

export default function Main({onEditAvatar, onEditProfile, onAddPlace}) {

    return (
        <main>
            <section className="page__profile profile">
                <button className="profile__image-button" onClick={onEditAvatar}>
                    <img className="profile__image" src="#" alt="Изображение пользователя"/>
                </button>
                <div className="profile__name-wrapper">
                    <h1 className="profile__name">Жак-Ив Кусто</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                </div>
                <p className="profile__description">Исследователь океана</p>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="page__cards cards">
                <ul className="cards__list">
                    {/* container to render cards */}
                </ul>
            </section>
        </main>
    );
}
