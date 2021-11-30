import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
    let { pathname } = useLocation();
    const {user} = useSelector((state)=>state.AuthReducer);
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <NavLink to="/admin/dashboard" className="brand-link">
                    <img src="/assets/images/admin_images/AdminLTELogo.png"
                        alt="AdminLTE Logo"
                        className="brand-image img-circle elevation-3"
                        style={{opacity: .8 }} />
                    <span className="brand-text font-weight-light">Admin Panel</span>
                </NavLink>

                {/* <!-- Sidebar --> */}
                <div className="sidebar">
                {/* <!-- Sidebar user (optional) --> */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                    <img src={`${process.env.REACT_APP_API_PATH}/images/user_images/${user.image}`} className="img-circle elevation-2" alt="User Image"/>
                    </div>
                    <div class="info">
                    <a href="#" className="d-block">{user.name}</a>
                    </div>
                </div>

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* <!-- Add icons to the links using the .nav-icon class */}
                        {/* with font-awesome or any other icon font library --> */}
                    <li className="nav-item has-treeview">
                        <NavLink exact to="/admin/dashboard" activeClassName="active" className="nav-link">
                        <i className="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                            Dashboard
                        </p>
                        </NavLink>
                    </li>
                    <li className="nav-item has-treeview menu-open">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-copy"></i>
                        <p>
                            Users
                            <i className="fas fa-angle-left right"></i>
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <NavLink exact to="/admin/user/all?page=1" activeClassName="active" className={pathname==='/admin/user/create'?'active nav-link':'nav-link'}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>All User</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to={`/admin/user/update-profile/${user._id}`} activeClassName="active" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Update Profile</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to={`/admin/user/update-password/${user._id}`} activeClassName="active" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Update Password</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to={`/admin/user/roles-permission`} activeClassName="active" className={ pathname==='/admin/user/add-role-permission' || pathname.includes('/admin/user/edit-role-permission/') ?'nav-link active':'nav-link'}>
                                <i className="far fa-circle nav-icon"></i>
                                <p>Roles Permission</p>
                                </NavLink>
                            </li>                          
                        </ul>
                    </li>
                    <li className="nav-item has-treeview menu-open">
                        <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-copy"></i>
                        <p>
                            Catelogues
                            <i className="fas fa-angle-left right"></i>
                        </p>
                        </a>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <NavLink exact to="/admin/banner/all?page=1" activeClassName="active" className={ pathname==='/admin/banner/create' || pathname.includes('/admin/banner/edit/') ?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Banner</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/category/all?page=1" activeClassName="active" className={ pathname==='/admin/category/create' || pathname.includes('/admin/category/edit/') ?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Category</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/product/all?page=1" activeClassName="active" className={ pathname==='/admin/product/create' || pathname.includes('/admin/product/edit/') || pathname.includes('/admin/product/images/') || pathname.includes('/admin/product/attribute/')?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Products</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/order/all?page=1" activeClassName="active" className={ pathname.includes('/admin/order/details/')?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Orders</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/post/all?page=1" activeClassName="active" className={ pathname==='/admin/post/create' || pathname.includes('/admin/post/edit/') ?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Posts</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/admin/coupon/all?page=1" activeClassName="active" className={ pathname==='/admin/coupon/create' || pathname.includes('/admin/coupon/edit/') ?'nav-link active':'nav-link'}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>Coupons</p>
                            </NavLink>
                        </li>                             
                        </ul>
                    </li>
                    </ul>
                </nav>
                {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
        </>
    );
}

export default Sidebar;