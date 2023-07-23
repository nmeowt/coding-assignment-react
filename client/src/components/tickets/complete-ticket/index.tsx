import { Fragment, memo } from "react";
import { Button } from '@mui/material';
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { TicketService } from "client/src/services";

interface ICompleteTicketProps {
  ticketId: number;
  status: boolean;
  handleDone: () => void;
}

function CompleteTicket({ ticketId, status
  , handleDone }: ICompleteTicketProps) {

  const handleClickComplete = async () => {
    await TicketService.putTicketAsComplete(Number(ticketId)).then(handleDone);
  }
  const handleClickIncomplete = async () => {
    await TicketService.putTicketAsIncomplete(Number(ticketId)).then(handleDone);
  };

  return (
    <Fragment>
      {status ? (
        <Button
          onClick={handleClickIncomplete}
        >
          Incomplete
        </Button>
      ) : (
        <Button
          onClick={handleClickComplete}
        >
          Complete
        </Button>
      )}
    </Fragment>
  );
}
export default memo(CompleteTicket);
