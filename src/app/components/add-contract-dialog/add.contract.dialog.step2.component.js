import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, FormControl, Typography, InputLabel, OutlinedInput, Button, Link, InputAdornment, Select, MenuItem } from "@material-ui/core";
import dataConstant from '../../service/data-constants/data-constants.service';
import { CheckRounded } from "@material-ui/icons";

/* istanbul ignore next */
const styles = theme => ({
    stepItem: {
        padding: '0 30px',
        '&:first-child': {
            paddingLeft: '0px'
        },
        '&:last-child': {
            paddingRight: '0px'
        }
    },
    stepLabel: {
        alignItems: 'center',
        display: 'flex',
    },
    titleWrapper: {
        marginBottom: "1rem"
    },
    requiredTitle: {
        fontSize: '14px',
        color: '#E91B18'
    },
    verticalDivider: {
        borderRight: "1px solid #979797"
    },
    caqhLinkError: {
        textAlign: "right"
    },
    altInput: {
        height: "2rem"
    },
    successIcon: {
        color: theme.palette.success.main
    },
});

class ContractDialogStep2Component extends Component {

    handleCaqhCall() {
        if (this.props.userEnteredCAQHID) {
            this.props.setRequestProgressFlag(true);
            this.props.setPrefillCAQHResponse("");
            setTimeout(() => {
                this.props.setRequestProgressFlag(false);
                this.props.setPrefillCAQHResponse(dataConstant.prefillCAQHResponse);
            }, 3000);
        } else {
            alert('please enter CAQH ID first');
        }

    }

    handleCAQHIDOnChange(event) { this.props.setUserEnteredCAQHID(event.currentTarget.value); }

    changePrimaryState(newState) {
        if (this.props.prefillCAQHData) {
            const prefillData = this.props.prefillCAQHData;
            prefillData['usState'] = newState;
            this.props.setPrefillCAQHResponse(prefillData);
        }
    }

    changePracticeSetting(fdsQValue) {
        if (this.props.prefillCAQHData) {
            const prefillData = this.props.prefillCAQHData;
            prefillData['fdfDSValue'] = fdsQValue;
            this.props.setPrefillCAQHResponse(prefillData);
        }
    }

    handleOnChangeAdditionalContract(newContractVal) {
        if (this.props.prefillCAQHData) {
            const prefillData = this.props.prefillCAQHData;
            prefillData['additionalContract'] = newContractVal;
            this.props.setPrefillCAQHResponse(prefillData);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <form>
                    <Grid container spacing={16}>
                        <Grid item xs={7}>
                            <Typography color="secondary" className={classes.requiredTitle}>
                                <span> &#42;All fields are required </span>
                            </Typography>
                            <Typography color="textPrimary" className={classes.titleWrapper} variant="body1" gutterBottom>
                                <span> Enter a CAQH ID below to check if credentialing is required </span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={32}>
                        <Grid className={classes.verticalDivider} item xs={3}>
                            <FormControl>
                                <InputLabel>CAQH ID</InputLabel>
                                <OutlinedInput
                                    className={classes.altInput}
                                    value={this.props.userEnteredCAQHID}
                                    onChange={this.handleCAQHIDOnChange.bind(this)}
                                />
                            </FormControl>
                            <Button className={classes.providerCheckButton} color="primary" variant="contained"
                                disabled={this.props.isRequestInProgress}
                                onClick={this.handleCaqhCall.bind(this)}
                                fullWidth
                            >
                                <span> Check Provider</span>
                            </Button>
                            <Grid item xs={12} className={classes.caqhLinkPrimary}>
                                <Link
                                    variant="body1"
                                    href=""
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {`I don't have a CAQH ID`}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl>
                                        <InputLabel>Last Name</InputLabel>
                                        <OutlinedInput
                                            className={classes.altInput}
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.lastName) ? this.props.prefillCAQHData.lastName : ''}
                                            variant="filled"
                                            readOnly
                                            disabled
                                            endAdornment={
                                                this.props.prefillCAQHData ? (
                                                    <InputAdornment position="end">
                                                        <CheckRounded className={`${classes.successIcon}`} />
                                                    </InputAdornment>
                                                ) : null
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl>
                                        <InputLabel>First Name</InputLabel>
                                        <OutlinedInput
                                            className={classes.altInput}
                                            disabled
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.firstName) ? this.props.prefillCAQHData.firstName : ''}
                                            variant="filled"
                                            readOnly
                                            endAdornment={
                                                this.props.prefillCAQHData ? (
                                                    <InputAdornment position="end">
                                                        <CheckRounded className={`${classes.successIcon}`} />
                                                    </InputAdornment>
                                                ) : null
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl>
                                        <InputLabel>Middle Name</InputLabel>
                                        <OutlinedInput
                                            className={classes.altInput}
                                            disabled
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.middleName) ? this.props.prefillCAQHData.middleName : ''}
                                            variant="filled"
                                            readOnly
                                            endAdornment={
                                                this.props.prefillCAQHData ? (
                                                    <InputAdornment position="end">
                                                        <CheckRounded className={`${classes.successIcon}`} />
                                                    </InputAdornment>
                                                ) : null
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl>
                                        <InputLabel>NPI</InputLabel>
                                        <OutlinedInput
                                            className={classes.altInput}
                                            disabled
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.npi) ? this.props.prefillCAQHData.npi : ''}
                                            readOnly
                                            endAdornment={
                                                this.props.prefillCAQHData ? (
                                                    <InputAdornment position="end">
                                                        <CheckRounded className={`${classes.successIcon}`} />
                                                    </InputAdornment>
                                                ) : null
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl>
                                        <InputLabel>Specialty</InputLabel>
                                        <OutlinedInput
                                            className={classes.altInput}
                                            disabled
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.speciality) ? this.props.prefillCAQHData.speciality : ''}
                                            variant="filled"
                                            readOnly
                                            endAdornment={
                                                this.props.prefillCAQHData ? (
                                                    <InputAdornment position="end">
                                                        <CheckRounded className={`${classes.successIcon}`} />
                                                    </InputAdornment>
                                                ) : null
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <FormControl>
                                        <InputLabel>Degree</InputLabel>
                                        <OutlinedInput
                                            className={classes.altInput}
                                            disabled
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.degree) ? this.props.prefillCAQHData.degree : ''}
                                            variant="filled"
                                            readOnly
                                            endAdornment={
                                                this.props.prefillCAQHData ? (
                                                    <InputAdornment position="end">
                                                        <CheckRounded className={`${classes.successIcon}`} />
                                                    </InputAdornment>
                                                ) : null
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <FormControl>
                                        <InputLabel>Primary Practice State</InputLabel>
                                        <Select
                                            className={classes.primaryStateDropDown}
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.usState) ? this.props.prefillCAQHData.usState : ''}
                                            onChange={(event) => this.changePrimaryState(event.target.value)}
                                            input={<OutlinedInput name="selectedPrimaryState" />}
                                        >
                                            {dataConstant.states && dataConstant.states.map(state => {
                                                return (
                                                    <MenuItem key={state.value} value={state.value}>
                                                        {state.displayName}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormControl>
                                        <InputLabel>Are you afflilliated with a hospital or FSF?</InputLabel>
                                        <Select
                                            className={classes.practiseSettingDropDown}
                                            input={<OutlinedInput />}
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.fdfDSValue) ? this.props.prefillCAQHData.fdfDSValue : ''}
                                            onChange={(event) => this.changePracticeSetting(event.target.value)}
                                        >
                                            {dataConstant.fsfDS && dataConstant.fsfDS.map(item => {
                                                return (
                                                    <MenuItem key={item.value} value={item.value}>
                                                        {item.displayName}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={8}>
                                    <FormControl>
                                        <InputLabel>would you like to add additional doctors to the contract?</InputLabel>
                                        <Select
                                            className={classes.practiseSettingDropDown}
                                            input={<OutlinedInput />}
                                            value={(this.props.prefillCAQHData && this.props.prefillCAQHData.additionalContract) ? this.props.prefillCAQHData.additionalContract : ''}
                                            onChange={(event) => this.handleOnChangeAdditionalContract(event.target.value)}
                                        >
                                            <MenuItem value={'Yes'}>Yes</MenuItem>
                                            <MenuItem value={'No'}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </form>

            </React.Fragment>
        )
    }
}
export default withStyles(styles)(ContractDialogStep2Component);
