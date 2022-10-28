import { render} from '@testing-library/react';
import Login from '../pages/Login';

test('renders learn react link', () => {
  render(<Login />);
  expect(<button></button>).toBeInTheDocument();
});
