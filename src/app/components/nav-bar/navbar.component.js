import React, { Component } from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

const styles = {
  grid: {
    height: "inherit"
  },
  welcomeMsg: {
    fontSize: "1.25rem"
  },
  root: {
    borderTop: '.125rem solid #196ecf',
    minHeight: "3.375rem",
    paddingLeft: 0
  }
};


class NavbarComponent extends Component {
  constructor () {
    super();
    this.state = { showNavbar: true };
  }


  componentDidMount() {

  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.showNavbar ? (
          <>
            <AppBar>
              <Toolbar>
                <Grid container justify="space-between" alignContent="center">
                  <Grid item>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.welcomeMsg} inline variant="subtitle2">
                      Welcome, John Smith
                    </Typography>
                    <Button variant="text" size="large" color="primary">  Logout </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </>
        ) : (
            <div />
          )}
      </>
    );
  }
}

export default withStyles(styles)(NavbarComponent);
