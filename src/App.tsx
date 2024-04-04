import UsersPage from './components/UsersPage/UsersPage';
import './App.scss';

function App() {
  return (
    <div
      className='App'
      data-testid='app'
    >
      <UsersPage></UsersPage>
    </div>
  );
}

export default App;
