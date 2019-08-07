<template>
  <div class="chat-box">
    <h1 class="headline">{{ channelName }}</h1>

    <section ref="chatArea" class="chat-area">
        <p v-for="message in messages" :key="message" class="message" :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
        {{message.author}}: {{ message.body }} <section ref="message-time" class="message-time"> <p>{{message.time}}</p> </section>
        </p>
    </section>
    <fish-form inline>
        <fish-field>
            <fish-input type="textarea" class="chat-input"></fish-input>
        </fish-field>
    </fish-form>
  </div>
</template>

<script>
/*
<section class="chat-inputs">
    <form @submit.prevent="sendMessage('in')" id="person1-form">
      <label for="person1-input">Bob</label>
      <input v-model="bobMessage" id="person1-input" type="text" placeholder="Type your message">
      <button type="submit">Send</button>
    </form>
<button @click="clearAllMessages">Clear All</button>
    <form @submit.prevent="sendMessage('out')" id="person2-form">
      <label for="person2-input">You</label>
      <input v-model="youMessage" id="person2-input" type="text" placeholder="Type your message">
      <button type="submit">Send</button>
    </form>
</section>
*/
import Vue from 'vue'

export default {
  name: 'ChatBox',
  data () {
    return {
      channelName: 'Test Channel',
      bobMessage: '',
      youMessage: '',
      messages: [
        {
          body: 'Welcome to the chat, I\'m Bob!',
          author: 'bob',
          time: '11:00'
        },
        {
          body: 'Thank you Bob',
          author: 'you',
          time: '11:00'
        },
        {
          body: 'You\'re most welcome',
          author: 'bob',
          time: '11:00'
        }
      ]
    }
  },
  methods: {
    sendMessage (direction) {
      if (!this.youMessage && !this.bobMessage) {
        return
      }
      if (direction === 'out') {
        this.messages.push({body: this.youMessage, author: 'you'})
        this.youMessage = ''
      } else if (direction === 'in') {
        this.messages.push({body: this.bobMessage, author: 'bob'})
        this.bobMessage = ''
      } else {
        alert('something went wrong')
      }
      Vue.nextTick(() => {
        let messageDisplay = this.$refs.chatArea
        messageDisplay.scrollTop = messageDisplay.scrollHeight
      })
    },
    clearAllMessages () {
      this.messages = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body, html {
  font-family: sans-serif;
  font-weight: 100;
  background: #7b4397;   /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #dc2430, #7b4397);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #dc2430, #7b4397); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.chat-box {
    color: black;
}

.headline {
  text-align: center;
  font-weight: 100;
  color: black;
}
.chat-input {
  padding-right: 80%;
  margin: 0;
  margin-left: 8%;
  height: 60px;
  width: 1500px;
}
.chat-area {
  /* border: 2px solid #ccc; */
  background: #ffeafe; /* rgb(153, 138, 161); */
  height: 60vh;
  padding: 1em;
  padding-right: 0%;
  overflow: auto;
  max-width: 80%;
  margin: 0 auto 2em auto;
  margin-left: 8%;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
}
.message {
  width: 80%;
  border-radius: 4px;
  padding: .5em;
  text-align: left;
  padding-left: 2%;
  /*margin-bottom: .5em; */
  font-size: .8em;
}
.message-out .message-time {
  width: 100%;
  border-radius: 4px;
  padding: .5em;
  text-align: right;
  padding-right: 2%;
  color:rgb(63, 56, 56);
  /*margin-bottom: .5em; */
  font-size: .8em;
}
.message-in .message-time {
  width: 100%;
  border-radius: 4px;
  padding: .5em;
  text-align: right;
  padding-right: 2%;
  color:rgb(0, 0, 0);
  /*margin-bottom: .5em; */
  font-size: .8em;
}
.message-out {
  background: #9ea9f0;
  color: black;
}
.message-in {
  background: #6d50aa;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
#person1-input {
  padding: .5em;
}
#person2-input {
  padding: .5em;
}
</style>
