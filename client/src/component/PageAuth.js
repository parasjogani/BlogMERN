import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageAuth = (WrappedComponent) => {
    const HOCComponent = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const userString = localStorage.getItem('user');
            if (!userString) {
                navigate('/login');
            } else {
                const user = JSON.parse(userString);
                if (!user || !user.token) {
                    navigate('/login');
                }
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };

    return HOCComponent;
};

export default PageAuth;
