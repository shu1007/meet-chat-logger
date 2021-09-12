import { ListItemText, makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { toDoubleDigits } from "./util";

type Props = { chats: Chat[]; handleClick: (datetime: number) => void };
type ListItemProps = {
    meetId: string;
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
                    date.getMonth() + 1
                )}/${toDoubleDigits(date.getDate())} ${toDoubleDigits(
                    date.getHours()
                )}:${toDoubleDigits(date.getMinutes())}`}
                secondary={`MeetId: ${props.meetId}`}
            />
        </ListItem>
    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 300,
        height: 400,
        marginTop: 16,
        backgroundColor: theme.palette.background.paper
    }
}));
export const ChatList = (props: Props) => {
    const renderRow = (rowProps: ListChildComponentProps) => {
        const { index, style } = rowProps;

        const chatItem = props.chats[index];
        return (
            <ChatItem
                meetId={chatItem.meetId}
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
