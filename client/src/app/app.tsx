import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from '@acme/shared-models';
import styles from './app.module.scss';
import Tickets from './tickets/tickets';
import { Container } from '@mui/material';
import TicketDetails from './ticket-details/ticket-details';
import { Header, Loader } from 'client/src/components';
import { useDispatch, useSelector } from 'react-redux';
import { configLoadingStatusSelector, usersConfigSelector } from 'client/src/redux/selectors/app';
import { loadUser } from 'client/src/redux/actions/app';

const App = () => {
  const dispatch = useDispatch<any>();
  const users = useSelector(usersConfigSelector)
  const loading = useSelector(configLoadingStatusSelector);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles["app"]}>
      <Header title="Ticketing App" />
      <Container className={styles["app-container"]}>
        <Routes>
          <Route path="/" element={<Tickets users={users as User[]} />} />
          {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
          <Route path="/:id" element={<TicketDetails users={users as User[]} />} />
        </Routes>
      </Container>
    </div >
  );
};

export default App;
