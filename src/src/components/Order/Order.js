import React, { useContext } from 'react'


export function Order() {
    function getOrderDate(e){
        e.preventDefault()
        let formElement = e.target.elements;
        let validForm = [formElement.name, formElement.sName, formElement.tel, formElement.address, formElement.email];
        
        if(/\d/.exec(formElement.name.value) || formElement.name.value.length == '0'){
            const formGroup = formElement.name.nextSibling;
            formElement.name.classList.add('order-error')
            formGroup.innerHTML = 'Ім\'я має містити тільки літери!'
        } else{
            const formGroup = formElement.name.nextSibling;
            formGroup.innerHTML = "";
            formElement.name.classList.remove('order-error')
        }
        if(/\d/.exec(formElement.sName.value) || formElement.sName.value.length == '0'){
            formElement.sName.classList.add('order-error')
            const formGroup = formElement.sName.nextSibling;
            formGroup.innerHTML = 'Прізвище має містити тільки літери!'
        } else{
            const formGroup = formElement.sName.nextSibling;
            formElement.sName.classList.remove('order-error')
            formGroup.innerHTML = "";
        }
        if(/\D/.exec(formElement.tel.value ) || formElement.tel.value.length == '0'){
            formElement.tel.classList.add('order-error')
            const formGroup = formElement.tel.nextSibling;
            formGroup.innerHTML = 'Номер має містити тільки цифри!'
        } else{
            const formGroup = formElement.tel.nextSibling;
            formGroup.innerHTML = "";
            formElement.tel.classList.remove('order-error')
        }
        if(formElement.tel.value.length < '12'){
            formElement.tel.classList.add('order-error')
            const formGroup = formElement.tel.nextSibling;
            formGroup.innerHTML = 'Введіть повністю номер!'
        }
        if(formElement.email.value.length == '0'){
            formElement.email.classList.add('order-error')
            const formGroup = formElement.email.nextSibling;
            formGroup.innerHTML = 'Введіть коректно email!'
        } else{
            const formGroup = formElement.email.nextSibling;
            formGroup.innerHTML = "";
            formElement.email.classList.remove('order-error')
        }
        if(formElement.address.value.length == '0'){
            formElement.address.classList.add('order-error')
            const formGroup = formElement.address.nextSibling;
            formGroup.innerHTML = 'Введіть свою адресу!'
        } else{
            const formGroup = formElement.address.nextSibling;
            formGroup.innerHTML = "";
            formElement.address.classList.remove('order-error')
        }

        const arrObj = validForm.every(item => item.className !== 'order-error')
        if(arrObj && formElement.save.checked){
            let formItemValue = [formElement.name.value, formElement.sName.value, formElement.tel.value, formElement.address.value, formElement.email.value];
            localStorage.setItem('date', JSON.stringify(formItemValue))
        }
        if(arrObj){
            hideOrderNotification()
            validForm.forEach(item => item.value = "")
        }
    }
    function hideOrderNotification(){
        document.querySelector('.js-popup-order').classList.remove('popup--active')
    }

    function addInputsValue(e){
        if(!e.target.value){
            e.target.value = 380;
        }
    }
    return (
      <div>
        <div className="popup popup-order js-popup-order">
        <div className="popup__container">
            <div onClick={hideOrderNotification} className="popup__close close js-popup-close"><span></span><span></span></div>
            <h2 className="popup__title">Order</h2>
            <form onSubmit={getOrderDate} className="popup-order__form order-form">
                <div className="popup__content order-form__content">
                    <div className="order-form__group">
                        <label htmlFor="name">Ім'я</label>
                        <input type="text" id="name" />
                        <p className="order-form__group-error"></p>
                    </div>
                    <div className="order-form__group">
                        <label htmlFor="sName">Прізвище</label>
                        <input type="text" id="sName" />
                        <p className="order-form__group-error"></p>
                    </div>
                    <div className="order-form__group">
                        <label htmlFor="tel">Номер телефону</label>
                        <input maxLength={12} onClick={addInputsValue} type="tel" id="tel" />
                        <p className="order-form__group-error"></p>
                    </div>
                    <div className="order-form__group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" />
                        <p className="order-form__group-error"></p>
                    </div>
                    <div className="order-form__group">
                        <label htmlFor="address">Адреса</label>
                        <input type="address" id="address" />
                        <p className="order-form__group-error"></p>
                    </div>
                    <div className="order-form__group order-form__group--row">
                        <input type="checkbox" id="save" />
                        <label htmlFor="save">Зберегти дані?</label>
                    </div>
                </div>      
                <div className="order-form__group--btn">
                    <button type="submit" className="btn btn--blue">Відправити</button>
                </div>
            </form>      
        </div>
    </div>
      </div>
    )
  }

export default Order