<template>
    <div>
        <h2 class="text-center mt-3 mb-3">Edit Bill Details</h2>
        <div class="">
            <form @submit.prevent="onSubmit" class="form editBill">
                <div class="my-2">
                    <label class="">Bill No:  </label>
                    <input type="text" class="form-control" :value="billNo" disabled />
                    <label class="">Amount Paid:  </label>
                    <input type="number" class="form-control" v-model="form.amount_paid"  required/>
                    <label class="">Discount:  </label>
                    <input type="number" class="form-control" v-model="form.discount" required/>
                    <label class="">TDS:  </label>
                    <input type="number" class="form-control" v-model="form.tds" required/>
                    <label class="">Date Paid:  </label>
                    <input type="date" class="form-control" v-model="form.date_paid" required/>
                    <label class="">Mode of payment:  </label>
                    <select class="form-control form-select" v-model="form.mop" required> 
                        <option value="Cash">Cash</option>
                        <option value="NEFT/RTGS" selected>NEFT/RTGS</option>
                        <option value="Cheque">Cheque</option>
                    </select>
                    <button class="btn btn-success mt-3">Submit</button>
                    
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import {updateBill} from '../index'
    //import {reactive} from 'vue'
    export default{
        setup(){            
            const router = useRouter()
            const route = useRoute()

            const id = computed(() => route.params.id);
            const total = computed(() => route.params.total);          
            let date = computed(() => route.params.date);
            date = date.value;
            const form = {outstandingAmount:'' ,date_paid:'' ,mop: '',discount: '', amount_paid: '', tds: ''}
          
            const onSubmit = async () => {
                let year = String(date).slice(0,4);
                year = parseInt(year,10)
                let month = String(date).slice(5,7);
                month = parseInt(month,10);
                if(month <= 3){
                    year = year - 1;
                }
                year = String(year);  
                form.outstandingAmount = Number(total.value - (form.discount + form.amount_paid + form.tds));
                await updateBill(year,id.value,{...form})
                router.push('/showBill');
            }

            return {form,onSubmit}
        },
        data(){
            return {
                
            }
        },
        mounted(){
           
        },
        computed: {
            billNo(){
                return this.$route.params.billNo;
            }
        }
    }
</script>

<style>
    .editBill{
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
    width: 500px !important;
}

label{
    float: left !important;
    font-size: 20px;
    font-weight: 700;
}
</style>