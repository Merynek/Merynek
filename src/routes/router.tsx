import React, {ReactNode, useEffect} from 'react';
import {Route, useParams, Routes, useLocation} from 'react-router-dom';
import Home from '../components/Home/Home';
import Serials from '../components/Serials/Serials';
import Serial from '../components/Serials/Serial/Serial';
import bbtJson from '../components/Serials/source/bbt.json';
import marvelJson from '../components/Serials/source/marvel.json';
import himymJson from '../components/Serials/source/himym.json';
import xmenJson from '../components/Serials/source/xmen.json';
import dcJson from '../components/Serials/source/dc.json';
import { Series } from '../components/Serials/source/serialJson';
import Prcinka from "../components/Prcinka/Prcinka";
// @ts-ignore
import hearFavicon from "../routes/heart.ico";

const AppRouter = () => {
    const {pathname} = useLocation();
    useEffect(() => {
        if (isPrcinka()) {
            document.body.style.background = "#e37d89";
            document.title = "Prcinka"
            const favIcon = document.getElementById("favicon");
            if (favIcon) {
                // @ts-ignore
                favicon.href = hearFavicon;
            }
        }
    });

    function isPrcinka(): boolean {
        return pathname === "/prcinka";
    }

    function headerTitle(): string {
        if (isPrcinka()) {
            return "PRCINKA ♥";
        }
        return "MERYNEK"
    }

    function headerStyle() {
        return `header ${isPrcinka() && "prcinka"}`;
    }


    return (
        <div className="App">
            <div className={headerStyle()}>{headerTitle()}</div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/serials" element={<Serials />} />
                <Route path="/prcinka" element={<Prcinka />} />
                <Route path="/serials/bbt" element={BbtSwitch()} />
                <Route path="/serials/himym" element={HimymSwitch()} />
                <Route path="/serials/marvel" element={MarvelSwitch()} />
                <Route path="/serials/x-men" element={XmenSwitch()} />
                <Route path="/serials/dc" element={DcSwitch()} />
            </Routes>
        </div>
    )

    function BbtSwitch() {
        return (
          <Routes>
            <Route path='/serials/bbt/:number' element={BbtComponent()}/>
          </Routes>
        );
    }

    function HimymSwitch() {
        return (
          <Routes>
            <Route path='/serials/himym/:number' element={HimymComponent()}/>
          </Routes>
        );
    }

    function MarvelSwitch() {
        return (
          <Routes>
            <Route path='/serials/marvel/:number' element={MarvelComponent()}/>
          </Routes>
        );
    }

    function XmenSwitch() {
        return (
          <Routes>
            <Route path='/serials/x-men/:number' element={XmenComponent()}/>
          </Routes>
        );
    }

    function DcSwitch() {
        return (
          <Routes>
            <Route path='/serials/dc/:number' element={DcComponent()}/>
          </Routes>
        );
    }
}

export default AppRouter;

function BbtComponent(): ReactNode {
    const { number } = useParams();
    const json: Series[] = bbtJson;

    return (
        <Serial isSerial={true} key={number} number={number ? Number(number) : 1} series={json} name="Teorie velkého třesku" routeName="bbt"/>
    );
}

function HimymComponent(): ReactNode {
    const { number } = useParams();
    const json: Series[] = himymJson;

    return (
        <Serial isSerial={true} key={number} number={number ? Number(number) : 1} series={json} name="Jak jsem poznal vaši matku" routeName="himym"/>
    );
}

function MarvelComponent(): ReactNode {
    const { number } = useParams();
    const json: Series[] = marvelJson;

    return (
        <Serial isSerial={false} key={number} number={number ? Number(number) : 1} series={json} name="Marvel" routeName="marvel"/>
    );
}

function XmenComponent(): ReactNode {
    const { number } = useParams();
    const json: Series[] = xmenJson;

    return (
        <Serial isSerial={false} key={number} number={number ? Number(number) : 1} series={json} name="X-men" routeName="x-men"/>
    );
}

function DcComponent(): ReactNode {
    const { number } = useParams();
    const json: Series[] = dcJson;

    return (
        <Serial isSerial={false} key={number} number={number ? Number(number) : 1} series={json} name="DC Extended Universe" routeName="dc"/>
    );
}
