<template>
    <div class="">
        <h2 class="text-center mt-3">Register New Company</h2>
            <form @submit.prevent="onSubmit" class="addCompany">
                <div class="registerForm form-group">
                    <label for="name" class="">Name </label>
                    <input type="text " class="form-control" id="name" v-model="form.name" required/>
                    <button class="btn btn-success mt-3">Submit</button>
                </div>    
            </form>

            <div class="loc">
                <h3 class="text-center">List of Companies</h3>
                <ul class="list-group">
                    <li v-for="(name,index) of names" :key="name" class="list-group-item">
                        <span class="badge bg-primary rounded-pill mr-3">{{index+1}}</span>
                        {{ name.name }}
                    </li>
                </ul>
            </div>


    </div>
    
</template>

<script>
   
   import {createCompany} from '../index'
    import {reactive} from 'vue'
    import {useLoadCompany} from '../index'
    export default {
        setup(){
            const form = reactive({name: ''})
            
            const onSubmit = async () => {
                await createCompany({...form})
                form.name = ''
            }
            const names = useLoadCompany()
            return {form,onSubmit,names}
        },
        data(){
            return{
                
            };
        },
        mounted(){
            
        },
        methods:{
            
        },
        
    }   
    
    
</script>

<style scoped>
.registerForm{
    width: 30%;
}
.addCompany{
    position: relative;
    text-align: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 30px;
}
label{
    float: left !important;
    font-size: 20px;
    font-weight: 700;
}
.loc{
    width: 25%;
    margin: 0 auto 5% auto;
}
.badge{
    margin-right: 10px;
}
</style>
