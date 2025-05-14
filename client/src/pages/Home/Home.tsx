import style from './Home.module.css';
import Header from '../../components/Header/Header';
import Section from '../../components/Section/Section';
import Footer from '../../components/Footer/Footer';

function Home() {
    document.title = `Schiro's GameHub`;

    return (
        <div className={style.body}>
            <Header />
            <Section />
            <Footer />
        </div>
    )
}

export default Home;
