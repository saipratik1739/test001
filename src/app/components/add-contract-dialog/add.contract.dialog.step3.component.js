import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, Paper } from "@material-ui/core";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    leftTxt: {
        color: "#196ECF",
        fontWeight: "800"
    }
});

class ContractDialogStep3Component extends Component {

    componentDidMount() { }


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <span className={classes.leftTxt}>Name: </span>
                                <span style={{ marginLeft: "0.3rem", fontWeight: 700 }}>Smith Alex J </span>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <span className={classes.leftTxt}>Degree Code: </span>
                                <span style={{ marginLeft: "0.3rem", fontWeight: 700 }}>MBBS </span>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <span className={classes.leftTxt}>Speciality: </span>
                                <span style={{ marginLeft: "0.3rem", fontWeight: 700 }}>Midwife, Certified </span>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <span className={classes.leftTxt}>Address Line1: </span>
                                <span style={{ marginLeft: "0.3rem", fontWeight: 700 }}>123 Main Street </span>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <span className={classes.leftTxt}>Address Line2: </span>
                                <span style={{ marginLeft: "0.3rem", fontWeight: 700 }}>Suite 200 </span>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <span className={classes.leftTxt}>City, State, Zip: </span>
                                <span style={{ marginLeft: "0.3rem", fontWeight: 700 }}>Burkbank, CA, 02344</span>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <span className={classes.leftTxt}>Primary Address Indicator: </span>
                                <span style={{ marginLeft: "0.3rem", fontWeight: 700 }}>Yes </span>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <span className={classes.leftTxt}>Phone Number: </span>
                                <span style={{ marginLeft: "0.3rem", fontWeight: 700 }}>123-456-7890 </span>
                            </Paper>
                        </Grid>

                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(ContractDialogStep3Component);
