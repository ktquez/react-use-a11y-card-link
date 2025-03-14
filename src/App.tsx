import Card from './components/Card'
import './App.css'

const course = {
  id: 1,
  title: 'Hook for accessible card links in React',
  description: 'Hook for accessible card links in React. Supports left-click, text selection, and keyboard navigation with TypeScript'
}

function App() {

  return (
    <Card course={course} />
  );
};

export default App
