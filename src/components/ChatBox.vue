<template>
    <section id="chat-content" ref="chatArea">
        <div id="messages-area">
            <user-message-template v-for="message in chat_info.messages" v-bind:message="message" :my_id=current_user.user_id :key="message.id"></user-message-template>
        </div>

        <div id="chat-message-field">
            <div id="message-text" contenteditable @input="getCurrentMessage($event)" v-on:keydown="senMessageByEnter($event)" ref="messageField"></div>
            <input id="send-message-button" type="button" v-on:click="sendMessage">
        </div>
    </section>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'ChatBox',
  data () {
    return {
      chat_info: {
        name: 'Friends',
        members: ['Paul', 'Stella', 'Nick', 'Alex', 'Natali', 'Diana', 'Kitty', 'Summer'],
        messages: [{
          user_id: 1,
          role: 'member',
          user_name: 'Paul',
          user_img: 'https://res.cloudinary.com/natalik/image/upload/v1537764121/images/The-Fall.jpg',
          timestamp: '13:40',
          date: 1537771200000,
          user_messages: [
            'Hello Stella.', 'How are you!?'
          ]

        }, {
          user_id: 2,
          role: 'member',
          user_name: 'Stella',
          user_img: 'https://res.cloudinary.com/natalik/image/upload/v1537764116/images/gillian-anderson.jpg',
          timestamp: '13:46',
          date: 1537771560000,
          user_messages: [
            'Hi...Paul', 'Fine. Where are you?'
          ]

        }]
      },
      current_user: {
        user_id: 3,
        role: 'admin',
        user_name: 'Nick',
        user_img: 'https://res.cloudinary.com/natalik/image/upload/v1537842919/images/Nick_Fury.png',
        user_messages: ''
      }
    }
  },
  methods: {
    sendMessage: function () {
      var TIME_INTERVAL = 1000
      var date = new Date()

      if (!this.current_user.user_messages) return

      this.$refs.messageField.innerHTML = ''

      if ((this.chat_info.messages[this.chat_info.messages.length - 1].user_id === this.current_user.user_id) &&
        (date - this.chat_info.messages[this.chat_info.messages.length - 1].date) <= TIME_INTERVAL) {
        this.chat_info.messages[this.chat_info.messages.length - 1].user_messages.push(this.current_user.user_messages)
        this.current_user.user_messages = ''
        Vue.nextTick(() => {
          let messageDisplay = this.$refs.chatArea
          messageDisplay.scrollTop = messageDisplay.scrollHeight
          console.log(messageDisplay)
        })
        return
      }

      this.chat_info.messages.push({
        user_id: this.current_user.user_id,
        role: 'admin',
        user_name: this.current_user.user_name,
        user_img: this.current_user.user_img,
        timestamp: new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()),
        date: date,
        user_messages: [this.current_user.user_messages]
      })

      this.current_user.user_messages = ''
      Vue.nextTick(() => {
        let messageDisplay = this.$refs.chatArea
        messageDisplay.scrollTop = messageDisplay.scrollHeight
        console.log(messageDisplay)
      })
    },
    getCurrentMessage: function (event) {
      this.current_user.user_messages = event.target.textContent
    },
    senMessageByEnter: function (event) {
      if (event.keyCode !== 13) return
      this.sendMessage()
      event.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#navigation-button,
#navigation-menu > input {
    display: none;
}
#chat-wrapper,
#chat-content {
    min-height: 100%;
    height: 100%;
    width: 100%;
    padding-left: 4%;
}
#chat-content,
#chat-header,
#navigation-menu,
#messages-area,
.slide-button:after,
#messages-area,
#chat-message-field,
#message-text {
    background-color: #19222d;
}
#chat-wrapper {
    margin: 0 auto;
}
#chat-content {
    position: relative;
    top: 200px;
    left: 20%;
    background: #19222d;
    height: 60vh;
    padding: 1em;
    overflow: auto;
    width: 40%;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
}
#chat-header {
    position: inherit;
    height: 50px;
    padding: 0 10px 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #5e6e80;
    font-size: 0;
    white-space: nowrap;
    z-index: 1;
}
#chat-header:before {
    content: '';
    height: 100%;
}
#chat-description,
#navigation,
#chat-header:before {
    display: inline-block;
    vertical-align: middle;
}
#chat-description {
    width: 85%;
    color: #fff;
}
#chat-name {
    font-weight: 600;
}
#chat-members {
    margin-top: 5px;
}
#chat-members,
#chat-name {
    display: block;
    width: 100%;
    font-size: 13px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
#navigation {
    position: relative;
    width: 15%;
    text-align: right;
}
#navigation-button:checked + label > span {
    height: 20px;
    width: 20px;
    background-color: #4a90e2;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABWElEQVQoU1WQzStEYRjFz/O+rq8hKZq6YWnuLOXO/AOKUorF1BhTSDZKarBRNhrka8nKRymZKBt/gEhZmNmROwskX2tmmqu5c99HF4txtufX+dUhIzz0AMazY7vx+5vUM8rS2hHV6zSZAthPRudQDBLbYFzk3x8GXl6ubI/V9b7ahpb6A4B6XcXjBESkEaqcJaI5Zj7LF4qjFZqjqjXfDgE9zLxkpZ0V+jVFZMCsSpDgZTDvMwklwMPMWLKuiwvAsfsHenCnZpjGBglMgEHMvGXZzjRuj4te+w8MhgJrAE2CwIp5M3udnQEyThkYkUa4YgoQq1B84O0RyRir0qKVTiUB/Khl0BxMQIh5MJ9/5uwRqdUoXw3tAehSrpvMZlLr1G7GokLQLjFffqhc/1vmtOCp/P5uX2Nb0yER9aiSGiPvcAK9fuUK8ce7k6fywwMdUZ0q5RExNX8DmtmOrHvD50MAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40%;
}
#navigation-button + label {
    display: inline-block;
    width: 21px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
}
#navigation-button + label > span {
    position: relative;
    transition: width .3s;
}
#navigation-button + label > span,
#navigation-button + label > span:before,
#navigation-button + label > span:after {
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: #b1c3d5;
}
#navigation-button + label > span:before,
#navigation-button + label > span:after {
    content: '';
    position: absolute;
}
#navigation-button + label > span:after {
    left: 8px;
}
#navigation-button + label > span:before {
    right: 8px;
}
#navigation-button:checked + label > span:after,
#navigation-button:checked + label > span:before {
    opacity: 0;
}
#navigation-menu {
    position: absolute;
    height: 70px;
    width: 150px;
    top: 54px;
    right: 0;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: -1px 1px 15px 2px rgba(0, 0, 0, 0.6);
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s;
}
#navigation-button:checked + label + #navigation-menu {
    visibility: visible;
}
#navigation-menu > input:checked + .slide-button:after {
    right: 1px;
}
#navigation-menu > input:checked + .slide-button:after,
#navigation-menu > input:checked + .slide-button:before,
#navigation-button:checked + label + #navigation-menu {
    opacity: 1;
}
.slide-button {
    position: relative;
    display: block;
    height: 25px;
    width: 100%;
    font-size: 12px;
    line-height: 25px;
    color: #fff;
    text-align: left;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
}
.slide-button:before {
    height: 15px;
    width: 25px;
    top: 5px;
    border-radius: 10px;
    background-color: #2ea6ff;
    opacity: .2;
}
.slide-button:before,
.slide-button:after {
    content: '';
    position: absolute;
    display: block;
    right: 0;
    transition: .2s;
}
.slide-button:after {
    height: 13px;
    width: 13px;
    top: 6px;
    right: 11px;
    border-radius: 10px;
    opacity: .6;
}
#messages-area {
    min-height: 100%;
    width: 98%;
    padding: 2% 2%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
}
#messages-area:empty {
    background-image: url(https://res.cloudinary.com/natalik/image/upload/v1537763869/images/empty_chat.png.jpg);
    background-position: center;
    background-repeat: no-repeat;
}

#chat-message-field {
    position: relative;
    left: 2%;
    bottom: 0;
    min-height: 50px;
    width: 96%;
    padding: 10px 20px;
    box-sizing: border-box;
    border-top: 1px solid #5e6e80;
    font-size: 0;
    white-space: nowrap;
}
#chat-message-field:before {
    content: '';
    display: inline-block;
    height: 100%;
    min-height: 31px;
    vertical-align: middle;
}
#message-text {
    display: inline-block;
    width: 100%;
    max-height: 164px;
    height: auto;
    width: calc(100% - 40px);
    margin-right: 40px;
    padding-right: 5px;
    box-sizing: border-box;
    border: none;
    font-size: 13px;
    line-height: 18px;
    color: rgb(202, 26, 26);
    white-space: normal;
    vertical-align: middle;
    overflow-y: auto;
    overflow-x: hidden;
}
#message-text:empty:before {
    content: 'Write a message...';
    font-size: 14px;
    line-height: 18px;
    color: #fff;
    opacity: .5;
}
#send-message-button {
    position: absolute;
    height: 31px;
    width: 10%;
    max-width: 31px;
    min-width: 31px;
    right: 10px;
    bottom: 10px;
    padding: 0;
    border: none;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK5SURBVEhL5ZZLTBNRFIZrTIwbF25c6cqdS5e6ceHalbp27RbEttBOw0ZLC30R1NLXFOOjRGoCMRiDj6BQkBBIW8qjLS2lnT6mLe0wAy1tj3fKjUgowvDILPiSs5m59/z3nnvOvUdyNml5br7a2mWflGot9yQA5/Dn00emMd/XWvq5Tmt/UWlwROVayyOCcF3Av08Phd7R/d0zUwVEMBqHF28GiwqdnW7V2pqfqC2X8LCTp9302h+OUbzuX+IpGvrcX9bRAtbbdA51k6bnCh5+MhCE/aK801Yql7ew5G6ya0X4MDy6gRbAEQbS1tzx8jqeejxatK9uofNdwzr7wrAcDP+YLKMc4FQGckiutt3ELo6GTGNtGvj8cwP7PxAUGhj97a22m/pYlZH0SDusd7ErYaiMfcPT/iXs9vBUqlWY8i7U1OZ3DGEkF1s01ocPXK7z2O3BKPWOXCKdg1qthl0Kg58VCEbB6HQXlXqSkmosj/m8we73R2V0Tnl8QRjzL8P0UgzmV1IQTeUgnWeA4TbRzg6/oEg8CZb3nxiUiIW2LhshfdZzGcvs5amm946OHGDH/GH45WtsUwsr4I9QEKZoSOaKUGA3oLxVwXJ7SdF5eDv0jWvT2VlkJnQfXMNyu+F3Pe4NNRT9n00EIuANJyAYz0CcXoM8w8HmP2VZYFgYHBkvKfR8KTpdKJFvYMlt+F0byI9cI+dHsfG5ZZgJrsJCLA2xdB4otKivE7OV9m4nX4ojso7e26ci7JmLwGwoDourO8IjjYTrofYJD/XkfBR8yxSEEhlIZAvCQl1PLoebbeSYt3q2L8YgEE1CJJmFFEquIsr2rUr9TWnIoZJru5xCO+HB50IX1oHdLAmqb0HlxF8gVCaPpwrnGBeISFemaI+EaM+iaI0AjyitD49ozZ5o7a1oDf0ZQiL5AypdwYP7hbcrAAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    background-size: contain;
    opacity: .5;
    outline: none;
    vertical-align: middle;
    transition: .3s;
}
#send-message-button:hover {
    opacity: .8;
}
.user-message-wrapper:first-child {
    font-size: 100%;
}
.user-message-wrapper:not(:first-child) {
    margin: 10px 0 0;
}
.user-image-wrapper {
    height: 50px;
    width: 50px;
    border-radius: 20%;
    overflow: hidden;
}
.user-image-wrapper > div {
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.user-message-wrapper > div {
    display: inline-block;
}
.user-message-content {
    position: relative;
    width: calc(100% - 50px);
    bottom: 8px;
    padding: 5px 0 0 10px;
    box-sizing: border-box;
    vertical-align: top;
}
.message-info > span {
    display: inline-block;
    color: #fff;
}
.user-name {
    width: 70%;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
}
.user-name-you {
    opacity: 0.2;
    position: inherit;
    width: 80%;
    font-size: 12px;
    font-weight: 500;
    text-align: left;
}
.timestamp {
    position: relative;
    width: 30%;
    font-size: 11px;
    text-align: right;
    opacity: .5;
}
.user-role {
    width: 100%;
    position: relative;
    top: -15px;
    font-size: small;
    text-align: right;
    opacity: .5;
}
.user-messages,
.user-messages > span:not(:first-child) {
    margin: 3px 0 0;
}
.user-messages > span {
    position: relative;
    top: 10px;
    display: block;
    font-size: 14px;
    color: #fff;
    white-space: normal;
    word-break: break-all;
}
</style>
