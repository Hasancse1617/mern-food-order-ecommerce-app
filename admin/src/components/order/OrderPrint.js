import React, { useEffect, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { fetchOrder } from '../../store/actions/OrderAction';
import ComponentToPrint from './ComponentToPrint ';

const OrderPrint = () => {
    const componentRef = useRef();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, loading } = useSelector((state)=>state.OrderReducer);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(()=>{
        dispatch(fetchOrder(id));
        setTimeout(()=>{
            document.getElementById('printClick').click();
        },1000);
    },[]);
    return (
       <div>
          <div style={{display: "none"}}><ComponentToPrint ref={componentRef} order={order}/></div> 
           <button style={{display: "none"}} id="printClick" onClick={handlePrint}>Print this out!</button>
       </div>
    );
}

export default OrderPrint;