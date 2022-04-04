// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableList from './components/table-list/tableList';
import AddColumn from './components/table-list/add-column/addColumn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableList />} />
        <Route path="/addColumn/:tableName" element={<AddColumn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
