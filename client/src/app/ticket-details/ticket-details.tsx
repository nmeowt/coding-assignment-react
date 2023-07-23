import {
  useParams, useNavigate,
} from 'react-router-dom';
import styles from './ticket-details.module.css';
import {
  Container,
  Box,
  TextField,
  Stack,
  Typography,
  Button
} from '@mui/material';
import { Ticket, User } from '@acme/shared-models';
import { useEffect, useMemo, useState } from 'react';
import { UserMap } from 'client/src/utils/userMap';
import { TicketService } from 'client/src/services';
import { AssignTicket, CompleteTicket } from 'client/src/components/tickets';

interface TicketDetailsProps {
  users: User[];
}

export function TicketDetails({ users }: TicketDetailsProps) {
  const { id } = useParams();
  const [ticket, setTicket] = useState({} as Ticket);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTicket() {
      const data = TicketService.getTicketById(Number(id));
      setTicket(await data);
    }

    fetchTicket()
  }, [])

  const userIdMapName = useMemo(() => UserMap(users), [users, ticket.assigneeId]);

  const handleAssignDone = (id: number) => {
    setTicket((prevTicket: Ticket) => {
      return {
        ...prevTicket,
        assigneeId: id
      }
    })
  }

  const handleCompleteDone = () => {
    setTicket((prevTicket: Ticket) => {
      return {
        ...prevTicket,
        completed: true,
      }
    })
    alert("Updated status of ticket");
  }

  const handleGoBack = () => {
    navigate('/', { replace: true });
  };

  return (
    <Container className={styles['container']}>
      <Button
        sx={{ margin: 0, padding: 0 }}
        onClick={handleGoBack}>
        Go back
      </Button>
      <Typography variant="h6">
        Ticket Details
      </Typography>

      {ticket.id && (
        <Box sx={{
          width: 500,
          maxWidth: '100%',
          '& .MuiTextField-root': { m: 1 },
        }}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            id="description"
            label="Description"
            variant="filled"
            defaultValue={ticket.description}
          />
          <Box ml={1} mb={2} mt={2}>
            Asigneed to: {ticket.assigneeId ? userIdMapName.get(ticket.assigneeId) : 'None'}
          </Box>
          <Box ml={1} mb={2} mt={2}>
            Status to: {ticket.completed ? 'Completed' : 'Incompleted'}
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={3}>
            <CompleteTicket
              ticketId={Number(id)}
              status={ticket.completed}
              handleDone={handleCompleteDone}
            />
            <AssignTicket
              ticketId={Number(id)}
              users={users}
              assigneeId={ticket.assigneeId || 0}
              handleDone={handleAssignDone}
            />
          </Stack>
        </Box>
      )}
    </Container>
  );
}

export default TicketDetails;
