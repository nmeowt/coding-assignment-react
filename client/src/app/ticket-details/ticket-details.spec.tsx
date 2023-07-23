import { act, render } from '@testing-library/react';
import TicketDetails from './ticket-details';

const users = [{
  "id": 5,
  "name": "Ed"
}];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
) as jest.Mock;

describe('TicketDetails', () => {


  it('should render successfully', async () => {
    const { baseElement } = await act(async () => render(<TicketDetails users={users} />));
    expect(baseElement).toBeTruthy();
  });

  test("go back button text", async () => {
    const { baseElement } = await act(async () => render(<TicketDetails users={users} />));
    expect(baseElement).toHaveTextContent("Go back");
  })
});
