import React, { Component, useEffect } from 'react'

function Notification(props) {
  const notification = document.querySelector('.notification.js-notification');
  function hideNotification(){
    document.querySelector('.notification.js-notification').classList.remove('notification--active')
  }

  useEffect(() => {
    if(props.title.length > 0){
      document.querySelector('.notification.js-notification').classList.add('notification--active')
    }
    if(document.querySelector('.notification.js-notification.notification--active')){
      setTimeout(() => document.querySelector('.notification.js-notification').classList.remove('notification--active'), 5000)
    }
  }, [props.title])

  useEffect(() => {
    if(props.delItem.length > 0){
      document.querySelector('.notification.js-notification').classList.add('notification--active')
      const notText = document.querySelector('.notification__content.js-notification-content p')
      notText.innerHTML = props.delItem +  "- " + "Видалено з корзини!"
    }
    if(document.querySelector('.notification.js-notification.notification--active')){
      setTimeout(() => document.querySelector('.notification.js-notification').classList.remove('notification--active'), 5000)
    }
  }, [props.delItem])
  
    
  
  return (
    <div className="notification js-notification">
        <div className="notification__close close js-notification-close" onClick={hideNotification}><span></span><span></span></div>
        <div className="notification__content js-notification-content">
            <p>{props.title + "- " + "Додано в корзину!"}</p>
        </div>
    </div>
  )
}

export default Notification