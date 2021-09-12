import { Grid, Typography, makeStyles, List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

type Props = { messageBlocks: MessageBlock[] };
type MessageItemProps = {
    messageBlock: MessageBlock;
    inlineClassName: string;
};
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: 400,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: "inline"
    }
}));

const MessageItem = (props: MessageItemProps) => {
    return (
        <ListItem button>
            <ListItemText
                primary={
                    <>
                        {props.messageBlock.sender}
                        <Typography
                            color="textSecondary"
                            className={props.inlineClassName}
                            variant="caption"
                        >
                            {props.messageBlock.timeStamp}
                        </Typography>
                    </>
                }
                secondary={
                    <Grid container direction="column" spacing={1}>
                        {props.messageBlock.messages.map((m, i) => (
                            <Grid item key={i}>
                                <div
                                    style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        width: "271px"
                                    }}
                                >
                                    <Typography
                                        style={{ wordWrap: "break-word" }}
                                    >
                                        {m}
                                    </Typography>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                }
            />
        </ListItem>
    );
};

export const Message = (props: Props) => {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {props.messageBlocks.map((mb, i) => (
                <MessageItem
                    messageBlock={mb}
                    inlineClassName={classes.inline}
                    key={i}
                />
            ))}
        </List>
    );
};
