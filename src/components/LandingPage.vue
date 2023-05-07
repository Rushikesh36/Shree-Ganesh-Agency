<template>
    <h1 class="text-center title"><img class="img-logo" src="../assets/lord-ganesha.svg"/>SHREE GANESH AGENCY</h1> 
    <div class="main">
        <div class="container">
            <router-link to="/addBill">
            <div class="box">
              <div class="boxContent">
                <i class="icon fa-solid fa-receipt"></i>
                <h1 class="title">Add Bill</h1>
                
              </div>
             
            </div>
        </router-link>
        <router-link to="/showBill">
            <div class="box">
              <div class="boxContent">
                <i class="fa-solid fa-file-invoice icon"></i>
                <h1 class="title">Show Bill</h1>
              </div>
              
            </div>
        </router-link>
            <router-link to="/showBillByCompanyName">
            <div class="box">
              <div class="boxContent">
                <i class="fa-solid fa-file-invoice-dollar icon"></i>
                <h1 class="title">Show Bills company wise</h1>
              </div>              
            </div>
            </router-link>
          </div>
    </div>   
</template>
  
<script>
  
</script>
  

<style scoped>
/* Variables */
/* Mixins */
h1.title {
	margin: 1em 0 0.5em 0;
	color: #343434;
	font-weight: bold;
	font-family: 'Ultra', sans-serif;   
	font-size: 36px;
	line-height: 42px;
	text-transform: uppercase;
	text-shadow: 0 2px white, 0 3px #777;
}
  .container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    height: 50vh;
  }
  .container .box {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background-color: #fff;
    margin: 20px;
    transition: 0.3s all ease-in-out;
    position: relative;
    border: 2px solid#ede9e9;
    box-shadow: 0px 0px 15px background #ede9e9;;
    /* Link */
  }
  .container .box .boxContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px;
  }
  .container .box .boxContent .icon {
    color: #8293ff;
    font-size: 48px;
    padding: 15px;
  }
  .container .box .boxContent .title {
    font-size: 24px;
    color: #8293ff;
    font-weight: bold;
    padding: 10px;
  }
  .container .box .boxContent .desc {
    color: #8293ff;
    font-size: 15px;
    height: 20%;
  }
  .container .box a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .container .box:hover {
    background: linear-gradient(130deg, #503bff 0%, #8293ff 100%);
    box-shadow: none;
  }
  .container .box:hover .icon,
  .container .box:hover .title,
  .container .box:hover .desc {
    color: white;
    transition: 0.3s all ease-in-out;
  }
  a{
    text-decoration: none;
  }
  .img-logo{
    height: 7%;
    width: 7%;
    padding-right: 20px;
  }
</style>
  