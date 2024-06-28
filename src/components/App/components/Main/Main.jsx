import { useState, useEffect, createContext, useContext } from "react";
import { ThemeCtx } from "../../App.jsx";
import { Routes, Route, Router, useSearchParams } from "react-router-dom";
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

    return (
                <main className={`Main ${theme} ${(location.pathname === '/country') ? 'country' : 'home'}`}>
                    <SearchParamsCtx.Provider value={[searchParams, setSearchParams]}>
                        <DataCtx.Provider value={[data, setData]}>
                            <Router basename="/Countries-API-Implementation">
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
                            </Router>
                        </DataCtx.Provider>
                    </SearchParamsCtx.Provider>
                </main>
            );
}

export { SearchParamsCtx, DataCtx };
export default Main;