import React from 'react';
import CountryRegionsSelect from "../countryRegions/CountryRegionsSelect";
import BreaksList from "../breaks/BreaksList";


type Props = {

}

const Home = () => {
    return (
        <div>
            <p>home</p>
            <CountryRegionsSelect />
            <BreaksList/>
        </div>
    )
}



export default Home;