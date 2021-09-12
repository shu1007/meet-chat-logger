import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

type Props = {
    hasBackButton: boolean;
    handleBack: () => void;
};

export function Header(props: Props) {
    return (
        <AppBar>
            <Toolbar>
                {props.hasBackButton && (
                    <Button
                        variant="contained"
                        onClick={() => props.handleBack()}
                    >
                        back
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
