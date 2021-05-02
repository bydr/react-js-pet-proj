import React from "react";
import s from "./Pagination.module.css";

const Pagination = ({totalItemsCount, perPage, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalItemsCount / perPage);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <>
            <nav className={s.pagination}>
                <ul className={s.paginationList}>
                    {pages.map(p => {
                        return <li>
                            <button
                                className={`
                                ${s.paginationBtn} 
                                ${currentPage === p ? s.selectedPage : ''}`}
                                onClick={ () => { onPageChanged(p) } }
                            >{p}</button>
                        </li>
                    })}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
