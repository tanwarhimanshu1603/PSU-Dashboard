import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

function ConfirmDialog({ open, handleClose,message,buttonText}) {
  return (
    <Dialog open={open} onClose={() => handleClose(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          {message}
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={()=>handleClose(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={()=>handleClose(true)} variant="contained">
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

ConfirmDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmDialog;