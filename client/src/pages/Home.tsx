import Header from '../components/Header/Header';
import Section from '../components/Section/Section';
import Footer from '../components/Footer/Footer';

function Home() {
    document.title = `Schiro's GameHub`;

    return (
        <div className='body'>
            <header><Header /></header>
            <section><Section /></section>
            <footer><Footer /></footer>
        </div>
    )
}

export default Home;
