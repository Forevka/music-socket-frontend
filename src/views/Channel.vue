<template>
<LoadingSpinner v-if='loading'></LoadingSpinner>
<div v-else>
  <div class="grid" v-if='exist'>
    <div class="main">
      <div class="main__container">
        <div class="main__settings">
          <div class="settings__group">
            <ChannelDropdown @changeStatus="changeStatus" @userLogout="userLogout"/>
          </div><input class="search__input" type="text" v-model="searchQuery" placeholder="Type for Search"/></div>
        <div class="main__friends">
          <div class="friend__category" v-for="(category, index) in availabeCategories" :key='index'>{{ category.name }}
            <div class="friend__status" v-for="user in getUsersStatusList(users, category.status)" :key="user.userid">
              <!--<avatar :username=user.username :src=user.avatar></avatar>-->
              <div class="friend__avatar" v-bind:style="{'background': 'url('+user.avatar+')', 'border-radius': '50%', 'min-height': '2rem', 'min-width': '2rem', 'background-position': 'center', 'background-size': '100% 100%'}">
                <div class="avatar__status"  v-bind:style="{'background': category.color, 'border-radius': '50%', 'min-height': '0.8rem', 'min-width': '0.8rem'}"></div>
                <!--<status-indicator class="avatar__status" status="active" pulse/>-->
              </div>
              <div class="friend__user">
                <div class="user__name" v-on:click="mentionUser(user.username)">{{ user.username }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="chat__container">
        <div class="chat__channel">
          <div class="header__title">{{ channel.name }}</div>
        </div>
        <div class="chat__chat" ref="chat" @scroll="onChatScroll">
          <b-progress type="is-info" v-if="loadingHistory" v-animate-css="'fadeIn'" show-value>
            Loading messages...
          </b-progress>
          <div class="chat__post" v-for="(post, index) in posts" :key='index' v-animate-css="'fadeIn'">
            <div class="post__avatar" v-bind:style="{'background-image': 'url('+post.avatar+')'}"></div>
            <div class="post__content">
              <div class="post__name" v-on:click="mentionUser(post.username)">{{ post.username }}</div>
              <div class="post__timestamp">{{ post.timestamp }}</div>
              <div class="post__is_you">{{ post.userid === currentUser.userid ? 'You' : ''}}</div>
              <div class="post__message">{{ post.text }}</div>
            </div>
          </div>
        </div>
        <div class="chat__input" v-if="isLoged">
          <div class="input__container">
            <input class="input__message" type="text" placeholder="Enter message" v-model="post" @keyup.enter="createPost" ref="inputPost"/>
          </div>
        </div>
        <div class="chat__input" v-else>
          <div class="input__container">
            <input disabled class="input__message" type="text" placeholder="Need to login" v-model="post" @keyup.enter="createPost" ref="inputPost"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <ChannelDoesntExist/>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { StatusIndicator } from 'vue-status-indicator'
import store from '../stores/index'
import HTTP from '@/utils/HTTPApi'
import LoadingSpinner from '@/components/LoadingSpinner'
import ChannelDropdown from '@/components/ChannelDropdown'
import ChannelDoesntExist from '@/components/ChannelDoesntExist'

export default {
  components: {
    StatusIndicator,
    ChannelDoesntExist,
    LoadingSpinner,
    ChannelDropdown
  },
  data () {
    return {
      exist: true,
      needScroll: true,
      haveHistory: true,
      messageHistoryPage: 1,
      radioButtonStatus: 1,
      loading: true,
      loadingHistory: true,
      active: false,
      post: '',
      searchQuery: '',
      availabeCategories: [
        {
          name: 'Online',
          color: 'rgb(68, 182, 130)',
          status: 1
        },
        {
          name: 'Offline',
          color: 'rgb(178,34,34)',
          status: 2
        },
        {
          name: 'DND',
          color: 'rgb(255,69,0)',
          status: 3
        }
      ],
      channel: {
        name: 'Default'
      },
      users: [],
      posts: [],
      mentionRegex: /\B@\w+/g
    }
  },
  created () {
    Vue.prototype.$mainApp.showNavBar = false
    Vue.prototype.$channel = this
    console.log('child')
    // let thisChannel = store.getters.get_channel_by_id(Number(this.$route.params.id))
    // if (thisChannel === undefined) {
    HTTP.Instance().getChannelById(Number(this.$route.params.id)).then(r => {
      store.dispatch('change_current_channel', r)
      store.dispatch('change_channel', { channelId: Number(this.$route.params.id) })
      this.loading = false
      Vue.prototype.$awn.success('Channel ' + r.id)
    })
      .catch(error => {
        /* if (store.getters.get_current_channel.id !== -1) {
          this.channel = thisChannel
        } else { */
        this.loading = false
        this.exist = false
        // this.$router.replace({ name: 'ChannelDoesntExist' })
        // }
        console.log(error)
      })
    /* } else {
      store.dispatch('change_current_channel', thisChannel)
      store.dispatch('change_channel', {channelId: Number(this.$route.params.id)})
      this.loading = false
      this.channel = thisChannel
    } */
    this.channel = store.getters.get_current_channel
    this.$connect()
  },
  beforeDestroy () {
    this.$disconnect()
    Vue.prototype.$channel = undefined
  },
  afterDestroy () {
    Vue.prototype.$mainApp.showNavBar = true
  },
  mounted () {
    //
  },
  updated () {
    if (this.needScroll) {
      this.$nextTick(() => {
        let chat = this.$refs.chat
        chat.scrollTop = chat.scrollHeight
      })
    } else {
      this.needScroll = true
    }
  },
  methods: {
    onSocketOpen: function (data) {
      this.sendRequest('Login', store.getters.getUser)
    },
    onSocketMessage: function (data) {
      console.log(data)
    },
    onLogin: function (state, event, message) {
      console.log(event.body)
      this.insertUser(event.body)
    },
    insertUser: function (user) {
      if (user.id !== -1) {
        this.users.push({
          username: user.login,
          avatar: user.avatar,
          userid: user.id,
          status: user.status,
          role: user.role
        })
      }
    },
    onUserList: function (state, event, message) {
      console.log(event)
      event.body.forEach(newUser => {
        this.insertUser(newUser)
      })
    },
    onMessageListHistory: function (state, event, message) {
      this.loadingHistory = false
      console.log(event.body)
      this.needScroll = false
      if (event.body.length < 20) {
        this.haveHistory = false
      }
      event.body.forEach(message => {
        message.timestamp = moment.unix(message.timestamp).format('h:mm')
        // this.checkMention(message.text)
        this.posts.unshift(message)
      })
    },
    getUsersStatusList: function (userList, status) {
      let needStatus = status
      let s = this.searchQuery.replace(/ /g, '')
      return userList.filter(function (u) {
        return u.status === needStatus && u.username.replace(/ /g, '').toLowerCase().indexOf(s.toLowerCase()) !== -1
      })
    },
    deleteUserList: function (state, event, message) {
      console.log(event)
      var i = this.users.length
      while (i--) {
        if (this.users[i].userid === event.body.id) {
          this.users.splice(i, 1)
        }
      }
    },
    sendRequest: function (event, body = {}) {
      return this.$socket.sendObj({'event': event, 'token': store.getters.getUser.token, 'body': body, 'timestamp': moment().unix()})
    },
    createPost: function () {
      let post = this.post && this.post.trim()
      if (!post) {
        return false
      }
      // this.insertPost(post)
      this.sendRequest('ChatMessage', this.generatePost(post))
      this.post = ''
    },
    insertPost: function (state, event, message) {
      console.log(event)
      event.body.timestamp = moment.unix(event.body.timestamp).format('h:mm')
      this.checkMention(event.body.text)
      this.posts.push(event.body)
    },
    checkMention: function (text) {
      let m
      while ((m = this.mentionRegex.exec(text)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === this.mentionRegex.lastIndex) {
          this.mentionRegex.lastIndex++
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
          console.log(`Found match, group ${groupIndex}: ${match}`)
          console.log(this.currentUser.username)
          if (match.replace('@', '') === this.currentUser.username) {
            Vue.prototype.$awn.info('You mentioned')
          }
        })
      }
    },
    mentionUser: function (username) {
      this.post += '@' + username + ' '
      this.$refs.inputPost.focus()
    },
    generatePost: function (text) {
      return {
        text: text,
        username: this.currentUser.username,
        avatar: this.currentUser.avatar,
        userid: this.currentUser.userid,
        channelId: this.currentUser.channelId,
        timestamp: moment().unix()
      }
    },
    changeStatus: function (status) {
      this.sendRequest('ChangeStatus', {status: status})
    },
    onChangeStatus: function (state, event, message) {
      console.log(event)
      let needId = event.body.id
      let user = this.users.filter(function (u) {
        return u.userid === needId
      })
      user.forEach(user => {
        user.status = event.body.status
      })

      this.users = this.users.filter(function (u) {
        return u.status !== -1
      })
      console.log(user)
    },
    onChatScroll ({target: { scrollTop, clientHeight, scrollHeight }}) {
      if (scrollTop === 0 && this.haveHistory === true) {
        this.needScroll = false
        this.messageHistoryPage += 1
        console.log(this.messageHistoryPage)
        this.sendRequest('MessageListHistory', this.messageHistoryPage)
        this.loadingHistory = true
      }
    },
    userLogout: function () {
      this.sendRequest('ChangeStatus', {status: -1})
    }
  },
  computed: {
    isLoged () {
      return store.getters.getUser.role !== 'Guest'
    },
    timestamp () {
      return moment().format('h:mm')
    },
    currentUser () {
      return store.getters.getUser
    }
  },
  watch: {
    radioButtonStatus: function (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }
}
</script>

<style lang="scss" scoped>
/* Variables */

$background-nav: rgb(32, 34, 36);
$background-header: rgb(40, 42, 46);
$background-header-chat: #2f3136;
$background-main: #222;
$color-black: rgb(26, 26, 26);
$color-blue: rgb(114, 136, 218);
$color-green: rgb(68, 182, 130);
$color-red: rgb(178,34,34);
$color-orange: rgb(255,69,0);
$color-white: rgb(240, 244, 255);
$font-family-text: "acumin-pro", sans-serif;

/* Mixins */

@mixin circle($background, $border-radius, $size) {
  background: $background;
  border-radius: $border-radius;
  min-height: $size;
  min-width: $size;
  background-position: center;
  background-size: 100% 100%;
}

@mixin flex($flex-direction, $align-items, $justify-content) {
  display: flex;
  flex-direction: $flex-direction;
  align-items: $align-items;
  justify-content: $justify-content;
}

@mixin tooltip($background, $color) {
  color: $color;
  &:before,
  &:after {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  &:hover:before,
  &:hover:after {
    opacity: 1;
    z-index: 1;
  }
  &:before {
    left: calc(100% + 0.25rem);
    border-top: 0.25rem solid transparent;
    border-bottom: 0.25rem solid transparent;
    border-right: 0.25rem solid $background;
    content: "";
  }
  &:after {
    left: calc(100% + 0.5rem);
    background-color: $background;
    border-radius: 0.25rem;
    content: attr(data-tooltip);
    padding: 0.25rem 0.5rem;
    white-space: nowrap;
  }
}

/* Animations */
@keyframes pulse {
  0% {
    background-color: red;
  }
  100% {
    background-color: #323232;
  }
}

/* Elements */
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  color: $color-white;
  font: normal 1.25rem / 125% $font-family-text;
  margin: 0;
  text-rendering: optimizeLegibility;
}

input {
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: $color-white;
  outline: none;
}

/* Root grid */

.grid {
  position: fixed;
  display: grid;
  grid-template-columns: 22rem 1fr;
  width: 100vw;
  // max-height: calc(100% - 3.25em)
}

/* Header */

.header {
  background: $background-header-chat;
  &__server:hover {
    background: $background-header;
  }
  &__channel {
    color: rgba($color-white, 0.5);
    padding: 1rem;
  }
  &__profile {
    @include flex(null, center, space-between);
    background: $background-header;
    padding: 0 1rem;
  }
}

.channel__item {
  margin-bottom: 2rem;
}

.channel__item > div {
  margin-bottom: 1rem;
}

.channel__title {
  @include circle(null, 0.25rem, 3rem);
  @include flex(null, center, null);
  padding-left: 1.25rem;
  width: 100%;
  &:hover {
    background: rgba($color-white, 0.05);
    color: $color-white;
  }
}

.header__title {
  font-size: 150%;
  color: #bfc3c3;
  text-shadow: 5px 3px 7px black;
}

.profile__badge {
  @include flex(null, center, null);
}

.profile__avatar,
.friend__avatar {
  @include circle($background-main, 50%, 3rem);
  margin-right: 1rem;
  position: relative;
}

.avatar__status {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
}

.user__id {
  color: rgba($color-white, 0.25);
}

.profile__settings {
  @include flex(null, center, null);
}

.profile__setting {
  @include circle($background-main, 50%, 1rem);
  &:not(:last-child) {
    margin-right: 1rem;
  }
}

/* chat */

.chat {
  background: $background-main;
  padding: 0rem 0rem 0rem;
  &__chat {
    height: calc(100vh - 10rem);
    overflow-y: scroll;
    padding: 1rem;
  }
  &__post {
    // animation: pulse 1s ease-out;
    @include flex(null, flex-start, null);
    position: relative;
    padding: 10px 10px;
    background: #323232;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
  &__input {
    padding: 1rem;
  }
}

.post__avatar {
  @include circle($color-blue, 50%, 3rem);
  background-position: center;
  background-size: 100% 100%;
  margin-right: 1rem;
}

.post__name {
  position: relative;
  bottom: 8px;
  color: skyblue;
  display: inline;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.post__timestamp {
  position: relative;
  bottom: 8px;
  color: rgba($color-white, 0.25);
  display: inline;
  font-size: 0.75rem;
}

.post__is_you {
  color: rgba($color-white, 0.25);
  position: absolute; /* блок занимает ширину содержимого, max-width её ограничивает */
  top: 0.3em; /* прикрепить к верху родителя */
  right: 0.5em;
  display: inline-block;
  font-size: 0.75rem;
}

.post__message {
  color: rgba($color-white, 0.75);
  word-break: break-word;
}

.input__container {
  @include flex(null, center, null);
  background: lighten($background-main, 5%);
  height: 100%;
  padding: 0 1rem;
}

.input__message {
  font: normal 1.25rem / 100% $font-family-text;
  width: 100%;
}

/* Main */

.main {
  background: $background-header-chat;
  height: 100vh;
  &__container {
    display: grid;
    grid-template-rows: 5rem 1fr;
  }
  &__settings {
    background: $background-main;
  }
  &__friends {
    height: calc(100vh - 5rem);
    overflow-y: scroll;
    padding: 1rem;
  }
  .avatar__status {
    @include circle(null, null, 0.75rem);
  }
  .user__name {
    color: rgba($color-white, 0.75);
  }
}

.main__settings {
  @include flex(null, center, space-between);
  padding: 0 1rem;
}

.settings__group {
  @include flex(row, null, null);
}

.group__setting {
  @include circle(lighten($background-main, 10%), 50%, 1rem);
  &:not(:last-child) {
    margin-right: 1rem;
  }
}

.settings__search {
  position: relative;
}

.search__input {
  background: lighten($background-main, 10%);
  border-radius: 0.25rem;
  font: normal 1rem / 100% $font-family-text;
  height: 2rem;
  padding: 0 0.5rem;
}

.friend__status {
  @include flex(null, center, null);
  padding: 5px;
  &:first-child {
    margin-top: 0.3rem;
  }
  &:hover {
    background: #222;
    border-radius: 10px;
  }
}

.friend__category {
  color: rgba($color-white, 0.25);
  margin-bottom: 1rem;
}

.friend__avatar {
  // @include circle(url('https://ui-avatars.com/api/?name=Forevka&size=128&background=b0a0a1'), 50%, 2rem);
  margin-right: 1rem;
}

.main__friends .user__name:hover {
  color: $color-white;
  cursor: pointer;
}

/* Repeats */

.header__container,
.chat__container {
  display: grid;
  grid-template-rows: 5rem 1fr 5rem;
  height: 100%;
}

.header__server,
.chat__channel {
  padding: 0 1rem;
}

.header__server,
.chat__channel,
.main__title {
  @include flex(null, center, null);
  border-bottom: 0.025rem solid $background-nav;
}
</style>
