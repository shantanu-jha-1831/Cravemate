import { Modal, Box, Typography, CircularProgress, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const PeerMatchingModal = ({ open, onClose, peerName }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
        borderRadius: 2
      }}>
        {peerName ? (
          <>
            <PersonIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              {peerName} is delivering your order!
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Estimated delivery time: <strong>15 mins</strong>
            </Typography>
            <Button variant="contained" onClick={onClose}>
              Track Order
            </Button>
          </>
        ) : (
          <>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Finding a nearby peer...
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PeerMatchingModal;