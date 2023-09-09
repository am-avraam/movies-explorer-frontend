import './App.css';
// import { UserContext } from '../../contexts/context';
import AppRouter from '../../router/AppRouter';

function App() {
  return (
    // <UserContext.Provider value={currentUser}>
    <div className="App">
      <AppRouter />
    </div>
    // </UserContext.Provider>
  );
}

export default App;
