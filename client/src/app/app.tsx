import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from '@acme/shared-models';
import styles from './app.module.scss';
import Tickets from './tickets/tickets';
import { Container } from '@mui/material';
import { UserService } from '../services';
import TicketDetails from './ticket-details/ticket-details';
import { Header } from 'client/src/components';

const App = () => {
  const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchUsers() {
      const data = await UserService.getUsers();
      setUsers(await data.json());
    }
    fetchUsers();
  }, []);

  return (
    <div className={styles["app"]}>
      <Header title="Ticketing App" />
      <Container className={styles["app-container"]}>
        <Routes>
          <Route path="/" element={<Tickets users={users} />} />
          {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
          <Route path="/:id" element={<TicketDetails users={users} />} />
        </Routes>
      </Container>
    </div >
  );
};

export default App;
