import PageNotFound from "../components/PageNotFound/PageNotFound";

function NoPage() {
    document.title = '404 Not Found';

    return (
        <PageNotFound />
    )
}

export default NoPage;
