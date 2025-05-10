import Header from '../components/Header/Header';
import Section from '../components/Section/Section';

function Home() {
    document.title = `Schiro's GameHub`;

    return (
        <>
            <header><Header /></header>
            <section><Section /></section>
        </>
    )
}

export default Home;
