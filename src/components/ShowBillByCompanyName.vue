<template>
    <div class="m-5 box">
        <div v-if="deleteStmt!= ' '" class="alert alert-success delete-alert alert-dismissible fade show" role="alert">
            {{ deleteStmt }}
             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
           </div>
        <form class="form">
           
                <label class="d-inline">Select Year:  </label>
                <select class="d-inline form-select" v-model="year"> 
                    <option value="-1">Select Year</option>
                    <option value="2023">2023-24</option>
                    <option value="2024">2024-25</option>
                    <option value="2025">2025-26</option>
                    <option value="2026">2026-27</option>
                    <option value="2027">2027-28</option>
                    <option value="2028">2028-29</option>
                    <option value="2029">2029-30</option> 
                </select>
                
                <label for="company" class="mt-3">Select Company Name:  </label>
                <select id="company" class="form-select" v-model="companyName"> 
                    <option selected value="-1">Select Company Name</option>
                    <option v-for="name in names" :key="name.id">{{ name.name }}</option>
                </select>               
        </form>
        <div class="table1" v-if="companyName!=-1 && year!=-1 && bills.length">
            <table class="table m-5 p-3 table-striped table-hover" v-if="this.year!=-1 && bills.length">
                <thead>
                    <tr class="table-primary text-center">
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
                    <tr class="text-center">
                        <td></td>
                        <td></td>
                        <td>Total <i class="fa-solid fa-arrow-right"></i></td>
                        <td v-if="obj.amount !== undefined">{{obj.amount}}</td>
                        <td></td>
                        <td v-if="obj.amountPaid !== undefined">{{ obj.amountPaid }}</td>
                        <td v-else>0</td>
                        <td v-if="obj.tds !== undefined">{{ obj.tds }}</td>
                        <td v-else>0</td>
                        <td v-if="obj.discount !== undefined">{{obj.discount}}</td>
                        <td v-else>0</td>
                        <td v-if="obj.outstandingAmount !== undefined">{{obj.outstandingAmount}}</td>
                        <td></td>
                        <td v-if="hideEdit"></td>
                        <td v-if="hideEdit"></td>
                    </tr>
                </tbody>                
            </table>
            <div class="text-center">
                <a class="btn btn-success m-4" @click="printDiv" > Print <i class="fa-solid fa-print"></i></a>
                <a class="btn btn-danger m-4" @click="hidefn">{{hideValue}}</a>
            </div>         
        </div>
        <div v-if="companyName == '-1'" class="alert alert-warning text-center mt-4" role="alert">
            Please select a company
        </div>
        <div v-if="year == '-1'" class="alert alert-warning text-center mt-4" role="alert">
            Please select a year
        </div>
        <div v-if="year != '-1' && companyName != '-1' && !bills.length" class="alert alert-warning text-center mt-4" role="alert">
            No record Found
        </div>
    </div>
</template>

<script>
    import {useLoadCompany, useLoadBillbyName, deleteBillById} from '../index'
    export default {
        setup(){
            const names = useLoadCompany()
            return {names}
        },
        data(){
            return {
                companyName: '-1',
                year : '2023',
                bills: [],
                obj: {
                        amount: 0,
                        discount: 0,
                        outstandingAmount: 0,
                        amountPaid: 0,   
                        tds: 0,                    
                },
                hideEdit: 1,
                hideValue: 'Hide',
                deleteStmt: ' ',
            }
        },
        methods:{
            async onSubmit() {
                if(this.companyName!=-1 && this.year!=-1){
                    const bills = await useLoadBillbyName(this.companyName,this.year);                
                    this.bills = bills;
                    this.obj.amount= 0;
                    this.obj.discount= 0;
                    this.obj.outstandingAmount= 0;
                    this.obj.amountPaid= 0;
                    this.obj.tds = 0;
                    for(const bill of bills){
                        console.log(bill)
                        if(bill.amount)
                        this.obj.amount += Number(bill.amount);
                        if(bill.discount)
                        this.obj.discount += Number(bill.discount);
                        if(bill.amount_paid)
                        this.obj.amountPaid += Number(bill.amount_paid);
                        if(bill.tds)
                        this.obj.tds += Number(bill.tds);
                        if(bill.outstandingAmount !== undefined)
                        this.obj.outstandingAmount += Number(bill.outstandingAmount);
                        else
                        this.obj.outstandingAmount += Number(bill.amount);
                    }
                }
            },
            edit(bill){
                this.$router.push(`/editBill/${bill.id}/${bill.amount}/${bill.number}/${bill.date}`);
            },
            printDiv() {      
                window.print();                
            },
            hidefn(){
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
            year(value) {
                if(value!= -1)
                this.onSubmit();
            },
            companyName(value) {
                if(value!= -1)
                this.onSubmit();
            }
        },
    }

</script>

<style scoped>
.form{
    margin: auto;
    width: 30%;
}
.box{
    width: 80%;
}
.delete-alert{
    width: 40%;
    margin: 10px auto;
}
</style>
  