import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chatbot-dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
