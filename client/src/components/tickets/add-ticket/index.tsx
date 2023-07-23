import { ChangeEvent, FormEvent, Fragment, memo, useState } from 'react'
import {
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  Typography,
  DialogActions
} from '@mui/material';
import { TicketService } from 'client/src/services';
import { Ticket } from '@acme/shared-models';
import { modalStyles } from 'client/src/components';

interface IAddTicketProps {
  handleDone: (ticket: Ticket) => void;
}

function AddTicket({ handleDone }: IAddTicketProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value as string);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      description: description,
    }
    const response = TicketService.postTicket(data);

    if (await response) {
      response.then((response) => {
        setDescription('');
        handleDone(response as unknown as Ticket);
        handleClose();
      })
    }
  };

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="contained">
        New Ticket
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={{ ...modalStyles, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" pb={2}>
            Create new ticket
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                required
                id="outlined-required"
                label="Description of ticket"
                margin="normal"
                value={description}
                onChange={handleChange}
              />
            </FormControl>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </DialogActions>
          </form>
        </Box>
      </Modal>
    </Fragment>
  )
}

export default memo(AddTicket);

