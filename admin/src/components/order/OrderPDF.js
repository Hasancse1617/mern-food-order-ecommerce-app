import React, { useEffect, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Pdf from "react-to-pdf";
import { fetchOrder } from '../../store/actions/OrderAction';
import ComponentToPrint from './ComponentToPrint ';

const OrderPDF = () => {
    const componentRef = useRef();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, loading } = useSelector((state)=>state.OrderReducer);

    useEffect(()=>{
        dispatch(fetchOrder(id));
        setTimeout(()=>{
            // document.getElementById('printClick').click();
        },1000);
    },[]);
    return (
       <div>
           <Pdf targetRef={componentRef} filename="invoice.pdf">
              {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
           </Pdf>
            <div style={{width:"100%", display:"none"}} ref={componentRef}>
               <ComponentToPrint order={order}/>
            </div> 
       </div>
    );
}

export default OrderPDF;