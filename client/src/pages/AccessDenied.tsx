import AccessDeniedPage from '../components/AccessDeniedPage/AccessDeniedPage';

function AccessDenied() {
    document.title = '404 Not Found';

    return (
        <AccessDeniedPage />
    )
}

export default AccessDenied;
