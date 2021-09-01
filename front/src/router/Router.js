import { Route, Switch, useLocation } from "react-router-dom"
import Dashboard from "../components/layouts/Dashboard";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import ShopRoute from "../components/shop/ShopRoute";
import loadjs from "loadjs";
import { useEffect } from 'react';

const Router = () => {
    const {pathname} = useLocation();
    useEffect(()=>{
        loadjs('/assets/js/main.js',()=>{});
    },[pathname]);
    return (
        <> 
           <Header></Header>
                <Switch>
                    <Route exact path="/" component={Dashboard}></Route>
                    <Route path="/shop" component={ShopRoute}></Route>
                </Switch>
           <Footer></Footer>
        </>
    );
}

export default Router;