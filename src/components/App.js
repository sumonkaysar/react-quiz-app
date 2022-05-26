import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';
// import PrivateOutlet from './PrivateOutlet';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/quiz/:id" element={<Quiz />} />
                        <Route path="/result/:id" element={<Result />} />
                        {/* <Route path="/*" element={<PrivateOutlet />}>
                            <Route path="quiz/:id" element={<Quiz />} />
                            <Route path="result" element={<Result />} />
                            <Route index element={<Home />} />
                        </Route> */}
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
