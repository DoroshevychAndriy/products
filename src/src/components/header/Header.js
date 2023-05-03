import React, { Component, useState } from 'react'
import Logo from '../img/logo.jpg'
// import goods from '../JSON/JSON'

function Header() {
    const [count, setCount] = useState(1);
    function showPopupCart(e) {       
        let list = document.querySelector('.js-popup-cart-list');
        const item2 = JSON.parse(localStorage.getItem('cart2'));
        if (item2?.length < 0) {
            list.innerHTML = " ";
        }
        if(item2){
            let popUp = document.querySelector('.popup.popup-cart.js-popup-cart');
            popUp.classList.add('popup--active')
        } 
        if (item2?.length > 0) {
            list.innerHTML = " ";
            item2.map(item => {
                    let li = document.createElement('li');
                    li.classList.add('popup-cart__list-item', 'cart-item');
                    li.setAttribute('data-id', item.id)
                    li.setAttribute('key', item.id)
                    li.innerHTML = `
                        <span class="cart-item__img">
                            <img src="${item.api_featured_image}" alt="${item.name}">
                        </span>
                        <span class="cart-item__info">
                            <a href="${item.id}" class="cart-item__link">
                                <span class="cart-item__title">${item.name}</span>
                                <span class="cart-item__price">
                                    <span class="tile__prices">
                                        <span class='count'>
                                            <span class="count__controls">
                                                <button class="count__plus" type="button">+</button>
                                            </span>
                                            <span class="count__box">
                                                <input type="number" class="count__input" min="1" max="100" readonly="false" value=${count} />
                                            </span>
                                            <span class="count__controls">
                                                <button type='button' class="count__minus">-</button>
                                            </span>
                                        </span>
                                        <span class="tile__price">Price: ${item.price} ${item.price_sign || "$"}</span>
                                        <span class="tile__total-price">
                                            <span>Total:</span>
                                            <span id="price">${item.price}</span>
                                            <span>${item.price_sign || "$"}</span>
                                        </span>
                                    </span>
                                    <span class="tile__total-desc">${item.description}</span>
                                </span>
                            </a>
                        </span>
                        <span class="cart-item__remove"></span>
                    `;    
                    list.appendChild(li);
            })
        }
    }
        return (
        <div>
            <header className="header">
                <div className="wrapper header__wrapper">
                    <div className="header__logo">
                        <img src={Logo} alt="logo" />
                    </div>
                    <nav className="header_nav">
                        <ul className="nav">
                            <li className="nav__item"><a href="#">Shop</a></li>
                            <li className="nav__item"><a href="#">Blog</a></li>
                            <li className="nav__item"><a href="#">About us</a></li>
                            <li className="nav__item"><a href="#">Contacts</a></li>
                        </ul>
                    </nav>
                    <div className="header__info info">
                        <div className="info__item user-info">
                            <span className="user-info__name">Олеся Мороз</span>
                            <span className="user-info__addres">м.Львів, вул. Замкова, 14в</span>
                        </div>
                        <div className="info__item">
                            <div className="info__icon">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.7312 20.4352L15.475 14.179C16.6868 12.6821 17.4165 10.78 17.4165 8.70842C17.4165 3.90696 13.5097 0.000152588 8.70822 0.000152588C3.90677 0.000152588 0 3.90692 0 8.70837C0 13.5098 3.90681 17.4166 8.70826 17.4166C10.7799 17.4166 12.682 16.687 14.1789 15.4752L20.4351 21.7313C20.6138 21.9101 20.8484 21.9999 21.0831 21.9999C21.3178 21.9999 21.5525 21.9101 21.7312 21.7313C22.0896 21.3729 22.0896 20.7936 21.7312 20.4352ZM8.70826 15.5833C4.91695 15.5833 1.83333 12.4997 1.83333 8.70837C1.83333 4.91706 4.91695 1.83344 8.70826 1.83344C12.4996 1.83344 15.5832 4.91706 15.5832 8.70837C15.5832 12.4997 12.4995 15.5833 8.70826 15.5833Z"
                                        fill="#000" />
                                </svg>
                            </div>
                        </div>
                        <div onClick={showPopupCart} className="info__item info__item--cart">
                            <div className="info__count js-count">0</div>
                            <div className="info__icon">
                                <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.2523 6.64357H14.3686V5.3685C14.3685 2.40813 11.9602 0 8.99991 0C6.03966 0 3.63119 2.40847 3.63119 5.3685V6.64357H2.74748C1.31064 6.64357 0.141602 7.81261 0.141602 9.24944V21.3941C0.141602 22.8313 1.31064 24 2.74748 24H15.2522C16.6891 24 17.8581 22.8312 17.8581 21.3941V9.24944C17.8581 7.81261 16.6891 6.64357 15.2523 6.64357ZM5.33124 5.3685C5.33124 3.34569 6.97688 1.70005 8.99991 1.70005C11.0227 1.70005 12.6684 3.34569 12.6684 5.3685V6.64357H5.33124V5.3685ZM16.1582 21.3941C16.1582 21.894 15.7516 22.2999 15.2523 22.2999H2.74737C2.24787 22.2999 1.84154 21.8936 1.84154 21.3941V9.24944C1.84154 8.74994 2.24787 8.34361 2.74737 8.34361H3.63108V9.53567C3.35792 9.77363 3.18174 10.1202 3.18174 10.5112C3.18174 11.2289 3.76346 11.8109 4.48116 11.8109C5.19862 11.8109 5.78058 11.2289 5.78058 10.5112C5.78058 10.1205 5.60428 9.77397 5.33124 9.53567V8.34361H12.6684V9.53567C12.3952 9.77363 12.219 10.1202 12.219 10.5112C12.219 11.2289 12.8007 11.8109 13.5184 11.8109C14.2361 11.8109 14.8179 11.2289 14.8179 10.5112C14.8179 10.1205 14.6416 9.77363 14.3685 9.53567V8.34361H15.2522C15.7517 8.34361 16.1581 8.74994 16.1581 9.24944V21.3941H16.1582Z"
                                        fill="#000" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        )
}

export default Header