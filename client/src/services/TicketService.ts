import { Ticket } from "@acme/shared-models";
import { AppResponse } from "../interface";

const TicketService = {
  async getTickets() {
    const data = await fetch('/api/tickets');
    return await data.json();
  },
  async getTicketById(id: number) {
    const data = await fetch('/api/tickets/' + id);
    return await data.json();
  },
  async postTicket(data: object): Promise<AppResponse<Ticket>> {
    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response.json();
  },
  async putTicketAssign(ticketId: number, userId: number) {
    const url = `/api/tickets/${ticketId}/assign/${userId}`;

    return await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    });
  },
  async putTicketAsComplete(ticketId: number) {
    const url = `/api/tickets/${ticketId}/complete`;

    return await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    });
  },
  async putTicketAsIncomplete(ticketId: number) {
    const url = `/api/tickets/${ticketId}/complete`;

    return await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
  },
}

export default TicketService;
