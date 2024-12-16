import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AmdocsJourney from '../components/Register/signup-components/AmdocsJourney'
function EditAmdocsJourney({ open, handleClose,buttonText,setAmdocsJourney,journeys, setJourneys,setErrorMessage,setOpenErrorToast }) {
    const amdocsJourneyProps = {
        setAmdocsJourney,journeys,setJourneys,setErrorMessage,setOpenErrorToast
      }
  return (
    
    <Dialog
      open={open}
      onClose={()=>handleClose(false)}
      fullWidth
      maxWidth="md"
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          handleClose(false);
        },
        sx: { backgroundImage: 'none',overflow: 'visible' },
      }}
    >
      <DialogTitle>Edit</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 'fit-content' }}>
          <AmdocsJourney props={amdocsJourneyProps}/>
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button variant="contained" type="error" onClick={() => handleClose(true)}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>

  );
}

EditAmdocsJourney.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default EditAmdocsJourney;