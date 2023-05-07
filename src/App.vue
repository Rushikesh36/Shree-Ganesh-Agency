<template>
    <HeaderComponent />
    <div v-if="key != password" class="admin text-center">
      <h1>Login</h1>
      <div><i class="fa-solid fa-user icon"></i></div>
      <input type="text" placeholder="Enter Password" v-model="key">
      <div v-if="key != password && key!=''" class="alert alert-primary text-center mt-5" role="alert">
        Incorrect password
      </div>
    </div>
    
    <main v-if="key == password">
    <router-view>

    </router-view>
    </main>
</template>

<script>
import HeaderComponent from "./components/Partials/HeaderComponent.vue"


export default {
  name: 'App',
  components: {
    
    HeaderComponent
  },
  data() {
    return{
      isLoggedIn: false,
      password: 'Ganesh12#',
      key: '',
    }
  }
}
</script>

<style>
#app {
  font-family: poppins, Avenir, Helvetica, Arial, sans-serif; 
}
.admin{
  margin: 20vh auto;
}
.icon{
  font-size: 5rem;
  color: #001f8d;
  padding: 20px;
}
</style>
