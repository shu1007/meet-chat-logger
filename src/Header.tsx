import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBack from "@material-ui/icons/ArrowBack";

type Props = {
    hasBackButton: boolean;
    handleBack: () => void;
};

export function Header(props: Props) {
    return (
        <AppBar>
            <Toolbar>
                {props.hasBackButton && (
                    <IconButton edge="start" onClick={() => props.handleBack()}>
                        <ArrowBack />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
}
