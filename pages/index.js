import Head from "next/head";
import {useState} from "react";
import styles from "./index.module.css";
import {AppContextProvider} from "./appContext";
import MainScreen from "./MainScreen";

export default function Home() {

    return (
        <AppContextProvider>
            <MainScreen/>
        </AppContextProvider>
    );
}
