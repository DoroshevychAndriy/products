import React, { useEffect, useState } from 'react'

export function Cart(props) {
    const [sum, setSum] = useState(0);
    const [count, setCount] = useState(1);
    const [countPrice, setCountPrice] = useState([]);

    function hideCart(){
        let popUp = document.querySelector('.popup.popup-cart.js-popup-cart');
        popUp.classList.remove('popup--active')
    }

    function showOrder(){
        const popUpOrder = document.querySelector('.js-popup-order')
        popUpOrder.classList.add('popup--active')
        hideCart()
    }

    function setRemoveToCartHandler(e) {
        e.preventDefault();
        if(e.target.classList == 'cart-item__remove'){
            e.target.parentNode.classList.add('hidden');
            let id = e.target.parentNode.dataset.id;
            let currentArrey = JSON.parse(localStorage.getItem('cart2'));
            let newCurrent = currentArrey.filter(item => item.id !== Number(id))
            let newCurrent2 = currentArrey.filter(item => item.id == Number(id))
            const count = document.querySelector('.js-count');
            count.innerHTML = newCurrent.length;
            props.state.splice(0)
            props.state.push(...newCurrent)
            if (newCurrent.length == 0) {
                localStorage.removeItem('cart2');
                localStorage.removeItem('cart');
                let popUp = document.querySelector('.popup.popup-cart.js-popup-cart');
                popUp.classList.remove('popup--active')
            } else {
                localStorage.setItem('cart2', JSON.stringify(newCurrent));
            }
            const element = document.querySelector(`[data-id="${newCurrent2[0].id}"] .tile__delete`);
            element.classList.add('hidden');
            setTotalSum()
        } else if(e.target.classList == 'count__plus'){
            increment(e.target.parentNode.parentNode)
        } else if(e.target.classList == 'count__minus'){
            decrement(e.target.parentNode.parentNode)
        }
    }

    function setTotalSum(){
        const spanPrice = document.querySelectorAll('.popup-cart__list-item.cart-item')
        countPrice.splice(0)
        spanPrice.forEach(item => {
            if(item.classList.value !== 'popup-cart__list-item cart-item hidden'){
                countPrice.push(Number(item.querySelector('span#price').innerHTML))
            }
        })
        const total = countPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        const totalText = document.querySelector('.popup-cart__next-step span#total')
        totalText.innerHTML = `${new Intl.NumberFormat().format(total)}`
    }

    useEffect(() => {
        let currentArrey = JSON.parse(localStorage.getItem('cart2'));
        if(currentArrey){
            const sumItems = currentArrey.reduce((cur, next) => {
                return (Number(cur) + Number(next.price))
            }, 0)
            setSum(sumItems)
        }
    }, [JSON.parse(localStorage.getItem('cart2'))])

    function increment(element) {
        let currentArrey = JSON.parse(localStorage.getItem('cart2'));
        if(currentArrey){
            const inputValue = element.querySelector('.count__input')
            inputValue.value++;
            const itemLi = element.closest("li.popup-cart__list-item.cart-item");
            const itemId = currentArrey.filter(item => item.id == itemLi.getAttribute('data-id'))
            if(itemId){
                countPrice.splice(0)
                const itemSum = itemId[0].price * inputValue.value;
                itemLi.querySelector('.tile__total-price span#price').innerHTML = itemSum.toFixed(1)
                setTotalSum()
            }
        }
    }

    function decrement(element) {
        const inputValue = element.querySelector('.count__input')
        if(inputValue.value > '1'){
            inputValue.value--;
            const itemLi = element.closest("li");
            let currentArrey = JSON.parse(localStorage.getItem('cart2'));
            if(currentArrey){
                const itemId = currentArrey.filter(item => item.id == itemLi.getAttribute('data-id'))
                const itemSum = itemId[0].price * inputValue.value;
                itemLi.querySelector('.tile__total-price span#price').innerHTML = itemSum.toFixed(1)
            }
            setTotalSum();
        }
    }

    return (
        <div className="popup popup-cart js-popup-cart">
            <div className="popup__container">
                <div onClick={hideCart} className="popup__close close js-popup-close"><span></span><span></span></div>
                <h2 className="popup__title">Cart</h2>
                <div className="popup__content">
                    <ul onClick={setRemoveToCartHandler} className="popup-cart__list js-popup-cart-list">{"Корзина пуста!"}</ul>
                </div>
                <div className="popup-cart__next-step">
                    <button onClick={showOrder} className="btn btn--blue js-show-order">Оформити замовлення</button>
                    <span>
                        <span>Загальна сума - </span>
                        <span id='total'>{new Intl.NumberFormat().format(sum)}</span>
                        <span> ₴</span>
                    </span>
                </div>                
            </div>
        </div>
        )
    }

export default Cart