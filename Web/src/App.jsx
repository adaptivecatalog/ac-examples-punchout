import React from "react"
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Main from "./Pages/Main"
import ResultPage from "./Pages/Results";

function App() {
    const queryParameters = new URLSearchParams(window.location.search)
    const workspaceId = queryParameters.get("workspaceId")
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route
                    path=''
                    element={<Main/>}
                />
                <Route
                    path="/order"
                    element={<ResultPage workspaceId={workspaceId}/>}
                />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
