import { act, render } from '@testing-library/react';
import Tickets from './tickets';

const users = [{
  "id": 5,
  "name": "Ed"
}];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
) as jest.Mock;

describe('Tickets', () => {
  it('should render successfully', async () => {
    const { baseElement } = await act(async () => render(<Tickets users={users} />));
    expect(baseElement).toBeTruthy();
  });

  test("new Ticket button text", async () => {
    const { baseElement } = await act(async () => render(<Tickets users={users} />));
    expect(baseElement).toHaveTextContent("New Ticket");
  })
});
