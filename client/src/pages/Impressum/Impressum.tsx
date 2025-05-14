import style from './Impressum.module.css';
import { IMPRINT_NAME, IMPRINT_STREET, IMPRINT_CITY, IMPRINT_COUNTRY, IMPRINT_EMAIL } from '../../configs/env.config';
import Header from './../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Impressum() {
    document.title = 'Impressum';

    return (
        <div className={style.body}>
            <Header />
            <div className={style.section}>
                <h1>Impressum</h1>
                <br />
                <h4>Angaben gem&auml;ß § 5 TMG</h4>
                <br />
                <p>{IMPRINT_NAME}</p>
                <p>{IMPRINT_STREET}</p>
                <p>{IMPRINT_CITY}</p>
                <p>{IMPRINT_COUNTRY}</p>
                <br />
                <h4>Kontakt</h4>
                <br />
                <p>E-Mail: {IMPRINT_EMAIL}</p>
                <br />
                <h4>Haftungsausschluss</h4>
                <br />
                <p>Trotz sorgf&auml;ltiger inhaltlicher Kontrolle wird keine Haftung f&uuml;r die Inhalte externer Links &uuml;bernommen. F&uuml;r den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                <br />
                <h4>Streitschlichtung</h4>
                <br />
                <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href='https://ec.europa.eu/consumers/odr'>https://ec.europa.eu/consumers/odr</a></p>
                <br />
                <h1>Datenschutzerkl&auml;rung</h1>
                <br />
                <h2>1. Datenschutz auf einen Blick</h2>
                <br />
                <h3>1.1. Allgemeine Hinweise</h3>
                <br />
                <p>Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                pers&ouml;nlich identifiziert werden k&ouml;nnen. Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen
                Sie unserer unter diesem Text aufgef&uuml;hrten Datenschutzerkl&auml;rung.</p>
                <br />
                <h3>1.2. Datenerfassung auf dieser Website</h3>
                <br />
                <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Betreiber der Website.
                Dessen Kontaktdaten k&ouml;nnen Sie dem oben bereitgestellten Impressum entnehmen.</p>
                <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
                Daten handeln, die Sie in ein Kontaktformular eingeben</p>
                <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.
                Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>
                <p>Alle erhobenen Daten dienen ausschließlich der sicheren und fehlerfreien Bereitstellung dieser Website sowie der Durchf&uuml;hrung von Sicherheitsanalysen.
                Eine Weitergabe an Dritte erfolgt nur mit Ihrer ausdr&uuml;cklichen Zustimmung.</p>
                <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
                Sie haben außerdem ein Recht, die Berichtigung oder L&ouml;schung dieser Daten zu verlangen.
                Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, k&ouml;nnen Sie diese Einwilligung jederzeit f&uuml;r die Zukunft widerrufen.
                Außerdem haben Sie das Recht, unter bestimmten Umst&auml;nden die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Des Weiteren steht Ihnen ein Beschwerderecht bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde zu.</p>
                <br />
                <h2>2. Hosting</h2>
                <br />
                <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
                <br />
                <h3>Hetzner</h3>
                <br />
                <p>Details entnehmen Sie der Datenschutzerkl&auml;rung von Hetzner: <a href='https://www.hetzner.com/de/legal/privacy-policy/'>https://www.hetzner.com/de/legal/privacy-policy/</a>.</p>
                <br />
                <p>Die Verwendung von Hetzner erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer m&ouml;glichst zuverl&auml;ssigen Darstellung unserer Website.
                Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endger&auml;t des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst.
                Die Einwilligung ist jederzeit widerrufbar.</p>
                <br />
                <h4>Auftragsverarbeitung</h4>
                <br />
                <p>Wir haben einen Vertrag &uuml;ber Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen.
                Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gew&auml;hrleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>
                <br />
                <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
                <br />
                <h3>3.1. Datenschutz</h3>
                <br />
                <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr ernst.
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.</p>
                <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                Personenbezogene Daten sind Daten, mit denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.
                Die vorliegende Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir erheben und wof&uuml;r wir sie nutzen.
                Sie erl&auml;utert auch, wie und zu welchem Zweck das geschieht.</p>
                <p>Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken aufweisen kann.
                Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht m&ouml;glich.</p>
                <br />
                <h3>3.2. Speicherdauer</h3>
                <br />
                <p>Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck f&uuml;r die Datenverarbeitung entf&auml;llt.
                Wenn Sie ein berechtigtes L&ouml;schersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gel&ouml;scht, sofern wir keine anderen rechtlich zul&auml;ssigen Gr&uuml;nde f&uuml;r die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die L&ouml;schung nach Fortfall dieser Gr&uuml;nde.</p>
                <br />
                <h3>3.3. Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
                <br />
                <p>Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden.
                Im Falle einer ausdr&uuml;cklichen Einwilligung in die &Uuml;bertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO.
                Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endger&auml;t (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zus&auml;tzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
                Sind Ihre Daten zur Vertragserf&uuml;llung oder zur Durchf&uuml;hrung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO.
                Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erf&uuml;llung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
                Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.
                &Uuml;ber die jeweils im Einzelfall einschl&auml;gigen Rechtsgrundlagen wird in den folgenden Abs&auml;tzen dieser Datenschutzerkl&auml;rung informiert.</p>
                <br />
                <h3>3.4. Empf&auml;nger von personenbezogenen Daten</h3>
                <br />
                <p>Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserf&uuml;llung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbeh&ouml;rden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt.
                Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines g&uuml;ltigen Vertrags &uuml;ber Auftragsverarbeitung weiter.
                Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag &uuml;ber gemeinsame Verarbeitung geschlossen.</p>
                <br />
                <h3>3.5. Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <br />
                <p>Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer ausdr&uuml;cklichen Einwilligung m&ouml;glich.
                Sie k&ouml;nnen eine bereits erteilte Einwilligung jederzeit widerrufen.
                Die Rechtm&auml;ßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.</p>
                <br />
                <h3>3.6. Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
                <br />
                <p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GR&Uuml;NDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH F&Uuml;R EIN AUF DIESE BESTIMMUNGEN GEST&Uuml;TZTES PROFILING.
                DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKL&Auml;RUNG.
                WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR K&Ouml;NNEN ZWINGENDE SCHUTZW&Uuml;RDIGE GR&Uuml;NDE F&Uuml;R DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN &Uuml;BERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUS&Uuml;BUNG ODER VERTEIDIGUNG VON RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>
                <p>WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT.
                WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>
                <br />
                <h3>3.7. Beschwerderecht bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde</h3>
                <br />
                <p>Im Falle von Verst&ouml;ßen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbeh&ouml;rde, insbesondere in dem Mitgliedstaat ihres gew&ouml;hnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
                Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>
                <br />
                <h3>3.8. Recht auf Daten&uuml;bertragbarkeit</h3>
                <br />
                <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren Format aush&auml;ndigen zu lassen.
                Sofern Sie die direkte &Uuml;bertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
                <br />
                <h3>3.9. Auskunft, Berichtigung und L&ouml;schung</h3>
                <br />
                <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder L&ouml;schung dieser Daten.
                Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.</p>
                <br />
                <h3>3.10. Recht auf Einschr&auml;nkung der Verarbeitung</h3>
                <br />
                <p>Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Hierzu k&ouml;nnen Sie sich jederzeit an uns wenden. Das Recht auf Einschr&auml;nkung der Verarbeitung besteht in folgenden F&auml;llen:</p>
                <br />
                <ul>
                    <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, ben&ouml;tigen wir in der Regel Zeit, um dies zu &uuml;berpr&uuml;fen.
                    F&uuml;r die Dauer der Pr&uuml;fung haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                    <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtm&auml;ßig geschah/geschieht, k&ouml;nnen Sie statt der L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung verlangen.</li>
                    <li>Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie sie jedoch zur Aus&uuml;bung, Verteidigung oder Geltendmachung von Rechtsanspr&uuml;chen ben&ouml;tigen, haben Sie das Recht, statt der L&ouml;schung die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                    <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abw&auml;gung zwischen Ihren und unseren Interessen vorgenommen werden.
                    Solange noch nicht feststeht, wessen Interessen &uuml;berwiegen, haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                </ul>
                <br />
                <p>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschr&auml;nkt haben, d&uuml;rfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden eines wichtigen &ouml;ffentlichen Interesses der Europ&auml;ischen Union oder eines Mitgliedstaats verarbeitet werden.</p>
                <br />
                <h3>3.11. SSL- bzw. TLS-Verschl&uuml;sselung</h3>
                <br />
                <p>Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS- Verschl&uuml;sselung.
                Eine verschl&uuml;sselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
                <p>Wenn die SSL- bzw. TLS-Verschl&uuml;sselung aktiviert ist, k&ouml;nnen die Daten, die Sie an uns &uuml;bermitteln, nicht von Dritten mitgelesen werden.</p>
                <br />
                <h3>3.12. Widerspruch gegen Werbe-E-Mails</h3>
                <br />
                <p>Der Nutzung von im Rahmen der Impressumspflicht ver&ouml;ffentlichten Kontaktdaten zur &Uuml;bersendung von nicht ausdr&uuml;cklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen.
                Die Betreiber der Seiten behalten sich ausdr&uuml;cklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.</p>
                <br />
                <h2>4. Datenerfassung auf dieser Website</h2>
                <br />
                <h3>4.1. Cookies</h3>
                <br />
                <p>Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endger&auml;t keinen Schaden an.
                Sie werden entweder vor&uuml;bergehend f&uuml;r die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endger&auml;t gespeichert.
                Session-Cookies werden nach Ende Ihres Besuchs automatisch gel&ouml;scht. Permanente Cookies bleiben auf Ihrem Endger&auml;t gespeichert, bis Sie diese selbst l&ouml;schen oder eine automatische L&ouml;schung durch Ihren Webbrowser erfolgt.</p>
                <p>Cookies k&ouml;nnen von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies erm&ouml;glichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).</p>
                <p>Cookies haben verschiedene Funktionen.
                Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren w&uuml;rden (z. B. die Warenkorbfunktion oder die Anzeige von Videos).
                Andere Cookies k&ouml;nnen zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.</p>
                <p>Cookies, die zur Durchf&uuml;hrung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erw&uuml;nschter Funktionen (z. B. f&uuml;r eine Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird.</p>
                <p>Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste.
                Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.</p>
                <p>Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie &uuml;ber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies f&uuml;r bestimmte F&auml;lle oder generell ausschließen sowie das automatische L&ouml;schen der Cookies beim Schließen des Browsers aktivieren.
                Bei der Deaktivierung von Cookies kann die Funktionalit&auml;t dieser Website eingeschr&auml;nkt sein.</p>
                <br />
                <p>Folgende Cookies werden gespeichert:</p>
                <br />
                <ul>
                    <li>Session Cookies zur sicheren Kommunikation der Website mit Drittanbietern (z.B. Twitch)</li>
                    <li>Cookies zur Authentifizierung des Nutzers</li>
                </ul>
                <br />
                <h3>4.2. E-Mail-Adresse</h3>
                <br />
                <p>Die Erfassung und Speicherung Ihrer E-Mail-Adresse erfolgt nicht automatisiert, sondern ausschließlich manuell und nur mit Ihrer ausdr&uuml;cklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
                Die E-Mail-Adresse wird ben&ouml;tigt, um einen reibungslosen Anmeldeprozess sicherzustellen.</p>
                <br />
                <h3>4.3. Server-Logfiles</h3>
                <br />
                <p>Ihre IP-Adresse wird anonymisiert in unseren Server-Logfiles gespeichert, um sicherheitsrelevante Ereignisse zu protokollieren und die Systemstabilit&auml;t sicherzustellen.
                Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses gem&auml;ß Art. 6 Abs. 1 lit. f DSGVO, die Integrit&auml;t, Verf&uuml;gbarkeit und Sicherheit unserer informationstechnischen Systeme zu gew&auml;hrleisten.
                Eine Zusammenf&uuml;hrung dieser Daten mit anderen personenbezogenen Informationen erfolgt nicht. Die Daten werden regelm&auml;ßig gel&ouml;scht, sofern sie nicht zur Aufkl&auml;rung sicherheitsrelevanter Vorf&auml;lle erforderlich sind.</p>
            </div>
            <Footer />
        </div>
    );
}

export default Impressum;
