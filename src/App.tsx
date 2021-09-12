import { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core";
import { Header } from "./Header";
import { ChatList } from "./ChatList";
import { Message } from "./Message";
const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
}));

function App() {
    const [chats, setChats] = useState([] as Chat[]);
    const [isList, setIsList] = useState(true);
    const [messageBlocks, setMessageBlocks] = useState([] as MessageBlock[]);
    useEffect(() => {
        chrome.storage.local.get(null, (all) => {
            setChats(Object.values(all).reverse() as Chat[]);
        });
    }, []);
    const classes = useStyles();

    const handleListItemClick = (datetime: number) => {
        const key = datetime.toString();
        chrome.storage.local.get(key, (chat) => {
            const messageBlocks = (chat[key] as Chat).messageBlocks;
            setMessageBlocks(messageBlocks);
        });
        setIsList(false);
    };

    const handleBack = () => {
        setMessageBlocks([]);
        setIsList(true);
    };

    return (
        <div>
            <Header hasBackButton={!isList} handleBack={handleBack} />
            <div className={classes.toolbar}></div>
            {isList ? (
                <ChatList chats={chats} handleClick={handleListItemClick} />
            ) : (
                <Message messageBlocks={messageBlocks}></Message>
            )}
        </div>
    );
}

export default App;
