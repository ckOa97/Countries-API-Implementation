import { useContext } from "react";
import { ThemeCtx } from "../../App.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";
import './css/Header.css';

function Header() {
    const [theme, setTheme] = useContext(ThemeCtx);
    const nextTheme = (theme === 'light') ? 'dark' : 'light';
    function handleClick() {
        setTheme(theme => (theme === 'light') ? 'dark' : 'light');
    }

    return (
                <header className={`Header ${theme}`}>
                    <h1>Where in the world?</h1>
                    <button onClick={handleClick}><FontAwesomeIcon icon={(theme === 'light') ? faMoonRegular : faMoonSolid} className="faMoon" /> <span>{`${nextTheme.charAt(0).toUpperCase()}${nextTheme.slice(1)}`} Mode</span></button>
                </header>
            );
}

export default Header;