import { useState, useEffect } from 'react';
import AuthenticationContext from './context/AuthenticationContext.tsx';
import Header from './components/Header/Header.jsx';
import Section from './components/Section/Section.jsx';

function App() {
  const [hasValidAuthentication, setAuthenticationStatus] = useState(false);
  
  useEffect(() => {
      (async () => {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/authenticate`, { credentials: "include" });
          setAuthenticationStatus(response.ok);
      })();
  }, []);

  return(
    <>
      <AuthenticationContext.Provider value = {{ isAuthenticated: hasValidAuthentication }}>
        <Header />
        <Section />
      </AuthenticationContext.Provider>
    </>
  );
}

export default App