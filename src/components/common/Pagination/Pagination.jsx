import React, {useState} from "react";
import s from "./Pagination.module.css";

const Pagination = ({totalItemsCount, itemsPerPage, currentPage, onPageChanged, partsPerPage = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / itemsPerPage);
    let pages = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let partCount = Math.ceil(pagesCount / partsPerPage); // 43 / 10 = 4,3 (5 partsCount)
    let [partNumber, setPartNumber] = useState(1); // 1
    let leftPartPageNumber = (partNumber - 1) * partsPerPage + 1; // 1
    let rightPartPageNumber = partNumber * partsPerPage; // 1 * 10 = 10

    return (
        <>
            <nav className={s.pagination}>
                <ul className={s.paginationList}>
                    {
                        partNumber > 1 &&
                        <li>
                            <button
                                className={`${s.paginationBtn} ${s.route}`}
                                onClick={() => { setPartNumber(partNumber - 1); }}
                            >Prev</button>
                        </li>
                    }
                    {
                        pages
                            .filter(p => p >= leftPartPageNumber && p <= rightPartPageNumber) //create new array pages in part
                            .map(p => {
                                return <li>
                                    <button
                                        className={`
                                        ${s.paginationBtn} 
                                        ${currentPage === p ? s.selectedPage : ''}`}
                                        onClick={ () => { onPageChanged(p) } }
                                    >{p}</button>
                                </li>
                            })
                    }
                    {
                        partCount > partNumber &&
                        <li>
                            <button
                                className={`${s.paginationBtn} ${s.route}`}
                                onClick={() => {
                                    setPartNumber(partNumber + 1)
                                }}
                            >Next
                            </button>
                        </li>
                    }
                    {
                        partCount !== partNumber &&
                        <li>
                            <button
                            className={`${s.paginationBtn} ${s.route}`}
                            onClick={() => { setPartNumber(partCount) }}
                            >Last</button>
                        </li>
                    }
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
