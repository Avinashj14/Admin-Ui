// App.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { UserProvider } from './context/UserContext';

test('App renders and interacts with components', async () => {
  render(
    <UserProvider>
      <App />
    </UserProvider>
  );

  // Wait for data to be loaded (assuming a loading state is shown)
  await waitFor(() => screen.getByText('Loading...'));

  // Check if components are rendered
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search By Name Email and Role')).toBeInTheDocument();
  expect(screen.getByText('Delete Selected')).toBeInTheDocument();

  // Interact with SearchBar
  const searchInput = screen.getByPlaceholderText('Search By Name Email and Role');
  userEvent.type(searchInput, 'John');

  // Check if UserTable updates based on the search term
  await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

  // Interact with Pagination
  const nextPageButton = screen.getByText('»');
  userEvent.click(nextPageButton);

  // Check if the next page is rendered
  expect(screen.getByText('Page 2')).toBeInTheDocument();

  // Interact with UserTable (assuming there's a user with "John" on the second page)
  const johnOnPage2 = screen.getByText('John Doe');
  userEvent.click(johnOnPage2);

  // Check if the Edit modal is opened
  expect(screen.getByText('Edit User')).toBeInTheDocument();

  // Interact with Edit modal
  const submitButton = screen.getByText('Submit');
  userEvent.click(submitButton);

  // Check if the modal is closed after submission
  await waitFor(() => expect(screen.queryByText('Edit User')).not.toBeInTheDocument());

  // Interact with Delete Selected button
  const deleteSelectedButton = screen.getByText('Delete Selected');
  userEvent.click(deleteSelectedButton);

  // Check if the Delete Selected functionality works
  await waitFor(() => expect(screen.queryByText('John Doe')).not.toBeInTheDocument());
});
