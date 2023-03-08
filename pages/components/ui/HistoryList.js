import React, {useContext} from 'react';
import AppContext from "../../../utils/appContext";
import styles from "../../index.module.css";

function HistoryList() {
    const {history} = useContext(AppContext) || {};
    if (history?.length === 0) return;
    return (
        <ul>
            {history?.map((e) => <li>
                <div className={styles.historyQuestion}>{e.question}</div>
                <div className={styles.historyAnswer}>{e.answer}</div></li>)}
        </ul>
    )
}

export default HistoryList;