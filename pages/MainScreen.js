import React, {useContext} from 'react';
import Head from "next/head";
import styles from "./index.module.css";
import AppContext from "./appContext";

function MainScreen({children}) {
    const {prompt, setPrompt, answer, setAnswer, question, setQuestion, history, setHistory} = useContext(AppContext);
    let newPrompt = prompt;
    let generatedText = "";

    function updateHistory(question, answer) {
        const newEntry = `${history}\n\n${question}\n[ANSWER]: ${answer}\n`;
        setHistory(newEntry);
    }

    async function onSubmit(event) {
        event.preventDefault();
        if (answer[0] !== '>') {
            newPrompt = `${prompt}\n${answer}\n`;
            updateHistory(question, answer);
            setAnswer(`${answer}....processing....`);
        }
        try {
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

    console.log(`MainScreen: generation result: ${generatedText}`);
    console.log(`MainScreen: new Prompt: ${newPrompt}`);
    return (
        <div>
            <Head>
                <title>Product Manager Interview</title>
                <link rel="icon" href="/dog.png"/>
            </Head>

            <main className={styles.main}>
                <img src="/dog.png" className={styles.icon}/>
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
                <div className={styles.history}>{history}</div>
            </main>
        </div>
    )

}

export default MainScreen;