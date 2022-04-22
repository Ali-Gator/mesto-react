import React, {useState} from 'react';
import api from '../utils/Api';

export default function Main({onEditAvatar, onEditProfile, onAddPlace}) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    React.useEffect(() => {
        Promise.all([api.getInitialUser(), api.getInitialCards()])
            .then(([user, cards]) => {
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
                setCards(cards);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <main>
            <section className="page__profile profile">
                <button className="profile__image-button" onClick={onEditAvatar}>
                    <img className="profile__image" src={userAvatar} alt="Изображение пользователя"/>
                </button>
                <div className="profile__name-wrapper">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                </div>
                <p className="profile__description">{userDescription}</p>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="page__cards cards">
                <ul className="cards__list">
                    {cards.map(card => (
                        <li className="card" key={card._id}>
                            <img className="card__image" alt={card.name} src={card.link}/>
                            <div className="card__description">
                                <h2 className="card__text">{card.name}</h2>
                                <div className="card__like-wrapper">
                                    <button className="card__like-icon" type="button"></button>
                                    <p className="card__like-counter">{card.likes.length}</p>
                                </div>
                            </div>
                            <button className="card__delete-icon" type="button"></button>
                        </li>))}
                </ul>
            </section>
        </main>
    );
}