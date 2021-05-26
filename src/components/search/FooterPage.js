import React from 'react';
import {Row, Badge} from 'react-bootstrap'
import {useMovies} from "./MovieProvider";
import {FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa'
import {v4} from "uuid";

export default function FooterPage() {
    const {nextPage, previousPage, goToFirstPage, goToLastPage, page,maxPage, goToPage} = useMovies();

    const getPagePills = (addSize = 5) => {
        let rightSize = addSize;
        let leftSize = addSize;
        let result = []
        for (let i = 0; i < leftSize; i++) {
            const newPage = page - i;
            if (newPage >= 1) result.unshift(newPage);
            else rightSize += 1;
        }
        for (let i = 1; i < rightSize; i++) {
            const newPage = page + i;
            if (newPage <= maxPage) result.push(newPage)
            else {
                if ((result[0] - 1) >= 1)
                    result.unshift(result[0] - 1)
            }
        }
        return result
    }


    return (
        <Row>
            <div className={"col-1 arrow"}>
                <FaAngleDoubleLeft onClick={goToFirstPage} size={"2em"}/>
            </div>
            <div className={"col-1 arrow"}>
                <FaAngleLeft onClick={previousPage} size={"2em"}/>
            </div>
            <div className={"col-8 d-flex justify-content-center"}>
                <h4>
                    {
                        getPagePills().map(pageNumber => {
                                if (pageNumber === page) return (
                                    <Badge key={v4()} className={"arrow pills"} onClick={() => goToPage(pageNumber)} pill variant="primary">{pageNumber}</Badge>)
                                else return (<Badge key={v4()} className={"arrow pills"} onClick={() => goToPage(pageNumber)} pill variant="secondary">{pageNumber}</Badge>)
                            }
                        )
                    }
                </h4>
            </div>
            <div className={"col-1 arrow"}>
                <FaAngleRight onClick={nextPage} size={"2em"}/>
            </div>
            <div className={"col-1 arrow"}>
                <FaAngleDoubleRight onClick={goToLastPage} size={"2em"}/>
            </div>
        </Row>
    );
}