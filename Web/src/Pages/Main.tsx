import {PrimaryButton, Image} from "@fluentui/react";
import React from "react";
// @ts-ignore
import logo from "../logo.svg"
import api from "../Service/PunchoutApi";
const MainPage: React.FC = (props) => {

    const punchout = () => { api.punchoutSetup.create().then((a) => window.open(a.url))};
    return (
        <header className="App-header">
            <h1>Punchout</h1>
            <Image src={logo} className="App-logo" alt="logo" onClick={punchout} width={400}/>
            <div className={"fieldContainer"}>
            </div>
        </header>
    )
}
export default MainPage;