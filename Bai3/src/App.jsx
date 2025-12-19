import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Counter from "./pages/Counter";
import TodoApp from "./components/Todo/TodoApp";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: '2rem' }}>
        <Routes>
            <Route path="/" element={<Navigate to="/todo" replace />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/todo" element={<TodoApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
