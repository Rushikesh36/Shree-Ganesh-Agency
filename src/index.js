import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ref, onUnmounted} from 'vue'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyBfDLdOoKMhS3zXSZrtxKiPjp6UTpao-DE",
    authDomain: "office-project-34b83.firebaseapp.com",
    databaseURL: "https://office-project-34b83-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "office-project-34b83",
    storageBucket: "office-project-34b83.appspot.com",
    messagingSenderId: "644206968216",
    appId: "1:644206968216:web:36004c3400c0fc1e95ffed",
    measurementId: "G-ZYY4KRT05J"
  };

  const firebaseApp = firebase.initializeApp(config);

  const db = firebaseApp.firestore()
  const companyCollection = db.collection('Company')
  const billCollection = db.collection('Bill')

  //Company
  export const createCompany = company => {
    return companyCollection.add(company)
  }

  export const getCompany = async id => {
    const company = await companyCollection.doc(id).get()
    return company.exists ? company.data() : null
  }

  export const useLoadCompany = () => {
    const companies = ref([])
    const close = companyCollection.onSnapshot(snapshot => {
      companies.value = snapshot.docs.map(doc => ({id : doc.id, ...doc.data()}))
    })
    onUnmounted(close)
    return companies
  }
  //Bill
  export const createBill = (year,bill) => {
    return billCollection.doc(year).collection(`Bills${year}`).add(bill)
  }

  export const getBill = async id => {
    const bill = await billCollection.doc(id).get()
    return bill.exists ? bill.data() : null
  }

  export const updateBill = (year,id,bill) => {
    return billCollection.doc(year).collection(`Bills${year}`).doc(id).update(bill)
  }

  export const useLoadBill = async (year) => {
    let bills = [];
    const snapshot = await billCollection.doc(year).collection(`Bills${year}`).orderBy('number','asc').get();  
    snapshot.forEach(doc => {
      bills.push({...doc.data(),id: doc.id});
    });
      
    return bills
  }

  export const useLoadBillbyName = async (name, year) => {
    let bills = [];
   
    const snapshot = await billCollection.doc(year).collection(`Bills${year}`).orderBy('number','asc').where('name','==',name).get();
    snapshot.forEach(doc => {
      bills.push({...doc.data(),id: doc.id});
    });
    
    return bills
  }

  export const deleteBillById = async (bill) => {
    let year = String(bill.date).slice(0,4);
    year = parseInt(year,10)
    let month = String(bill.date).slice(5,7);
    month = parseInt(month,10);
    if(month <= 3){
        year = year - 1;
    }
    year = String(year);    
    return await billCollection.doc(year).collection(`Bills${year}`).doc(bill.id).delete();
  }