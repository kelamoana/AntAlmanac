import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Input from '@material-ui/core/Input';
import WhyID from './popover_cutomDiago';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class SPopover extends React.Component {
  state = {
    anchorEl: null,
    userEmail: "",
    userFB: ""
  };


  handleClick = event => {
    if (!event)  event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    let userEmail ="";
    let userFB =""
    if (typeof Storage !== "undefined") {
      userEmail = window.localStorage.getItem("email");
      userFB = window.localStorage.getItem("fb");
      }

      this.setState({ anchorEl: event.currentTarget,userEmail,userFB });

  };

  handleClose = (event) => {
    if (!event)  event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    this.setState({
      anchorEl: null,
    });
  };

  signupEmail = () =>{
    const code = this.props.code;
    const email = this.state.userEmail;
    const name = this.props.name[1] + " " + this.props.name[2]


    let url = "https://mediaont.herokuapp.com/email/"

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email))
    this.setState({ anchorEl: null,},()=>{
      this.props.handleSave(-1,`invalid email, ${email} !`)});
    else
    {
        url = url + code +"/"+ name + "/" + email;
        window.localStorage.setItem("email", email);
        this.setState({
            anchorEl: null,
          },()=>{
            fetch(url)
            this.props.handleSave(1,`${email} added to the notification list for ${name} section: ${code} !!`);
          });
    }
    // url = url + code +"/"+ name + "/" + email;
    // window.localStorage.setItem("email", email);
    // this.handleClose();
    // this.props.handleSave()
    // fetch(url)
    // alert(email+" added to the notification list for "+ code +" !!!")
  }

  signupFB = async() =>{
    const code = this.props.code;
    const fb = this.state.userFB;
    const name = this.props.name[1] + " " + this.props.name[2]

    const url = `https://mediaont.herokuapp.com/facebook/0/${code}/${name}/${fb}`;


    this.setState({anchorEl: null});
    window.localStorage.setItem("fb", fb);
      const res =  await fetch(url);
      const serverResponse = await res.text();


      console.log(serverResponse,res.status)
      let check = 1
      if(res.status !== 200)
       check = -1
      this.props.handleSave(check, serverResponse);

  }

  inputFacebookChange= (event)=>{
    if (!event)  event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    this.setState({userFB: event.target.value})
  }

  inputChange = (event) =>{
    if (!event)  event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
    this.setState({userEmail: event.target.value})
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>

        <Button
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          variant="outlined"
          color="inherit"
          className={'multiline'}
          onClick={this.handleClick}
        >
         {this.props.full}
        </Button>
        <Popover
          id="paul-revere"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          onClick={event=>{if (!event)  event = window.event;
            event.cancelBubble = true;
            if (event.stopPropagation) event.stopPropagation();}}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
        <Typography variant="title" className={classes.typography}>Get notified when space opens!</Typography>

        <div className={classes.container}>
          <typography variant='h2' className={classes.typography} style={{ marginLeft: 30 }}>
            Email:
          </typography>
          <Input
           style={{ margin: 10 }}
            onChange={this.inputChange}
            placeholder="Email"
            className={classes.input}
            defaultValue={this.state.userEmail}
            inputProps={{
              'aria-label': 'Description',
            }}
          />

          <Button variant="text"
                  color="primary"
                  className={classes.button}
                  onClick={this.signupEmail}>
            Add
          </Button>

        </div>

        <div className={classes.container}>
          <typography variant='h2' className={classes.typography} style={{ marginLeft: 30, marginBottom: 10 }}>
            FB ID:
          </typography>
          <Input
           style={{ margin: 10 }}
            onChange={this.inputFacebookChange}
            placeholder="Facebook ID**"
            className={classes.input}
            defaultValue={this.state.userFB}
            inputProps={{
              'aria-label': 'Description',
            }}
          />

          <Button variant="text"
                  color="primary"
                  className={classes.button}
                  onClick={this.signupFB}>
            Add</Button>
        </div>
          <WhyID />

        </Popover>
      </React.Fragment>
    );
  }
}

SPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SPopover);
