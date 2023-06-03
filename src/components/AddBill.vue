<template>
    <h2 class="text-center mt-3 mb-5">Add New Bill Details</h2>
    <div class=""> 
        <div class="addBillForm">
            <div class="addForm">
                <div v-if="pass" class="alert alert-success alert-dismissible fade show" role="alert">
                    Bill Added Successfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <form @submit.prevent="onSubmit" class="my-2 form-group">
                <label class="">Select Company Name:  </label>
                <select class="form-select" v-model="form.name" required> 
                    <option selected value="-1">Select Company Name</option>
                    <option v-for="name in names" :key="name.id">{{ name.name }}</option>
                </select>
                <label class="">Bill Number:  </label>
                <input type="text" class="form-control" v-model="form.number" required/>
                <label class="">Amount:  </label>
                <input type="number" class="form-control" v-model="form.amount" required />
                <label class="">Date:  </label>
                <input type="date" class="form-control" v-model="form.date" required/>
                <button type="submit" class="btn btn-success m-3">Submit</button>
            </form>
            <div v-if="form.name == '-1'" class="alert alert-warning add-warn text-center mt-4" role="alert">
                Please select a company Name
            </div>
                        
            </div>
        </div>
        
    </div>
</template>
  
<script>
import {createBill,useLoadCompany} from '../index'
    export default {    
        setup(){
            const names = useLoadCompany()
            return {names}
        },
        data(){
            return{
                form: {
                    name: '',
                    number: '',
                    amount: '',
                    date: '',
                    outstandingAmount: '',
                    index: '',
                },
                pass: 0,
            };
        },
        mounted(){
    
        },
        methods:{
            onSubmit () {
                if(this.form.name == -1){
                    return;
                }
                this.form.outstandingAmount = this.form.amount;
                this.form.number = this.form.number.toUpperCase();
                let index = parseInt(this.form.number.replace(/[A-Z]/gi, ''));
                let isCharacterPresent = this.form.number.includes('A');
                if(isCharacterPresent) {
                    index = index * 2
                }else{
                    index = (index * 2) - 1;
                }
                this.form.index = index;
                let year = String(this.form.date).slice(0,4);
                year = parseInt(year,10)
                let month = String(this.form.date).slice(5,7);
                month = parseInt(month,10);
                if(month <= 3){
                    year = year - 1;
                }
                year = String(year);              
                createBill(year,{...this.form})
                this.resetBill();
            },
            resetBill() {
                this.form.name = ''
                this.form.number = ''
                this.form.amount = ''
                this.form.date = ''
                this.form.outstandingAmount = ''
                this.pass = 1;
            }
        }
        
    }   
  
</script>
  

<style scoped>
    .addBillForm{
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
.addForm{
    width: 500px !important;
}
label{
    float: left !important;
    font-size: 20px;
    font-weight: 700;
}
.add-warn{
    width: 60%;
}
</style>
  