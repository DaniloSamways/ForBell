import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Main from './Main'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route Component={Main} path="/:id" />
        <Route Component={Main} path="/" />
        <Route Component={Form} path="/create" />
      </Routes>
    </Router>
  )
}