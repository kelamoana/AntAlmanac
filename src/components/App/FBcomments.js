import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Popover from '@material-ui/core/Popover';
import {

    Comment
  } from "@material-ui/icons";
const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class FBcomments extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
    

        <IconButton  aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick} >

             <Comment  color="primary"/>
        </IconButton >
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}><div class="fb-comments" data-href="https://www.facebook.com/AntAlmanac" data-numposts="10"></div></Typography>
        </Popover>
      </div>
    );
  }
}

FBcomments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FBcomments);