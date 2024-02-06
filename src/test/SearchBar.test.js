// SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  test('renders SearchBar component', () => {
    render(<SearchBar />);
    const searchBarElement = screen.getByPlaceholderText('Search By Name Email and Role');
    expect(searchBarElement).toBeInTheDocument();
  });

  test('calls onSearch prop on input change', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search By Name Email and Role');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});
