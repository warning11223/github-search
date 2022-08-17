import {useEffect, useState} from "react";

export const useDebounce = (value: string, delay = 500): string => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;

}