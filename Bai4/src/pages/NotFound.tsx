import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
            <h1 style={{ fontSize: '4rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>404</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn--primary">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
