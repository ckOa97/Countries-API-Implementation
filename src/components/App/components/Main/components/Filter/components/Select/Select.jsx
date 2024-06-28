import { useState, useEffect, useContext } from "react";
import { SearchParamsCtx } from "../../../../Main.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import './css/Select.css';

function Select() {
    const [searchParams, setSearchParams] = useContext(SearchParamsCtx);
    const [dropDown, setDropDown] = useState(false);
    const [options, setOptions] = useState([
                                                {value: 'All', text: 'Filter by Region', selected: true, disabled: false},
                                                {value: 'Africa', text: 'Africa', selected: false, disabled: false},
                                                {value: 'Americas', text: 'Americas', selected: false, disabled: false},
                                                {value: 'Asia', text: 'Asia', selected: false, disabled: false},
                                                {value: 'Europe', text: 'Europe', selected: false, disabled: false},
                                                {value: 'Oceania', text: 'Oceania', selected: false, disabled: false}
                                            ]);

    useEffect(() => {
        (() => {
            setOptions(options => options.map(option => {
                option.selected = false;
                return option;
            }));
            const region = searchParams.get('region');
            const regionExist = options.some(option => option.value === region);
            if(!region) {
                setOptions(options => {
                    return options.map(option => {
                        if(option.value === 'All') option.selected = true;
                        return option;
                    });
                });
                return;
            }
            if(!regionExist) {
                setSearchParams(searchParams => {
                    searchParams.set('region', 'All');
                    return searchParams;
                });
                setOptions(options => {
                    return options.map(option => {
                        if(option.value === 'All') option.selected = true;
                        return option;
                    });
                });
                return;
            }

            setOptions(options => {
                return options.map(option => {
                    if(option.value === region) option.selected = true;
                    return option;
                });
            });
        })();
    }, [searchParams]);

    function changeOption(e, value) {
        setOptions(options => options.map(option => {
            option.selected = false;
            return option;
        }));
        setOptions(options => {
            return options.map(option => {
                if(option.value === value) option.selected = true;
                return option;
            });
        });
        setSearchParams(searchParams => {
            searchParams.set('region', value);
            return searchParams;
        });
    }
    function handleClick() {
        setDropDown(dropDown => !dropDown);
    }

    function handleKeyDown(e) {
        switch(e.key) {
            case 'Tab':
                if(dropDown) {
                    e.preventDefault();
                    setDropDown(dropDown => false);
                    setSearchParams(searchParams => {
                        const region = options.find(option => {
                            if(option.selected) return true;
                            return false;
                        }).value;
                        searchParams.set('region', region);
                        return searchParams;
                    });
                }
                break;
            case 'Enter':
                e.preventDefault();
                if(dropDown) {
                    setSearchParams(searchParams => {
                        const region = options.find(option => {
                            if(option.selected) return true;
                            return false;
                        }).value;
                        searchParams.set('region', region);
                        return searchParams;
                    });
                }
                setDropDown(dropDown => !dropDown);
                break;
            case ' ':
                e.preventDefault();
                if(dropDown) {
                    setSearchParams(searchParams => {
                        const region = options.find(option => {
                            if(option.selected) return true;
                            return false;
                        }).value;
                        searchParams.set('region', region);
                        return searchParams;
                    });
                }
                setDropDown(dropDown => !dropDown);
                break;
            case 'ArrowUp':
                e.preventDefault();
                (() => {
                    const optionsCopy = [...options];
                    let i = optionsCopy.findIndex(option => {
                        if(option.selected) return true;
                        return false;
                    });
                    if(i > 0) {
                        setOptions(options => {
                            optionsCopy[i].selected = false;
                            optionsCopy[i - 1].selected = true;
                            return optionsCopy;
                        });
                        if(!dropDown) {
                            setSearchParams(searchParams => {
                                searchParams.set('region', optionsCopy[i - 1].value);
                                return searchParams;
                            });
                        }
                    }
                })();
                break;
            case 'ArrowDown':
                e.preventDefault();
                (() => {
                    const optionsCopy = [...options];
                    let i = optionsCopy.findIndex(option => {
                        if(option.selected) return true;
                        return false;
                    });
                    if(i < options.length - 1) {
                        setOptions(options => {
                            optionsCopy[i].selected = false;
                            optionsCopy[i + 1].selected = true;
                            return optionsCopy;
                        });
                        if(!dropDown) {
                            setSearchParams(searchParams => {
                                searchParams.set('region', optionsCopy[i + 1].value);
                                return searchParams;
                            });
                        }
                    };
                })();
                break;
        }
    }

    function handleBlur() {
        if(dropDown) {
            setDropDown(dropDown => false);
            setSearchParams(searchParams => {
                const region = options.find(option => {
                    if(option.selected) return true;
                    return false;
                }).value;
                searchParams.set('region', region);
                return searchParams;
            });
        }
    }

    return (
                <div className='Select' tabIndex="0" onClick={handleClick} onKeyDown={handleKeyDown} onBlur={handleBlur}>
                    <span>{options.find(option => option.selected).text}</span>
                    <div className={dropDown ? 'dropDownOn' : 'dropDownOff'}>
                    {options.map((option, i) => (<div key={i}
                                                      onClick={e => changeOption(e, option.value)}
                                                      className={`${option.selected ? 'selected':''}
                                                      ${option.disabled ? 'display-none':''}`}><span>{option.value}</span></div>))}
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} className="arrow-down-icon" />
                </div>
            );
}

export default Select;