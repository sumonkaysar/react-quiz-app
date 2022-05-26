import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import Form from './Form';
import TextInput from './TextInput';

export default function LoginForm({ className }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const { login } = useAuth();

    const navigate = useNavigate();

    // eslint-disable-next-line consistent-return
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('Failed to login');
        }
    }

    return (
        // eslint-disable-next-line react/jsx-no-bind
        <Form className={className} onSubmit={handleSubmit}>
            <TextInput
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                icon="alternate_email"
                required
            />

            <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                icon="lock"
                required
            />

            <Button disabled={loading} type="submit">
                <span>Submit Now</span>
            </Button>
            {error && <p className="error">{error}</p>}
            <div className="info">
                Don&apos;t have an account? <Link to="/signup">Signup</Link> instead.
            </div>
        </Form>
    );
}
