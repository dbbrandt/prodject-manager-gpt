import React, { createContext, useState } from 'react';
import {basePrompt} from "./initialPrompt";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [prompt, setPrompt] = useState(basePrompt);
    const [answer, setAnswer] = useState("> Hit submit to start the requirements Q&A session. <\n");
    const [question, setQuestion] = useState("");
    const [history, setHistory] = useState("");
    return (
        <AppContext.Provider value={{ prompt, setPrompt, answer, setAnswer, question, setQuestion, history, setHistory }}>
            {children}
        </AppContext.Provider>
    );
};
const AppContextConsumer = AppContext.Consumer;
export { AppContext, AppContextProvider, AppContextConsumer };

export default AppContext;