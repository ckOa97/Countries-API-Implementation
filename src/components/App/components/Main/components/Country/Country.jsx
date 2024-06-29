import { useState, useEffect } from 'react';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './css/Country.css';

function Country({data}) {
    const {countryName} = useParams();
    const [country, setCountry] = useState(null);
    const navigate = useNavigate();

    function findCountry() {
        try {
            if(data) return data.find(country => country.name.toLowerCase() === decodeURIComponent(countryName).toLowerCase());
        } catch(e) {
            return null;
        }
        return null;
    }

    function handleClick() {
        history.back();
    }

    useEffect(() => {
        (() => {
            if(!data) return;
            const country = findCountry();
            if(!country) {
                navigate('/not found', {replace: true});
                return;
            }
            setCountry(country);
        })();
    }, [data]);

    if(data) return country && (
                        <div className='Country'>
                            <div>
                                <button onClick={handleClick}><FontAwesomeIcon className='test123' icon={faArrowLeft} /><span>Back</span></button>
                            </div>
                            <div>
                                <div>
                                    <img src={country.flag} alt={`${country.name} flag`} />
                                </div>
                                <div>                                    
                                    <h2>{country.name}</h2>
                                    <div>
                                        <ul>
                                            <li><span>Native Name:</span> <span>{country.nativeName}</span></li>
                                            <li><span>Population:</span> <span>{country.population.toLocaleString()}</span></li>
                                            <li><span>Region:</span> <span>{country.region}</span></li>
                                            <li><span>Sub Region:</span> <span>{country.subregion}</span></li>
                                            <li><span>Capital:</span> <span>{country.capital}</span></li>
                                        </ul>
                                        <ul>
                                            <li><span>Top Level Domain:</span> <span>{country.topLevelDomain}</span></li>
                                            <li>
                                                <span>Currencies: </span>
                                                <span>
                                                    {(country.currencies) ? country.currencies.map((currency, i , arr) => {
                                                        return `${currency.name}${(i < arr.length - 1) ? ', ': ''}`;
                                                    }) : null}
                                                </span>
                                            </li>
                                            <li>
                                                <span>Languages: </span> 
                                                <span>
                                                    {(country.languages) ? country.languages.map((language, i , arr) => {
                                                        return `${language.name}${(i < arr.length - 1) ? ', ': ''}`;
                                                    }) : null}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <span>
                                        <span>Border Countries: </span> 
                                        <span>
                                            {(country.borders) ? country.borders.map((alpha3Code, i , arr) => {
                                                const country = data.find(country => country.alpha3Code === alpha3Code);
                                                if(country) return <span key={i}> {country.name}</span>;
                                                return null;
                                            }) : null}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
}

export default Country;