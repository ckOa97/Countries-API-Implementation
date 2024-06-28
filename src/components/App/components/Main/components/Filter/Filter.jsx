import Search from './components/Search/Search.jsx';
import Select from './components/Select/Select.jsx';
import './css/Filter.css';

function Filter() {
    return (
                <div className='Filter'>
                    <Search />
                    <Select />
                </div>
            );
}

export default Filter;