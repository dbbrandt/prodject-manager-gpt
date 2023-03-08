import {AppContextProvider} from "../utils/appContext";
import MainScreen from "./components/ui/MainScreen";

export default function Home() {
    return (
        <AppContextProvider>
            <MainScreen/>
        </AppContextProvider>
    );
}
