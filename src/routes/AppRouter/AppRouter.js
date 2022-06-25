import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as ROUTES from "../routes";
import Login from "../../views/Login/Login";
import DocumentsHistory from "../../views/DocumentsHistory/DocumentsHistory";
// import Layout from "../../hoc/Layout/Layout.js";
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from '../../store/actions/actionsType';
import Sales from '../../views/Sales/Sales';
import Payments from '../../views/Payments/Payments';

const AppRouter = () => {

    const userInf = useSelector(state => state.userReducer.user);
    const userInfLocal = JSON.parse(localStorage.getItem("userPUCPIN"));
    const dispatch = useDispatch();

    React.useEffect(()=>{
        if (userInf && Object.keys(userInf).length === 0) {
            
            if (userInfLocal!=null){
                dispatch({ type: actionTypes.LOGIN, user: userInfLocal });
            }
        }   
    });


    let publicRoutes = (
        <Routes>       
            <Route index element={<Login/>} /> 
            <Route element={<DocumentsHistory/>} /> 
        </Routes>
    )
    
    let routes = (
        <Routes>       
            <Route index element={<Login/>} />     
            <Route path={ROUTES.NUEVO_DOCUMENTO} element={<Sales/>} /> 
            <Route path={ROUTES.INGRESAR_PAGO} element={<Payments/>} /> 
            <Route path={ROUTES.DOCUMENTS_HISTORY} element={<DocumentsHistory/>} />   
        </Routes>
    );

    return(
        <BrowserRouter>
            {userInf && userInf.name? routes:publicRoutes}
        </BrowserRouter>
    )


};

export default AppRouter;