import React from 'react'
// import { useContext } from 'react'
import { useContext } from '../2_sources/5_useContext'

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

const ThemeContext = React.createContext(themes.light);

export default function App() {
    return <>
        随便你嵌套多少层，里面都能取得到。难道useSelect就是useContext？
        <ThemeContext.Provider value={themes.dark}>
            <Toolbar />
        </ThemeContext.Provider>
    </>;
}

function Toolbar() {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton() {
    const theme = useContext(ThemeContext) || {};
    console.log("theme", theme);
    return <>
        color: {JSON.stringify(theme)}
        <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
        </button>
    </>;
}
