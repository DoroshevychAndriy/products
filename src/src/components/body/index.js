import React, { Component, useEffect, useState } from 'react'
import Products from '../Products/Products'

export default function Body() {
    const goods = JSON.parse(localStorage.getItem('goods'));
    const myArray = require('../JSON/JSON');
    const [options, setOptions] = useState([]);
    const [optionsItem, setOptionsItem] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [currencyItem, setCurrencyItem] = useState([]);
    const [products, setProducts] = useState([]);
    
    
    useEffect(() => {
        const goodss = JSON.parse(localStorage.getItem('goods'));
        if(goodss){
            goodss.forEach(item => {
                options.push(item.brand)
                currency.push(item.price_sign)
            })
            let countArr = Array.from(new Set(options));
            optionsItem.splice(0)
            countArr.forEach((item) => {
                optionsItem.push(item)
            })
            let currencyArr = Array.from(new Set(currency));
            currencyItem.splice(0)
            currencyArr.forEach((item, index) => {
                currencyItem.push(item)
                if(item == null){
                    currencyItem.splice(index, 1, "$")
                }
            })
        }
    }, [])
    function getNameOption(e) {
        const goods = JSON.parse(localStorage.getItem('goods'));
        if(goods){
            let filteredProduct = goods.filter(item => item.brand == e.target.value)
            if(filteredProduct.length > '0'){
                setProducts(filteredProduct)
            } else{
                setProducts(goods)
            }
        }
    }
    function getCurrency(e) {
        let filteredProducts = goods.filter(item => {
            if(e.target.value == '$'){
                return item.price_sign == null
            }
            return item.price_sign == e.target.value
        })
        if(filteredProducts.length > 0){
            setProducts(filteredProducts)
        } else{
            setProducts(goods)
        }
    }

    function getValueInSearch(e) {
        e.preventDefault()
        let filteredProducts = goods.filter(item => {
            return item.name.toLowerCase().includes(e.target.value) || item.name.includes(e.target.value)
        })
        setProducts(filteredProducts)
    }
    function getSortGoods(e) {
        if(e.target.value == 'price'){
            let sortedProducts = goods.sort((a, b) => {
                return b.price - a.price
            });
            setProducts(sortedProducts)
        }
        if(e.target.value == 'alphabet'){
            let sortedProducts = goods.sort(function(a, b){
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA < nameB)
                  return -1
                return 0
            })
            setProducts(sortedProducts)
        }
    }


    return (
      <div>
        <div className="wrapper">
            <section className="goods">
                <h1 className="goods__title">Products</h1>
                <form className="goods__sidebar">
                    <div className="goods__filter select">
                         <select onClick={getNameOption} id="goods-filter" className="js-goods-filter">
                            <option value="Brand">Brand</option>
                            {optionsItem.map(item => {
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    <div className="goods__currency select">
                        <select onClick={getCurrency} id="currency" className="js-goods-currency">
                            <option value="All">Currency</option>
                            {currencyItem.map(item => {
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    <div className="goods__search">
                        <input onChange={getValueInSearch} type="search" placeholder='search name' className="js-goods-search" />
                    </div>
                    <div onClick={(e) => getSortGoods(e)} className="goods__sort">
                        <p>Sort by</p>
                        <div id='sort-price'>
                            <input type="radio" name="sort" className="goods__sort-item js-goods-sort" id="price" value="price" />
                            <label htmlFor="price">price</label>
                        </div>
                        <div>
                            <input type="radio" name="sort" className="goods__sort-item js-goods-sort" id="alphabet"
                                value="alphabet" />
                            <label htmlFor="alphabet">alphabet</label>
                        </div>
                    </div>
                </form>
                <Products filteredProduct={products} />
            </section>
        </div>
    </div>
  )
}
