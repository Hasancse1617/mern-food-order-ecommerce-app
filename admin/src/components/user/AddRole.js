import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRole, fetchPermission } from "../../store/actions/UserAction";
import { useState } from "react";
import $ from 'jquery';
import { REMOVE_USER_ERRORS } from "../../store/types/UserType";
import Forbidden from "../forbidden/Forbidden";
import { REMOVE_UNAUTHORIZED_ACCESS } from "../../store/types/AuthType";

const AddRole = (props) => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState([]);
    const [role, setRole] = useState('');
    const { user:{user_type}, unauthorized } = useSelector((state)=> state.AuthReducer);
    const { permissions, userErrors, redirect } = useSelector((state)=>state.UserReducer);
    const handleCheck = (e) =>{
        const arr = [];
        $('.permission:checked').each(function(e){
            arr.push($(this).val());
        })
        setInfo([...arr]);
        $(document).on("click",".permission", function(){
            //Check/Uncheck Group name
            const group_name = $(this).attr("data-group");
            const checkboxCount = $('.'+group_name).length;
            const checkedCount = $('.'+group_name+":checked").length;
            if(checkboxCount === checkedCount){
                $("#"+group_name).prop("checked", true);
            }else{
                $("#"+group_name).prop("checked", false);
            }
            //Check/Uncheck All value
            const checkAll = $('input[type=checkbox]').length;
            const checkedAll = $('input[type=checkbox]:checked').length;
            if(checkAll === checkedAll + 1){
                $('.checkAll').prop("checked", true);
            }
            if((checkAll-1) > checkedAll){
                $('.checkAll').prop("checked", false); 
            }
        });
    }
    const handleGroup = (e) =>{
        const group_name = e.target.value;
        const arr = [];
        if(e.target.checked){
            $('.'+group_name).prop("checked", true);
        }else{
            $('.'+group_name).prop("checked", false);
        }
        $('.permission:checked').each(function(e){
            arr.push($(this).val());
        })
        setInfo([...arr]);
        const checkboxCount = $('input[type=checkbox]').length;
        const checkedCount = $('input[type=checkbox]:checked').length;
        if(checkboxCount === (checkedCount + 1)){
            $('.checkAll').prop("checked", true);
        }else{
            $('.checkAll').prop("checked", false);
        }
    }
    const handleAll = (e) =>{
        const arr = [];
        if(e.target.checked){
            $('input[type=checkbox]').prop("checked", true);
        }else{
            $('input[type=checkbox]').prop("checked", false);
        }
        $('.permission:checked').each(function(e){
            arr.push($(this).val());
        })
        setInfo([...arr]);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(addRole({role, permissions: info}, user_type));
    }
    // console.log("Checked", info);
    useEffect(()=>{
        dispatch(fetchPermission());
        return ()=>{
            dispatch({type: REMOVE_UNAUTHORIZED_ACCESS});
        }
    },[]);
    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/user/roles-permission');
        }
        if(userErrors && userErrors.length > 0){
            userErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_USER_ERRORS});
        }
    },[userErrors,redirect]);
    if (unauthorized) {
        return <Forbidden/>
    }
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Add Role Permission - Ecom</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add New Role</h4>
                    <h3><NavLink exact to="/admin/user/roles-permission" className="btn btn-sm btn-success float-right text-bold">All Role</NavLink></h3>
                </div>
                <form role="form" onSubmit={handleSubmit}>
                    <div class="card-body">
                        <div class="form-group row">
                            <div className="col-sm-12">
                                <label for="exampleInputName" className="col-form-label">Role Name</label>
                                
                                <input type="text" name="name" class="form-control" id="exampleInputName" value={role} onChange={(e)=>setRole(e.target.value)} placeholder="Enter Role Name"/>
                            </div> 
                        </div>
                        <h4>Permission by Role</h4>
                        <div className="form-check">
                            <input type="checkbox" id="checkAll" className="form-check-input checkAll" onClick={handleAll}/>
                            <label className="form-check-label">All</label>
                        </div>
                        {permissions.map((permission)=>(<>
                           <div className="form-check">
                                <input type="checkbox" className="form-check-input" id={permission._id.group} value={permission._id.group} onClick={handleGroup}/>
                                <label className="form-check-label">{ permission._id.group }</label>
                            </div> 
                             {permission.names.map((name)=>(
                                <div className="form-check">
                                   &nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" onClick={handleCheck} value={name._id} data-group={permission._id.group} className={`form-check-input permission ${permission._id.group}`}/>
                                    <label className="form-check-label">{name.name}</label>
                                </div>
                             ))}
                        </>))}
                        
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default AddRole;