import { useContext } from "react";
import { SearchParamsCtx } from "../../../../Main.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './css/Search.css';

function Search() {
    const [searchParams, setSearchParams] = useContext(SearchParamsCtx);

    function handleInput(e) {
        e.preventDefault();
        const search = e.target.value;
        setSearchParams(searchParams => {
            searchParams.set('search', search);
            return searchParams;
        });
    }

    return (
                <div className='Search'>
                    <input type="search"
                           name="search"
                           id="search"
                           placeholder='Search for a country...'
                           value={searchParams.get('search') ?? ''}
                           onInput={handleInput} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
                </div>
            );
}

export default Search;