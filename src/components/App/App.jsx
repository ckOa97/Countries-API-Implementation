import { useState, createContext } from 'react';
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import './css/App.css';

const ThemeCtx = createContext();

function App() {
    const [theme, setTheme] = useState('dark');

    return (<ThemeCtx.Provider value={[theme, setTheme]}>
                <Header />
                <Main />
            </ThemeCtx.Provider>);
}

export { ThemeCtx };
export default App;