<template>
    <div class="m-2">  
       <div v-if="deleteStmt!= ' '" class="alert alert-success alert-dismissible delete-alert fade show" role="alert">
            {{ deleteStmt }}
             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>        
        <div class="row form">      
                   
                <div class="alert text-center mb-2" role="alert">
                   <h3>Get All Bills</h3>
                </div>
                <select class="form-select mb-4 text-center" v-model="year">
                    <option value="-1">Select Year</option>
                    <option value="2023">2023-24</option>
                    <option value="2024">2024-25</option>
                    <option value="2025">2025-26</option>
                    <option value="2026">2026-27</option>
                    <option value="2027">2027-28</option>
                    <option value="2028">2028-29</option>
                    <option value="2029">2029-30</option>      
                </select>               
        </div> 
        <div id="printableArea" v-if="this.year!=-1 && bills.length">
            <table class="table table-striped table-hover" >
                <thead>
                    <tr class="table-primary text-center" >
                        <td>Bill No.</td>
                        <td>Company Name</td>
                        <td>Date</td>
                        <td>Total Amount</td>
                        <td>Date Paid</td>
                        <td>Amount paid</td>
                        <td>TDS</td>
                        <td>Discount</td>
                        <td>Outstanding Amount</td>
                        <td>Mode of Payment</td>
                        <td v-if="hideEdit">Edit</td>
                        <td v-if="hideEdit">Delete</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bill in bills" class="text-center" :key="bill.id">
                        <td>{{bill.number}}</td>
                        <td>{{bill.name}}</td>
                        <td>{{bill.date}}</td>
                        <td>{{bill.amount}}</td>
                        <td v-if="bill.date_paid !== undefined"> {{bill.date_paid }} </td>
                        <td v-else> N/A </td>                    
                        <td v-if="bill.amount_paid !== undefined">{{bill.amount_paid}}</td>
                        <td v-else>0</td>
                        <td v-if="bill.tds !== undefined">{{bill.tds}}</td>
                        <td v-else>0</td>
                        <td v-if="bill.discount !== undefined">{{bill.discount }}</td>
                        <td v-else>0</td>
                        <td v-if="bill.outstandingAmount !== undefined">{{bill.outstandingAmount}}</td>
                        <td v-else>{{ bill.amount }}</td>
                        <td v-if="bill.mop !== undefined">{{ bill.mop }}</td>
                        <td v-else>N/A</td>
                        <td v-if="hideEdit">                           
                            <button class="btn text-danger" @click="edit(bill)"><i class="fa-regular fa-pen-to-square"></i></button>
                        </td>
                        <td v-if="hideEdit">
                            <button type="button" class="btn text-danger" @click="deleteBill(bill)"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="text-center">{{ this.totalOutstanding }}</td>
                        <td></td>
                        <td v-if="hideEdit"></td>
                        <td v-if="hideEdit"></td>
                    </tr>
                </tbody>
            </table>  
            <div class="text-center">
                <a type="button" class="btn btn-success m-4" @click="printDiv" >Print <i class="fa-solid fa-print"></i></a>
                <a type="button" class="btn btn-danger m-4" @click="hide">{{hideValue}}</a>
            </div>             
        </div>

        <div v-if="!bills.length && year!=-1" class="alert alert-primary text-center" role="alert">
            No records found for this year
        </div>
        <div v-if="year==-1" class="alert alert-primary text-center" role="alert">
            Please select a Year
        </div>
    
    </div>

</template>

<script>
import { useLoadBill, deleteBillById} from '../index'

export default {
        data(){
            return{
                year: '2023',
                bills: [],
                hideEdit: 1,
                hideValue: 'Hide',
                deleteStmt: ' ',
                totalOutstanding: 0,
            };
        },
        mounted(){
            this.onSubmit();
        },
        methods:{
            edit(bill){
                this.$router.push(`/editBill/${bill.id}/${bill.amount}/${bill.number}/${bill.date}`);
            },
            async onSubmit() {
                if(this.year != -1){
                    const bills = await useLoadBill(this.year);       
                    const sum = bills.map(element => element.outstandingAmount).reduce((a, b) => a + b, 0);    
                    this.totalOutstanding = sum;     
                    this.bills = bills;
                }
            },
            printDiv() {      
                window.print();                
            },
            hide(){
                this.hideEdit = !this.hideEdit;
                if(this.hideEdit){
                    this.hideValue = 'Hide';
                }else{
                    this.hideValue = 'Show';
                }
            },
            deleteBill(bill){
                deleteBillById(bill);
                this.deleteStmt = `${bill.number} successfully deleted!`;
                this.onSubmit();               
            },
        },
        watch:{
            year() {
                this.onSubmit();
            }
        },
}        
</script>

<style>
.form{
    margin: auto;
    width: 15%;
}
.alert-primary, .alert-warning{
    width: 40%;
    margin: auto;
}
#printableArea{
    margin: 0 5%;
}
.delete-alert{
    width: 40%;
    margin: 10px auto;
}
</style>