import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./Components/General/Header/Header";
import {Wings} from "./Page/Components/Wings/Wings";
import StartPage from "./Page/StartPage";
import {PhoneSupport} from "./Page/Components/PhoneSupport/PhoneSupport";
import {SupportPage} from "./Page/Support/SupportPage";
import QuickPage from "./Page/Quick/QuickPage";

const HomeRoute = () => {
    return (
        <>
            <StartPage />
            <Header />
            <Wings />
            <PhoneSupport />
        </>
    );
};

const SupportRoute = () => {
    return (
        <>
            <SupportPage />
            <Header />
        </>
    );
};

const QuickRoute = () => {
    return (
        <>
            <QuickPage />
            <Header />
        </>
    );
};

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<HomeRoute />} />
            <Route path={"/support"} element={<SupportRoute />} />
            <Route path={"/quick"} element={<QuickRoute />} />
            <Route path={"*"} element={<Navigate to={"/"} replace />} />
        </Routes>
    );
}

export default App;
