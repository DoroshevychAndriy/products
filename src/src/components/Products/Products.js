import React, { useEffect, useState } from 'react'
import Cart from '../Cart/Cart';
import Order from '../Order/Order';
import Notification from '../Notification/Notification';

export function Products(props) {
    const myArray = require('../JSON/JSON');
    const [goods, setGoods] = useState([])
    const [productCart, setProductCart] = useState([]);
    const [productCart2, setProduct2Cart] = useState([]);
    const [titles, setTitles] = useState('');
    const [dellItem, setDellItem] = useState('');
    const [filteredProduct, setFilteredProduct] = useState([]);
    if(myArray.goods){
        localStorage.setItem('goods', JSON.stringify(myArray.goods))
    }
        useEffect(() => {
        filteredProduct.splice(0)
        filteredProduct.push(...props.filteredProduct)
        let a = document.querySelector('.product-list.js-product-list')
        a.innerHTML = '';
        showGoods(filteredProduct)
    }, [props.filteredProduct])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('goods'));
            if(items){
                setGoods(items)
                showGoods(items)
                checkDeleteItem()
                let products = document.querySelectorAll('.js-product');
                setRemoveToCartHandler(products)
            }
    }, [])
                
    function showGoods(goods){
        goods.map(item => {
            const article = document.createElement('article');
            article.classList.add('product-list__item', 'tile');
            article.classList.add('js-product');
            article.setAttribute('data-id', item.id);
            article.setAttribute('key', item.id);

            article.innerHTML = `<a href="${item.product_link}" class="tile__link">
                    <span class="tile__top">
                        <span class="tile__badge tile__badge--${item.brand}">${item.brand}</span>
                        <span class="tile__delete js-tile-delete hidden"> 
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_6043_11153)">
                                <path d="M2.03125 3.85352H12.9687" stroke="#EF3E33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.753 3.85352V12.3605C11.753 12.9681 11.1454 13.5757 10.5378 13.5757H4.46137C3.85373 13.5757 3.24609 12.9681 3.24609 12.3605V3.85352" stroke="#EF3E33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.06934 3.85341V2.63813C5.06934 2.03049 5.67697 1.42285 6.28461 1.42285H8.71517C9.32281 1.42285 9.93045 2.03049 9.93045 2.63813V3.85341" stroke="#EF3E33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_6043_11153">
                                <rect width="14.5833" height="14.5833" fill="white" transform="translate(0.208008 0.208008)"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </span>
                    <span class="tile__image">
                        <img src="${item.api_featured_image}" alt="${item.api_featured_image}">
                    </span>
                    <span class="tile__title">${item.name}</span>
                    <span class="tile__info">
                    <span class="tile__price">
                        <span class="tile__new-price">${item.price} ${item.price_sign || "$"}</span>
                    </span>
                        <button class="btn">Купити</button>
                    </span>
                </a>`;
            document.querySelector('.product-list').appendChild(article);
        });
    }
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart'));
        const item2 = JSON.parse(localStorage.getItem('cart2'));

        if (items && item2) {
            if(!productCart.length){
                items.forEach(item => {
                    productCart.push(item)
                })
                item2.forEach(item => {
                    productCart2.push(item);
                })
                const count = document.querySelector('.js-count');
                count.innerHTML = productCart2.length;
            }
        }
    }, []);

    function showProducts(e){
        e.preventDefault()
        if (e.target.classList == 'btn') {
            let isArr = false;
            let parentId = e.target.parentNode.parentNode.parentNode;
            productCart2.forEach(item => {
                if(item.id == parentId.getAttribute('data-id')){isArr = true}
            })
            
            if(!isArr){
                let result = goods.filter(item => item.id == parentId.getAttribute('data-id'))
                productCart2.unshift(result[0])
                setTitles(result[0].name)
            }
            
            productCart.push(parentId.getAttribute('data-id'));
            localStorage.setItem('cart', JSON.stringify(productCart))
            
            const count = document.querySelector('.js-count');
            count.innerHTML = productCart2.length;

            const element = document.querySelector(`[data-id="${parentId.getAttribute('data-id')}"] .tile__delete`);
            element.classList.remove('hidden');
            localStorage.setItem('cart2', JSON.stringify(productCart2))
        }
    }

function checkDeleteItem() {
    productCart2.map(item => {
        const element = document.querySelector(`[data-id="${item.id}"] .tile__delete`);
        element.classList.remove('hidden');
    });
}

function setRemoveToCartHandler(products) {
    products.forEach(item => {
        let bucket = item.querySelector('.js-tile-delete');
        bucket.addEventListener('click', (e) => {
            e.currentTarget.classList.add('hidden');
            let parent = e.target.closest('.js-product');
            let id = parent.dataset.id;
            let currentArrey = JSON.parse(localStorage.getItem('cart2'));

            let newCurrent = currentArrey.filter(item => item.id !== Number(id))
            let delItem = currentArrey.filter(item => item.id == Number(id))
            productCart2.splice(0)
            productCart2.push(...newCurrent)
            
            setDellItem(delItem[0].name)
            const count = document.querySelector('.js-count');
            count.innerHTML = newCurrent.length;

            if (newCurrent.length == 0) {
                localStorage.removeItem('cart2');
                localStorage.removeItem('cart');
                productCart2.splice(0)
                let list = document.querySelector('.js-popup-cart-list');
                list.innerHTML = " ";
                const contentUl = document.querySelector('.popup-cart__list.js-popup-cart-list')
                contentUl.innerHTML = "Корзина пуста!";
            } else {
                localStorage.setItem('cart2', JSON.stringify(newCurrent));
            }
        })
    })
}

    return (
        <div className='wrapper'>
            <div onClick={showProducts} className="product-list js-product-list"></div>
            <div>
                <Notification title={titles} delItem={dellItem} />
                <Order />
                <Cart state={productCart2}  />
            </div>
        </div>
    )
        
}
export default Products