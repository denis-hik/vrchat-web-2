import React from 'react';
import {Header} from "./Components/General/Header/Header";
import {Wings} from "./Page/Components/Wings/Wings";
import StartPage from "./Page/StartPage";

function App() {

    return (
        <>
            <StartPage />
            <Header/>
            <Wings />
        </>
    );
}

export default App;