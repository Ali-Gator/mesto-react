import React from 'react';
import logo from '../images/header-logo-white.svg';

export default function Header() {
    return (
        <header className="page__header header">
            <img className="header__logo" src={logo} alt="Логотип Место"/>
        </header>
    );
}