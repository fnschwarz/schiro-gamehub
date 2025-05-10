import style from './Impressum.module.css';
import Header from './../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Impressum() {
    document.title = 'Impressum';

    return (
        <div className={style.body}>
            <Header />
            <div className={style.section}>
                <h2>Impressum</h2>
                <br />
                <h5>Angaben gemäß § 5 TMG</h5>
                <br />
                <p>Max Mustermann</p>
                <p>Beispielsweg 3</p>
                <p>55555 Musterhausen</p>
                <p>Deutschland</p>
                <br />
                <h5>Kontakt</h5>
                <br />
                <p>Telefon: +49 (0)123 456789</p>
                <p>E-Mail: max@mustermann.de</p>
                <br />
                <h5>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h5>
                <br />
                <p>Max Mustermann</p>
                <p>Beispielsweg 3</p>
                <p>55555 Musterhausen</p>
                <br />
                <h5>Haftungsausschluss</h5>
                <br />
                <p>Trotz sorgfältiger inhaltlicher Kontrolle wird keine Haftung für die Inhalte externer Links übernommen. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                <br />
                <h5>Streitschlichtung</h5>
                <br />
                <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href='https://ec.europa.eu/consumers/odr'>https://ec.europa.eu/consumers/odr</a></p>
                <br />

                <h2>Datenschutzerklärung</h2>
                <br />
                <p>Die Nutzung unserer Webseite ist in der Regel ohne die Angabe personenbezogener Daten möglich. Sofern auf unserer Seite jedoch personenbezogene Daten wie beispielsweise Name, Adresse oder E-Mail-Adresse erhoben werden, geschieht dies, soweit es möglich ist, freiwillig. Diese Informationen werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.</p>
                <p>Es ist jedoch darauf hinzuweisen, dass die Übertragung von Daten im Internet, wie beispielsweise bei der Kommunikation per E-Mail, Sicherheitslücken aufweisen kann. Ein vollständiger Schutz Ihrer Daten vor dem Zugriff durch unbefugte Dritte ist technisch nicht immer möglich.</p>
                <p>Im Rahmen des Anmeldeprozesses sowie bei bereits angemeldeten Nutzern, die auf unserer Webseite Aktionen durchführen, wird Ihre IP-Adresse in anonymisierter Form erfasst und in unseren Server-Logs gespeichert. Diese Daten dienen ausschließlich zur Sicherstellung der Funktionalität und Sicherheit unserer Website, etwa zur Verhinderung von Missbrauch und zur Analyse von technischen Problemen. Eine Rückverfolgung auf eine spezifische Person ist durch die Anonymisierung der IP-Adresse nicht möglich. Die gespeicherten anonymisierten IP-Adressen werden nicht an Dritte weitergegeben, es sei denn, dies ist aufgrund gesetzlicher Verpflichtungen erforderlich.</p>
                <p>Wir möchten zudem ausdrücklich darauf hinweisen, dass die im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten nicht für die Zusendung von unaufgeforderter Werbung oder Informationsmaterial genutzt werden dürfen. Sollte dies dennoch geschehen, behalten sich die Betreiber der Webseite vor, rechtliche Schritte einzuleiten.</p>
            </div>
            <Footer />
        </div>
    );
}

export default Impressum;
