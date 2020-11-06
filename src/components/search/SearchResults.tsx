import React from 'react'
import {SearchResults as SearchResultsType} from "../../redux/search/types";
import {Search} from "history";

type Props = {
    results: SearchResultsType
}

const SearchResults = (props: Props) => {
    return (
        <div>
            <p>Found {props.results.breaks.length} for query: {props.results.query}</p>
            <ul>
                {props.results.breaks.map((b,i) => {
                    return (
                        <li>{b.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SearchResults