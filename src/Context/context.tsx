import React, {createContext, useEffect} from 'react';
import {useAppDispatch} from "../hooks/store/store";
import {preloadImages} from "./actions/images";

import staff from "../media/staff/staff.gif";
import staffReverse from "../media/staff/staff-reverse.gif";
import {getWorlds} from "./actions/worlds";

export const pageContext = createContext<{}>({});

const PageContextProvider:React.FC<{children:any}> = ({children}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getWorlds())
    },[])

    return (
        <pageContext.Provider value={{}}>
            {children}
        </pageContext.Provider>
    );
};
export default PageContextProvider


