import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import AppContext from '../../context/app.context';

/* istanbul ignore next */
const styles = () => ({
    root: {
        margin: "2rem",
        position: "relative"
    },
    paper: {
        height: "50%",
        minHeight: "50vh",
        width: "100%",
        borderTop: ".5rem solid #196ECF"
    },
    mrgn10: {
        margin: "10rem"
    },
    btn: {
        marginLeft: "15rem",
        marginBottom: "1rem"
    },
    moveToTop: {
        position: "absolute",
        top: "-5rem",
        right: "-1rem"
    },
});

class ContractDashboardComponent extends Component {
    static contextType = AppContext;
    constructor () {
        super();
        this.state = {
            isDialogOpen: false,
            userList: []
        };

    }

    render() {
        const { classes } = this.props;
        return (
            <section className={classes.root}>
                <Button variant="contained" color="primary"> Add New User </Button>
            </section>
        )
    }
}
export default withStyles(styles)(ContractDashboardComponent);
