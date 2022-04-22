import React, {useState} from 'react';
import api from '../utils/Api';
import Card from './Card';

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

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
                        <Card card={card} key={card._id} onCardClick={onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    );
}