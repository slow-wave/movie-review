import React, { useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")
        
    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    const onSearch = (event) => {
        const searchterm = event.currentTarget.value
        // console.log('검색어',searchterm);
    }

    return (
        <div>
            <Search
                onChange={onChangeSearch}
                placeholder="Search By Typing"
                onClick={onSearch}
            />
        </div>
    )
}

export default SearchFeature