import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { FormControlLabel, Checkbox, Select, OutlinedInput, MenuItem } from "@material-ui/core";
import specialityList from '../../../assets/constants/specialtyList.json';

/* istanbul ignore next */
const styles = () => ({
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
    mrgnTp3: {
        marginTop: "3rem"
    },
    valueField: {
        marginLeft: "1rem"
    },
    primaryStateDropDown: {
        width: '33%',
        height: '2.5rem'
    }
});

class ContractDialogStep1Component extends Component {

    handleOnClickCheckbox(event) {
        const dbSettins = JSON.parse(JSON.stringify(this.props.productCheckboxData));
        dbSettins[event.currentTarget.value] = !dbSettins[event.currentTarget.value];
        this.props.setProductCheckboxData(dbSettins);
    }

    handlePrimaySerLocationZip(event) {
        this.props.setPrimaySerLocationZip(event.currentTarget.value);
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>

                <div style={{ marginTop: "1rem" }}>
                    <span>1. </span> <span>Enter the ZIP code of the primary service location. </span>
                    <div className={classes.valueField} style={{ marginTop: "1rem" }}>
                        <OutlinedInput onChange={this.handlePrimaySerLocationZip.bind(this)} className={classes.altInput} style={{ width: "33%" }} value={this.props.primaryServiceZip} />
                    </div>
                </div>

                <div className={classes.mrgnTp3}>
                    <span>2. </span> <span>Select Products you would like to contract. </span>
                    <div className={classes.valueField}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.props.productCheckboxData.chkbx1}
                                    onChange={this.handleOnClickCheckbox.bind(this)}
                                    value="chkbx1"
                                    color="primary"
                                />
                            }
                            label="Commercial Products"
                        />
                    </div>
                    <div className={classes.valueField}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.props.productCheckboxData.chkbx2}
                                    onChange={this.handleOnClickCheckbox.bind(this)}
                                    value="chkbx2"
                                    color="primary"
                                />
                            }
                            label="Medicare Products"
                        />
                    </div>
                    <div className={classes.valueField}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.props.productCheckboxData.chkbx3}
                                    onChange={this.handleOnClickCheckbox.bind(this)}
                                    value="chkbx3"
                                    color="primary"
                                />
                            }
                            label="Medicaid Products"
                        />
                    </div>
                </div>

                <div className={classes.mrgnTp3}>
                    <span>3. </span> <span>Enter Primary Speciality of the counterparty. </span>
                    <div className={classes.valueField} style={{ marginTop: "1rem" }}>
                        <Select
                            className={classes.primaryStateDropDown}
                            value={this.props.selectedSpeciality || ""}
                            onChange={(event) => this.props.setSelectedSpeciality(event.target.value)}
                            input={<OutlinedInput name="selectedPrimaryState" />}
                        >
                            {specialityList
                                && specialityList.map(state => {
                                    return (
                                        <MenuItem key={state.code} value={state.shrt_description}>
                                            {state.full_description}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </div>
                </div>

            </React.Fragment >
        )
    }
}
export default withStyles(styles)(ContractDialogStep1Component);
