import { render } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  document.documentElement.style.margin = '';
  document.documentElement.style.padding = '';
  document.getElementById = jest.fn().mockImplementation((id) => {
    if (id === 'root') {
      return { style: {} };
    }
    return null;
  });
});

describe('App Component', () => {
  test('renders the App component without crashing', () => {
    render(<App />);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
