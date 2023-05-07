import { createRouter , createWebHistory } from 'vue-router';
import LandingPage from '../src/components/LandingPage';
import RegisterCompany from '../src/components/RegisterCompany';
import AddBill from '../src/components/AddBill';
import ShowBill from '../src/components/ShowBill';
import ShowBillByName from '../src/components/ShowBillByCompanyName';
import EditBill from '../src/components/EditBill';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/' , component : LandingPage},
        { path: '/register' , component : RegisterCompany},
        { path: '/addBill' , component : AddBill},
        { path: '/showBill' , component : ShowBill},
        { path: '/showBillByCompanyName' , component : ShowBillByName},
        { path: '/editBill/:id/:total/:billNo/:date' , component : EditBill},
    ],
    scrollBehavior(to) {
        document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
});

export default router;
