import { useContext } from 'react';
import { SearchParamsCtx, DataCtx } from '../../Main.jsx';
import CountryCard from './components/CountryCard.jsx';
import './css/CountriesContainer.css';

function CountriesContainer() {
    const [searchParams, setSearchParams] = useContext(SearchParamsCtx);
    const [data, setData] = useContext(DataCtx);
    
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
        return filteredData;
    }

    if(data) return (
                        <div className='CountriesContainer'>
                            {filterData().map((country, i) => <CountryCard data={country} key={i} />)}
                        </div>
                    );
}

export default CountriesContainer;