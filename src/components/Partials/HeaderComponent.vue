<template>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">
      <img src="../../assets/lord-ganesha.svg" alt="" width="50" height="50" class="d-inline-block align-text-center">
      SHREE GANESH AGENCY
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/register" class="nav-link" aria-current="page">Add Company</router-link>
        <router-link to="/addBill" class="nav-link">Add Bill</router-link>
        <router-link to="/showBill" class="nav-link">Show Bill</router-link>
        <router-link to="/showBillByCompanyName" class="nav-link">Show By company Name</router-link>
        <!-- <router-link class="nav-link" href="#">Pricing</router-link>
        <router-link class="nav-link" href="#" tabindex="-1" aria-disabled="true">Disabled</router-link> -->
      </div>
    </div>
  </div>
</nav>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        mounted(){

        },
        methods(){
            
        }
    }   
    
    
</script>

<style>
.a :hover{
  color: blue;
}
</style>
