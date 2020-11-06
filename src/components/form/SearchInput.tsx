import React from 'react'
import {FormControl, Input, InputAdornment} from "@material-ui/core";
import Search from '@material-ui/icons/Search';

type Props = {
    value?: string,
    handleChange: (s: string) => void
}

const SearchInput = (props: Props) => {
    return <FormControl>
        <Input
            type={'text'}
            onChange={e => props.handleChange(e.target.value)}
            value={props.value}
            endAdornment={
                <InputAdornment position={"end"}>
                    <Search />
                </InputAdornment>
            }
        />
    </FormControl>
}

export default SearchInput