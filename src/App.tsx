import React from 'react';
import {Header} from "./Components/General/Header/Header";
import {Wings} from "./Page/Components/Wings/Wings";
import StartPage from "./Page/StartPage";
import {PhoneSupport} from "./Page/Components/PhoneSupport/PhoneSupport";

function App() {

    return (
        <>
            <StartPage />
            <Header/>
            <Wings />
            <PhoneSupport />
        </>
    );
}

export default App;