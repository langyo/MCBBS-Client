import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Grow from '@material-ui/core/Grow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Stores from '../../resourceManager/stores';
import Actions from "../../resourceManager/actions";

const styles = theme => ({

});

class LanguageChoser extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [Stores.view.dialog, Stores.view.language];
  }

  handleCloseDialog = Actions.view.dialog.reset;

  handleChangeLanguage = event => Actions.view.language.toggleTo(event.target.value);

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.state.show == 'language'}
        onClose={this.handleCloseDialog}
      >
        <DialogTitle>语言 / Language</DialogTitle>
        <DialogContent>
        <FormControl>
          <RadioGroup
            name="languages"
            value={this.state.language}
            onChange={this.handleChangeLanguage}
          >
            <FormControlLabel value="zh-chs" control={<Radio color="primary" />} label="简体中文" />
            <FormControlLabel value="zh-cht" control={<Radio color="primary" />} label="繁體中文" disabled/>
            <FormControlLabel value="en" control={<Radio color="primary" />} label="English" disabled />
          </RadioGroup>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(LanguageChoser);
