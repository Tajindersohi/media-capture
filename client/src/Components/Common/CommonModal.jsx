import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThemeButton from './ThemeButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', sm: '70vw', md: '50vw', lg: '40vw' },  // Responsive width
  maxWidth: '600px',  // Prevents excessive width
  height: { xs: 'auto', md: 'auto' },  // Allows height to adjust with content
  maxHeight: '90vh',  // Prevents overflow on smaller screens
  overflowY: 'auto',  // Enables scrolling if content overflows
  bgcolor: 'background.paper',
  border: '5px solid #0c831f30',
  boxShadow: 24,
  p: 2,
  borderRadius: '10px',
};

export default function CommonModal({ open, handleClose, children, handleSubmit, header = "", buttonTitle = "Submit", loginModal = false }) {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box width={'100%'}>
          {/* Header Section */}
          <Box position="relative" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5" color='#02cfac'><b>{header}</b></Typography>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content Section */}
          <Box my={4}>{children}</Box>

          {/* Buttons Section */}
          {!loginModal && (
            <Box display={'flex'} justifyContent={'center'} gap={2} mt={2}>
              <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
              <ThemeButton label={buttonTitle} onClick={handleSubmit} variant='primary' />
            </Box>
          )}
          {loginModal && (
            <Box>
              <ThemeButton label={buttonTitle} onClick={handleSubmit} variant='primary' fullWidth={true} />
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
