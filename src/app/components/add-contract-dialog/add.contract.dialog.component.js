import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    IconButton,
    CircularProgress,
    Typography
} from "@material-ui/core";
import { Clear, RadioButtonUnchecked, FiberManualRecord, CheckCircle } from "@material-ui/icons";
import ContractDialogStep1Component from './add.contract.dialog.step1.component';
import ContractDialogStep2Component from './add.contract.dialog.step2.component';
import ContractDialogStep3Component from './add.contract.dialog.step3.component';


/* istanbul ignore next */
const styles = () => ({
    closeIcon: {
        position: "absolute",
        color: "white",
        top: ".6rem",
        right: "1rem"
    },
    buttonWrapper: {
        textAlign: "right"
    },
    loaderButton: {
        position: "absolute",
        marginTop: ".5rem",
        marginLeft: "-2.25rem"
    },
    buttonPrimary: {
        position: "relative"
    },
    buttonSecondary: {
        marginRight: "1.25rem"
    },
    groupsCount: {
        float: 'right',
        marginTop: '-12%'
    },
    legend: {
        textAlign: "right"
    },
    helperIcon: {
        margin: "0 1rem",
        fontSize: "1.425rem",
        position: "relative",
        top: ".225rem",
        left: ".225rem"
    },
    successIcon: {
        color: '#007000'
    },
    stepText: {
        padding: '4px 0px',
        color: '#196ECF'
    },
    stepTextCurrent: {
        padding: '8px 0px'
    },
    stepIconBefore: {
        fontSize: '32px',
        color: '#136FD0',
        float: 'left'
    },
    stepIconCurrent: {
        fontSize: '38px',
        color: '#136FD0',
        float: 'left'
    },
    stepIconDone: {
        fontSize: '32px',
        color: '#007000',
        float: 'left'
    },
    divideRoot: {
        flex: '1 1 auto'
    },
    divideLine: {
        display: 'block',
        borderTop: '2px solid #979797'
    },
    stepRoot: {
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        padding: '20px 0px'
    },
    stepItem: {
        padding: '0 10px',
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
    stepIcon: {
        display: 'flex',
        flexShrink: '0',
        paddingRight: '8px'
    }
});

class AddContractDialogComponent extends Component {
    constructor () {
        super();
        this.state = {
            isRequestInProgress: false,
            isStep1Visible: true,
            isStep2Visible: null,
            isStep3Visible: null,
            productCheckboxData: {
                chkbx1: false,
                chkbx2: false,
                chkbx3: false
            },
            selectedSpeciality: "",
            userEnteredCAQHID: "",
            prefillCAQHData: "",
            primaryServiceZip: ""
        };

    }

    getStepIcon(classes, stepValue) {
        if (stepValue === true) {
            return <FiberManualRecord data-id="step-current-icon" className={classes.stepIconCurrent} />;
        } else if (stepValue === false) {
            return <CheckCircle data-id="step-done-icon" className={classes.stepIconDone} />;
        } else {
            return <RadioButtonUnchecked data-id="step-before-icon" className={classes.stepIconBefore} />;
        }
    }


    getDialogContent() {
        if (this.state.isStep1Visible) {
            return (
                <ContractDialogStep1Component
                    productCheckboxData={this.state.productCheckboxData}
                    setProductCheckboxData={this.setProductCheckboxData.bind(this)}
                    selectedSpeciality={this.state.selectedSpeciality}
                    setSelectedSpeciality={this.setSelectedSpeciality.bind(this)}
                    primaryServiceZip={this.state.primaryServiceZip}
                    setPrimaySerLocationZip={this.setPrimaySerLocationZip.bind(this)}
                />)
        } else if (this.state.isStep2Visible) {
            return (
                <ContractDialogStep2Component
                    isRequestInProgress={this.state.isRequestInProgress}
                    userEnteredCAQHID={this.state.userEnteredCAQHID}
                    setRequestProgressFlag={this.setRequestProgressFlag.bind(this)}
                    setUserEnteredCAQHID={this.setUserEnteredCAQHID.bind(this)}
                    prefillCAQHData={this.state.prefillCAQHData}
                    setPrefillCAQHResponse={this.setPrefillCAQHResponse.bind(this)}
                    additionalDoctotheContract={this.state.additionalDoctotheContract}
                />)
        } else if (this.state.isStep3Visible) {
            return (<ContractDialogStep3Component additionalDoctotheContract={this.state.additionalDoctotheContract} />)

        }
    }

    handleOnClickNext() {
        if (this.state.isStep1Visible === true) {
            // step 1 validation & if passes going to step 2
            if (!this.state.primaryServiceZip) {
                alert('please enter primary service address zipcode');
                return false;
            } else if (this.state.productCheckboxData.chkbx1 === false && this.state.productCheckboxData.chkbx2 === false && this.state.productCheckboxData.chkbx3 === false) {
                alert('please select at least one product');
                return false;
            } else if (!this.state.selectedSpeciality) {
                alert('please select at Speciality');
                return false;
            }
            this.setState({ isStep1Visible: false, isStep2Visible: true, isStep3Visible: null });
        } else if (this.state.isStep2Visible === true) {
            // step 2 validation & if passes going to step 3
            if (!this.state.prefillCAQHData) {
                alert('please enter CAQH ID');
                return false;
            }
            this.setState({ isStep1Visible: false, isStep2Visible: false, isStep3Visible: true });
        } else if (this.state.isStep3Visible === true) {
            this.setState({ isStep1Visible: false, isStep2Visible: false, isStep3Visible: false }, () => {
                this.props.closeDialog();
                // continue to RFP
                this.props.routerHistory.push("/rfp/12345");
            });
        }
    }

    setProductCheckboxData(newProductCheckboxData) { this.setState({ productCheckboxData: newProductCheckboxData }); }

    setSelectedSpeciality(newSelectedSpeciality) { this.setState({ selectedSpeciality: newSelectedSpeciality }); }

    setRequestProgressFlag(isReqInProgress) { this.setState({ isRequestInProgress: isReqInProgress }); }

    setUserEnteredCAQHID(newVal) { this.setState({ userEnteredCAQHID: newVal }); }

    setPrefillCAQHResponse(prefillResp) { this.setState({ prefillCAQHData: prefillResp }); }

    setPrimaySerLocationZip(zipVal) { this.setState({ primaryServiceZip: zipVal }); }

    render() {
        const { classes } = this.props;
        return (
            <Dialog open={this.props.isDialogOpen} aria-labelledby="dialog" maxWidth="md" classes={{ paperWidthMd: "dialog" }}>
                <DialogTitle disableTypography={true}>
                    <span> Add New Contract </span>
                    <IconButton className={classes.closeIcon} aria-label="Close" onClick={this.props.closeDialog}>
                        <Clear />
                    </IconButton>
                </DialogTitle>

                {/* ---------------------------- DIALOG CONTENT GOES HERE -------------------------- */}
                <DialogContent>
                    <div className={classes.stepRoot}>
                        <div className={classes.stepItem}>
                            <span className={classes.stepLabel}>
                                <span className={classes.stepIcon}>
                                    {this.getStepIcon(classes, this.state.isStep1Visible)}
                                </span>
                                <Typography color="textPrimary" variant="body1" component="span" className={this.state.isStep1Visible === true ? classes.stepTextCurrent : classes.stepText}>
                                    <span> Step 1: Location and Speciality</span>
                                </Typography>
                            </span>
                        </div>
                        <div className={classes.divideRoot}>
                            <span className={classes.divideLine} />
                        </div>
                        <div className={classes.stepItem}>
                            <span className={classes.stepLabel}>
                                <span className={classes.stepIcon}>
                                    {this.getStepIcon(classes, this.state.isStep2Visible)}
                                </span>
                                <Typography color="textPrimary" variant="body1" className={this.state.isStep2Visible === true ? classes.stepTextCurrent : classes.stepText}>
                                    <span>Step 2: Demographics</span>
                                </Typography>
                            </span>
                        </div>
                        <div className={classes.divideRoot}>
                            <span className={classes.divideLine} />
                        </div>
                        <div className={classes.stepItem}>
                            <span className={classes.stepLabel}>
                                <span className={classes.stepIcon}>
                                    {this.getStepIcon(classes, this.state.isStep3Visible)}
                                </span>
                                <Typography color="textPrimary" variant="body1" className={this.state.isStep3Visible !== null ? classes.stepTextCurrent : classes.stepText}>
                                    <span>Step 3: Review your Information below</span>
                                </Typography>
                            </span>
                        </div>
                    </div>
                    {this.getDialogContent()}
                </DialogContent>

                {/* ---------------------------- DIALOG FOOTER GOES HERE -------------------------- */}
                <DialogActions>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={6} md={8} />
                        <Grid className={classes.buttonWrapper} item xs={12} sm={6} md={4}>
                            {this.state.isRequestInProgress && (
                                <CircularProgress
                                    size={24}
                                    color="primary"
                                    className={classes.loaderButton}
                                />
                            )}
                            <Button variant="outlined" className={classes.buttonSecondary} onClick={this.props.closeDialog} disabled={this.state.isRequestInProgress}>
                                <span>Close</span>
                            </Button>
                            <Button variant="contained" color="primary" className={classes.buttonPrimary} onClick={this.handleOnClickNext.bind(this)} disabled={this.state.isRequestInProgress}>
                                <span>Save and Continue</span>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        )
    }
}
export default withStyles(styles)(AddContractDialogComponent);
