import { useContext, useState, useEffect } from 'react';
import { SearchParamsCtx, DataCtx } from '../../Main.jsx';
import CountryCard from './components/CountryCard.jsx';
import './css/CountriesContainer.css';

function CountriesContainer() {
    const [searchParams, setSearchParams] = useContext(SearchParamsCtx);
    const [data, setData] = useContext(DataCtx);
    const [page, setPage] = useState(1);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
    
    function removeDiacritics(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
    function filterData() {
        let filteredData = [...data];
        const region = searchParams.get('region');
        const search = searchParams.get('search');
        if(region !== 'All' && region) filteredData = filteredData.filter(country => country.region === region);
        if(search?.trim() !== '' && search) 
            filteredData = filteredData.filter(country => removeDiacritics(country.name)
                                                            .trim()
                                                            .toLowerCase()
                                                            .slice(0, search.length)
                                                            .includes(removeDiacritics(search)
                                                            .trim()
                                                            .toLowerCase()));
                                                            
        if(filteredData.length <= page * 16) {
            if(showLoadMoreButton) setShowLoadMoreButton(false);
        } else {
            if(!showLoadMoreButton) setShowLoadMoreButton(true);
        }

        return filteredData.slice(0, page * 16);
    }

    function loadMore() {
        setPage(page => page + 1);
    }

    useEffect(() => {
        setPage(1);
    }, [searchParams]);

    if(data) return (
                        <div className='CountriesContainer'>
                            <div>
                                {filterData().map(country => <CountryCard data={country} key={country.name} />)}
                            </div>
                            {showLoadMoreButton && <button onClick={loadMore}>See More</button>}
                        </div>
                    );
}

export default CountriesContainer;