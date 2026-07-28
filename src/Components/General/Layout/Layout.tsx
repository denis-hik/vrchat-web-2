import React from "react";
import {Header} from "../Header/Header";
import {Wings} from "../../../Page/Components/Wings/Wings";
import {PhoneSupport} from "../../../Page/Components/PhoneSupport/PhoneSupport";

type TLayoutProps = {
    children?: React.ReactNode;
    component?: React.FunctionComponent;
    wings?: boolean
    phoneSupport?: boolean
}

export const Layout: React.FC<TLayoutProps> = ({children, phoneSupport, wings, component}) => {

    return (

        <>
            {children}
            {component ? component({}) : null}
            <Header />
            {wings && <Wings/>}
            {phoneSupport && <PhoneSupport/>}
        </>
    )
}