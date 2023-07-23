import { FormEvent, Fragment, memo, useState } from 'react'
import {
  Button,
  Modal,
  Box,
  FormControl,
  Typography,
  InputLabel,
  MenuItem,
  DialogActions
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User } from '@acme/shared-models';
import { modalStyles } from '../../theme/modal';
import { TicketService } from 'client/src/services';

interface IAssignTicketProps {
  users: User[];
  ticketId: number;
  assigneeId: number;
  handleDone: (id: number) => void;
}

function AssignTicket({ users, ticketId, assigneeId, handleDone }: IAssignTicketProps) {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: SelectChangeEvent) => {
    setUserId(e.target.value as string);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = TicketService.putTicketAssign(ticketId, Number(userId));

    if (await response) {
      response.then(() => {
        handleDone(Number(userId));
        setUserId("");
        handleClose();
      })
    }
  }

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        disabled={assigneeId !== 0 ? true : false}
      >
        Assign
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={{ ...modalStyles, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" pb={2}>
            Assign ticket to user
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="select-label">User</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={userId}
                label="User"
                onChange={handleChange}
              >
                {
                  users.map(user => (
                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                  ))
                }
              </Select>
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

export default memo(AssignTicket);

