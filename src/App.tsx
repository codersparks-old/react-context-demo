import * as React from "react";

export function createCtx<ContextType>() {
    const ctx = React.createContext<ContextType | undefined>(undefined);
    function useCtx() {
        const c = React.useContext(ctx);
        if (!c) throw new Error("useCtx must be inside a Provider with a value");
        return c;
    }
    return [useCtx, ctx.Provider] as const;
}

type ThemeContextType = {
    theme: string;
    setTheme: (value: string) => void;
};
const [useTheme, CtxProvider] = createCtx<ThemeContextType>();

type Props = {
    children: React.ReactNode;
};
export const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = React.useState("white");

    React.useEffect(() => {
        // We'd get the theme from a web API / local storage in a real app
        // We've hardcoded the theme in our example
        const currentTheme = "lightblue";
        setTheme(currentTheme);
    }, []);

    return <CtxProvider value={{ theme, setTheme }}>{children}</CtxProvider>;
};

const Header = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div style={{ backgroundColor: theme }}>
            <select value={theme} onChange={e => setTheme(e.currentTarget.value)}>
                <option value="white">White</option>
                <option value="lightblue">Blue</option>
                <option value="lightgreen">Green</option>
            </select>
            <span>Hello!</span>
        </div>
    );
};

const App = () => (
    <ThemeProvider>
        <Header />
    </ThemeProvider>
);

export default App;


