import React, {useContext} from 'react';
import Head from "next/head";
import styles from "../../index.module.css";
import AppContext from "../../../utils/appContext";
import HistoryList from "./HistoryList";

function MainScreen({children}) {
    const {prompt, setPrompt, answer, setAnswer, question,
        setQuestion, history, setHistory} = useContext(AppContext) || {};
    let newPrompt = prompt;
    let generatedText = "";

    function addToHistory() {
        console.log(`addToHistory: is history an array? ${Array.isArray(history)}`);
        console.log(history);
        if (!Array.isArray(history)) return history;
        // const maxId = (history.length > 0) ?
        //     history.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id, 0) : 1;
        const maxId = history?.length + 1;

        const entry = {
            id: maxId,
            question: question,
            answer: answer,
        }

        const newHistory = [...history,entry];
        console.log(newHistory);
        setHistory(newHistory);
    }

    async function generate() {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({prompt: newPrompt, answer: answer}),
        });

        const data = await response.json();
        if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        return data;
    }

    async function onSubmit(event) {
        event.preventDefault();
        if (answer[0] !== '>') {
            newPrompt = `${prompt}\n${answer}\n`;
            addToHistory();
            setAnswer(`${answer}....processing....`);
        }
        try {
            let data = await generate();
            console.log(`Data length: $data.result.length`)
            if (data.result.length === 0) data = await generate();

            generatedText = data.result;
            setQuestion(data.result);
            newPrompt = newPrompt + data.result;
            setPrompt(newPrompt);
            setAnswer("");
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div>
            <Head>
                <title>Product Manager Interview</title>
                <link rel="icon" href="/mindmeld.png"/>
            </Head>

            <main className={styles.main}>
                <img src="/mindmeld.png" className={styles.icon}/>
                <h3>Respond to product questions.</h3>
                <div className={styles.result}>{question}</div>
                <form onSubmit={onSubmit}>
                    <textarea
                        name="answer"
                        cols={80}
                        rows={10}
                        placeholder="Enter an answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <input type="submit" value="Submit Answer"/>
                </form>
                <div className={styles.history}>
                    <HistoryList/>
                </div>
            </main>
        </div>
    )

}

export default MainScreen;