import { useEffect, useState, useMemo } from "react";
import { Ticket, User } from '@acme/shared-models';
import styles from './tickets.module.scss';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { Container, Stack, Typography, Button } from '@mui/material';
import { TicketService } from "client/src/services";
import { UserMap } from "client/src/utils/userMap";
import { AddTicket, statusOnlyOperators } from "client/src/components";

export interface TicketsProps {
  users: User[];
}

const defaultColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    filterable: false
  },
  {
    field: 'description',
    headerName: 'Description',
    sortable: false,
    width: 400,
    filterable: false,
  },
  {
    field: 'completed',
    headerName: 'Status',
    width: 130,
    valueGetter(params: GridRenderCellParams) {
      return params.value ? 'Completed' : 'Incomplete';
    },
  },
  {
    field: 'assigneeId',
    headerName: 'Assignee',
    width: 160,
    filterable: false,
  },
  {
    headerName: 'Details',
    width: 100,
    filterable: false,
    renderCell(params: GridRenderCellParams) {
      const url = `/${params.row.id}`
      return <Button variant="contained" size="small" href={url}>Detail</Button>;
    }
  }
];

export function Tickets({ users }: TicketsProps) {
  const [rows, setRows] = useState([] as Ticket[]);
  const [tickets, setTickets] = useState([] as Ticket[]);

  const userIdMapName = useMemo(() => UserMap(users), [users]);

  const columns = useMemo(
    () =>
      defaultColumns.map((col: any) => {
        if (col.field === 'completed') {
          return {
            ...col,
            filterOperators: statusOnlyOperators,
          }
        }

        if (col.field === 'assigneeId') {
          return {
            ...col,
            renderCell(params: GridRenderCellParams) {
              return params.value ? userIdMapName.get(params.value) : "Unassigned";
            }
          }
        }

        return col;
      }),
    [defaultColumns, users],
  );

  useEffect(() => {
    async function fetchTickets() {
      const data = TicketService.getTickets();
      setTickets(await data);
    }

    fetchTickets();
  }, [])

  useEffect(() => {
    setRows(tickets);
  }, [tickets])

  const handleCreateTicket = (ticket: Ticket) => {
    setRows((prevRows) => [...prevRows, ticket]);
  }

  return (
    <Container className={styles['container']}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">
          Tickets
        </Typography>
        <AddTicket handleDone={handleCreateTicket} />
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns as GridColDef[]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          filterPanel: {
            filterFormProps: {
              operatorInputProps: {
                disabled: true,
                sx: { display: "none" }
              },
            }
          }
        }}
        pageSizeOptions={[10, 20]}
      />

    </Container>
  );
}

export default Tickets;
