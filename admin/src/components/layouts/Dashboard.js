import { Helmet } from "react-helmet";

const Dashboard = () => {
    return (
        <div class="content-wrapper">
            <Helmet>
                <title>User Dashboard - Ecommerce</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">Dashboard</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
                </div>
            </div>
            </div>
            {/* <!-- /.content-header --> */}

            {/* <!-- Main content --> */}
            <section class="content">
            <div class="container-fluid">
                {/* <!-- Small boxes (Stat box) --> */}
                <div class="row">
                <div class="col-lg-3 col-6">
                    {/* <!-- small box --> */}
                    <div class="small-box bg-info">
                    <div class="inner">
                        <h3>150</h3>

                        <p>New Orders</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                {/* <!-- ./col --> */}
                <div class="col-lg-3 col-6">
                    {/* <!-- small box --> */}
                    <div class="small-box bg-success">
                    <div class="inner">
                        <h3>53<sup style={{fontSize: 20+"px"}}>%</sup></h3>

                        <p>Bounce Rate</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-stats-bars"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                {/* <!-- ./col --> */}
                <div class="col-lg-3 col-6">
                    {/* <!-- small box --> */}
                    <div class="small-box bg-warning">
                    <div class="inner">
                        <h3>44</h3>

                        <p>User Registrations</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                {/* <!-- ./col --> */}
                <div class="col-lg-3 col-6">
                    {/* <!-- small box --> */}
                    <div class="small-box bg-danger">
                    <div class="inner">
                        <h3>65</h3>

                        <p>Unique Visitors</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                </div>
            </div>
            </section>
            {/* <!-- /.content --> */}
        </div>
    );
}

export default Dashboard;