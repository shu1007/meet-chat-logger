import { ListItemText, makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useEffect } from "react";
import { toDoubleDigits } from "./util";

type Props = { chats: Chat[]; handleClick: (datetime: number) => void };
type ListItemProps = {
    chatId: string;
    datetime: number;
    style: React.CSSProperties;
    handleClick: (datetime: number) => void;
};

const ChatItem = (props: ListItemProps) => {
    const date = new Date(props.datetime);
    return (
        <ListItem
            button
            style={props.style}
            onClick={() => props.handleClick(props.datetime)}
        >
            <ListItemText
                primary={`${date.getFullYear()}/${toDoubleDigits(
                    date.getMonth()
                )}/${toDoubleDigits(date.getDate())} ${toDoubleDigits(
                    date.getHours()
                )}:${toDoubleDigits(date.getMinutes())}`}
                secondary={`Chat Id: ${props.chatId}`}
            />
        </ListItem>
    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));
export const ChatList = (props: Props) => {
    const renderRow = (rowProps: ListChildComponentProps) => {
        const { index, style } = rowProps;

        const chatItem = props.chats[index];
        return (
            <ChatItem
                chatId={chatItem.chatId}
                datetime={chatItem.time}
                style={style}
                handleClick={props.handleClick}
                key={index}
            />
        );
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <FixedSizeList
                height={400}
                width={300}
                itemSize={46}
                itemCount={props.chats.length}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
};
