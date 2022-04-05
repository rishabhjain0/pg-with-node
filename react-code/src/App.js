// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableList from './components/table-list/tableList';
import AddColumn from './components/add-column/addColumn';
import AddData from './components/add-data/addData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableList />} />
        <Route path="/addColumn/:tableName" element={<AddColumn />} />
        <Route path="/addData/:tableName" element={<AddData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
