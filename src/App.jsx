import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* Pages */
import ToDoPage from './pages/ToDoPage';

function App() {

  document.title = "To-Do List App"
  
  return (
    <>
      <ToDoPage />
    </>
  )
}

export default App
