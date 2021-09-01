import { Link } from "react-router-dom";
import './Pagination.css';

const Pagination = ({page,perPage,count,pageLink}) => {

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
            store.push(<li key={i}><Link  className={`${i==page?"active":""}`} to={`${pageLink}?page=${i}`}>{i}</Link></li>);
        }
        return store;
    }
    const next = () =>{
        if(parseInt(page) < totalPages){
            return (
               <li>
                   <Link to={`${pageLink}?page=${parseInt(page) + 1 }`} ><i class="fas fa-long-arrow-alt-right"></i></Link>
               </li>
            );
        }
    }
    const prev = () =>{
        if(parseInt(page) > 1){
            return (
               <li>
                   <Link  to={`${pageLink}?page=${parseInt(page) - 1 }`} ><i class="fas fa-long-arrow-alt-left"></i></Link>
               </li>
            );
        }
    }
    return totalPages && count > perPage? (
        <div className="pagination ml-2">
           {prev()} {links()} {next()}
        </div>
    ):''
}

export default Pagination;