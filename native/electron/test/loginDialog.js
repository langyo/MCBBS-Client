import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class LoginDialog extends React.Component {
  state = {
    open: this.props.open ,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
        <div>
          <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">登陆</DialogTitle>
            <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="用户名"
                  type="text"
                  fullWidth
              />
              <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="密码"
                  type="password"
                  fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                取消
              </Button>
              <Button onClick={this.handleClose} color="primary">
                登陆
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}
