export function useContext(appContext) {
    console.log("appConext", appContext);
    return appContext._currentValue
}

