// UserTable.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from '../components/UserTable';
import { UserProvider } from '../context/UserContext';

describe('UserTable Component', () => {
  test('renders UserTable component', () => {
    render(
      <UserProvider>
        <UserTable />
      </UserProvider>
    );
    const userTableElement = screen.getByText('Name');
    expect(userTableElement).toBeInTheDocument();
  });

  test('checks all checkboxes on "Select All" click', () => {
    render(
      <UserProvider>
        <UserTable />
      </UserProvider>
    );

    const selectAllCheckbox = screen.getByTestId('select-all-checkbox');
    fireEvent.click(selectAllCheckbox);

    const checkboxes = screen.getAllByTestId('user-checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  // Add more tests as needed for other functionalities in UserTable
});
