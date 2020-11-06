import React, {FormEvent, useState} from 'react'
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {SearchResults as SearchResultsType} from "../../redux/search/types";
import SearchResults from './SearchResults'
import {doSearch} from "../../redux/search/actions";

type StateProps = {
    results?: SearchResultsType,
    searching: boolean
}

type DispatchProps = {
    doSearch: (query: string) => void
}

type Props = StateProps  & DispatchProps

const mapState = (state: RootState) =>  {
    return {
        searching: state.search.searching,
        results: state.search.results
    }
}

const mapDispatch = {
    doSearch: (query: string) => doSearch(query)
}

const SearchAndResults = (props: Props) => {
    const [query, setQuery] = useState('');
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.doSearch(query)
    }
    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <p>Search</p>
                    <input value={query} onChange={e => setQuery(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                {props.results ? <SearchResults results={props.results} /> : null}
                {props.searching ? <p>searching...</p> : null}
            </div>
        </div>
    )
}


export default connect(mapState, mapDispatch)(SearchAndResults)