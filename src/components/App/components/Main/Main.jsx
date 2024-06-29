import { useState, useEffect, createContext, useContext } from "react";
import { ThemeCtx } from "../../App.jsx";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Filter from "./components/Filter/Filter.jsx";
import CountriesContainer from "./components/CountriesContainer/CountriesContainer.jsx";
import Country from "./components/Country/Country.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import './css/Main.css';

const URL = '/data.json';
const SearchParamsCtx = createContext();
const DataCtx = createContext();

function Main() {
    const [theme, setTheme] = useContext(ThemeCtx);
    const [data, setData] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
           const response = await fetch(URL);
           if(!response.ok) throw new Error(`${response.status} ${response.statusText}`);
           const data = await response.json();
           setData(data);
        })();
    }, []);

    //${(location.pathname === '/Countries-API-Implementation/country') ? 'country' : 'home'}

    return (
                <main className={`Main ${theme}`}>
                    <SearchParamsCtx.Provider value={[searchParams, setSearchParams]}>
                        <DataCtx.Provider value={[data, setData]}>
                                <Routes>
                                    <Route path="/" element={
                                        (<>
                                            <Filter />
                                            <CountriesContainer />
                                        </>)
                                    } />
                                    <Route path="/countries">
                                        <Route path=":countryName" element={<Country data={data} />} />
                                    </Route>
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                        </DataCtx.Provider>
                    </SearchParamsCtx.Provider>
                </main>
            );
}

export { SearchParamsCtx, DataCtx };
export default Main;