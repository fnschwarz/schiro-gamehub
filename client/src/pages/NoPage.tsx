import PageNotFound from "../components/NoPage/PageNotFound";

function NoPage() {
    document.title = '404 Not Found';

    return (
        <PageNotFound />
    )
}

export default NoPage
