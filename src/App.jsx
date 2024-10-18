import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import CommentPage from "./pages/CommentPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/comments" element={<CommentPage />} />
            </Routes>
        </Router>
    );
}

export default App;
