import React, {useContext} from 'react';
import AppContext from "../utils/appContext";

function HistoryList() {
    const {history} = useContext(AppContext);
    if (history.length === 0) return;
    return (
        <ul>
            {history.map((e) => <li>{e.question} Answer: {e.answer}</li>)}
        </ul>
    )
}

export default HistoryList;