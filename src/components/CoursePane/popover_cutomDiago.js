import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: "auto",
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class CustomizedDialogDemo extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    return (
      <div>
        <Button variant="text" style={{color:"#FF0000"}} onClick={this.handleClickOpen}>
         **Facebook ID? What? Why? How?
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          <Typography variant="h1" Component="h1">Facebook Messenger Notifications</Typography>
          </DialogTitle>
          <DialogContent>

          <Typography>
              <p>Sorry fam, but you're not unique. That's why getting your name won't help me find you on FB. Instead, please enter the unique serial code with which FB has objectified you. Thanks!</p>
              <p>Don't know what it is? <a href="https://findmyfbid.com" target="_blank" rel="noopener noreferrer">Find it here; no login requried</a>.</p>
              <p>First time? Please check Settings >> People >> Message Requests >> filtered requests in the Messenger App for a confirmation message. Reply to it and you're all set!</p>
              <p><em>Paul Rever Notifications for Facebook Messenger is still very young, and we have not been able to fully test its robustness. It may be possible for notifications to arrive delayed or not at all lol. However, email notifications are stable. Thank you for your patience!</em></p>
            </Typography>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default CustomizedDialogDemo;
