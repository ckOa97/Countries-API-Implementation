import { Link } from 'react-router-dom';
import './css/CountryCard.css';

function CountryCard({data}) {
    return (
                <Link to={`/countries/${encodeURIComponent(data.name)}`} className='CountryCard'>
                    <div>
                        <img loading='lazy' src={data.flag} alt={`${data.name} flag`} />
                        <div className='description'>
                            <h2>{data.name}</h2>
                            <ul>
                                <li>
                                    <span className='key'>Population: </span>
                                    <span className='value'>{data.population.toLocaleString()}</span>
                                </li>
                                <li>
                                    <span className='key'>Region: </span>
                                    <span className='value'>{data.region}</span>
                                </li>
                                <li>
                                    <span className='key'>Capital: </span>
                                    <span className='value'>{data.capital}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Link>
            );
}

export default CountryCard;