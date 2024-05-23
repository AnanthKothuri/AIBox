import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Colors from '../assets/Colors';
import logo from '../assets/logo-no-background.svg'

function NavigationBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" style={{backgroundColor: Colors.light_pink, height: 60}}>
        <Container style={{flexDirection: 'row', display: 'flex', alignItems: 'center', marginLeft: 50, marginRight: 50}}>
          <Navbar.Brand href="/" style={{marginTop: -28}}>
            <img
              alt="ResearchRAG logo"
              src={logo}
              width="120"
              height="120"
            //   className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          {/* <p style={{fontFamily: 'Jaldi', fontSize: 18, marginLeft: 10}}>ResearchRAG</p> */}

          <div style={{flexDirection: 'row', display: 'flex', flexGrow: 1}}></div>
          <p style={{fontFamily: 'Jaldi', fontSize: 18, marginTop: -15}}>Ananth Kothuri</p>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;