import { FC } from 'react';
import Link from 'next/link';

const NotFoundPage: FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '75vh',
            textAlign: 'center',
            padding: '0 10px'
        }}>
            <h1 style={{ fontSize: '6rem', margin: '0' }}>404</h1>
            <p style={{ margin: '10px 0', }}>The page you are looking for does not exist.</p>
            <Link href="/" prefetch={false} className="hover:underline">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
