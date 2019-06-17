import React, { Fragment } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import {
  Delete
} from '@material-ui/icons'

// The following code gives the user the options to
// clear schedules 1, 2, 3, and 4 individually or with any combination of the 4 schedules.

export default class ClearSched extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      all: false,
      one: this.props.currentScheduleIndex===0,
      two: this.props.currentScheduleIndex===1,
      three: this.props.currentScheduleIndex===2,
      four: this.props.currentScheduleIndex===3
    };
  }

  // Allows the button to pop up
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // When the Dialog is closed, this resets the Schedules the user selected.
  handleClose = () => {
    this.setState({
      open: false,
      all: false,
      one: false,
      two: false,
      three: false,
      four: false});
    this.props.handleSubmenuClose();
  }

  // This function adds elements to the toDelete array which holds which schedules to Clear.
  handleClear = () => {
    let toDelete = [];

    if (this.state.one){
      toDelete.push(0)
    }
    if (this.state.two){
      toDelete.push(1)
    }
    if (this.state.three){
      toDelete.push(2)
    }
    if (this.state.four){
      toDelete.push(3)
    }

    this.props.handleClearSchedule(toDelete)
    this.handleClose()
  }

  // Sets the "selected" state to True. All schedules begin in a False state, and changing to True will make the software push
  // to the toDelete array as done so in handleClear.
  handleChange = name => event => {
    if (name==='all'){
      this.setState({
        all: event.target.checked,
        one: event.target.checked,
        two: event.target.checked,
        three: event.target.checked,
        four: event.target.checked
      })
    }else{
      this.setState({ [name]: event.target.checked });
    }
  };

  // Renders the Dialog Box and the checkboxes used for selecting schedules. Also calls functions previously defined.
    render() {
    return (
      <Fragment>
        <Button onClick={this.handleClickOpen} disableRipple={true} style={{width: "100%"}} className={"menu-button"}>
          <Delete /> Clear Classes
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Select a Schedule to Clear</DialogTitle>
          <DialogContent>
            <div>
              <FormGroup>
              <FormControlLabel
                control={
                <Checkbox
                  checked={this.state.all} onChange={this.handleChange('all')}
                />
                }
                value="all"
                label="Clear All"
              />
              <FormControlLabel
                control={
                <Checkbox
                  checked={this.state.one} onChange={this.handleChange('one')}
                />
                }
                value="one"
                label="Schedule 1"
                color="primary"
              />
              <FormControlLabel
                control={
                <Checkbox
                  checked={this.state.two} onChange={this.handleChange('two')}
                />
                }
                value="two"
                label="Schedule 2"
              />
              <FormControlLabel
                control={
                <Checkbox
                  checked={this.state.three} onChange={this.handleChange('three')}
                />
                }
                value="three"
                label="Schedule 3"
              />
              <FormControlLabel
                control={
                <Checkbox
                  checked={this.state.four} onChange={this.handleChange('four')}
                />
                }
                value="four"
                label="Schedule 4"
              />

              </FormGroup>
            </div>
              </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClear} style = {{backgroundColor:"#72a9ed", boxShadow:"none"}}>
              Clear
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
