import { Link } from "react-router-dom";

const Pagination = ({page,perPage,count,pageLink,search}) => {
    let totalPages = Math.ceil(count / perPage);
    let startloop;
    let endloop;
    if (totalPages <= 3) {
        startloop = 1;
        endloop = totalPages;
    }
    else if(parseInt(page) === 1){
        startloop = 1;
        endloop = parseInt(page) + 2;
    }
    else if(parseInt(page) === totalPages){
        startloop = parseInt(page) - 2;
        endloop = totalPages;
    }
    else if(totalPages > 3){
        startloop = parseInt(page) - 1;
        endloop = parseInt(page) + 1;
    }
    const links = () =>{
        const store = [];
        for (let i = startloop; i <= endloop; i++) {
            store.push(<li key={i} className={`${i==page?"page-item active":"page-item"}`}>{search === null ? <Link  className="page-link"  to={`${pageLink}?page=${i}`}>{i}</Link> : <Link  className="page-link"  to={`${pageLink}?search=${search}&page=${i}`}>{i}</Link>}</li>);
        }
        return store;
    }
    const next = () =>{
        if(parseInt(page) < totalPages){
            return (
               <li className="page-item">
                   {search === null ?<Link to={`${pageLink}?page=${parseInt(page) + 1 }`} className="page-link"  ><i className="ri-arrow-right-s-line"></i></Link>:<Link to={`${pageLink}?search=${search}&page=${parseInt(page) + 1 }`} className="page-link"  ><i className="ri-arrow-right-s-line"></i></Link>}
               </li>
            );
        }
    }
    const prev = () =>{
        if(parseInt(page) > 1){
            return (
               <li className="page-item">
                   {search === null ?<Link  to={`${pageLink}?page=${parseInt(page) - 1 }`} className="page-link" ><i className="ri-arrow-left-s-line"></i></Link>:<Link  to={`${pageLink}?search=${search}&page=${parseInt(page) - 1 }`} className="page-link" ><i className="ri-arrow-left-s-line"></i></Link>}
               </li>
            );
        }
    }
    console.log('sea',search);
    return (
        <nav className="text-end">
            <ul className="pagination">
                {prev()} {links()} {next()}
            </ul>
        </nav>
    );
}

export default Pagination;