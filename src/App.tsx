import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import StartPage from "./Page/StartPage";
import {SupportPage} from "./Page/Support/SupportPage";
import QuickPage from "./Page/Quick/QuickPage";
import {Layout} from "./Components/General/Layout/Layout";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout wings phoneSupport component={StartPage} />} />
            <Route path={"/support"} element={<Layout component={SupportPage} />} />
            <Route path={"/quick"} element={<Layout component={QuickPage} />} />
            <Route path={"*"} element={<Navigate to={"/"} replace />} />
        </Routes>
    );
}

export default App;
