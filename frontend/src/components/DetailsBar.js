import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Colors from '../assets/Colors';
import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

function DetailsBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" style={{backgroundColor: Colors.white, height: 60}}>
        <Container style={{flexDirection: 'row', display: 'flex', alignItems: 'center', marginLeft: 50, marginRight: 50}}>

          <div style={{flexDirection: 'row', display: 'flex', flexGrow: 1}}></div>
            <Navbar.Collapse id="basic-navbar-nav">
            <div style={{color: Colors.black, flexDirection: 'row', display: 'flex'}}>
              <Dropdown title={"Number of Papers"} items={["300"]} />
              <Dropdown title={"Categories"} items={["AI"]} />
              <Dropdown title={"Sources"} items={["arxiv.org"]} />
              <Dropdown title={"Date Range"} items={["05-16-2024", "05-20-2024"]} />
            </div>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

function Dropdown({title, items}) {
    const [isCollapsed, setCollapsed] = useState(true)
    const [isHovered, setHovered] = useState(false)

    function mouseEntered() {
        setHovered(true)
    }
    function mouseLeft() {
        setHovered(false)
    }

    return (
        <div style={{fontFamily: "Jaldi", marginLeft: 8, marginRight: 8, zIndex: 3}}>
            <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                <p onClick={() => {setCollapsed(!isCollapsed)}} style={{cursor: isHovered ? 'pointer': 'default', fontSize: 18, margin: 5}}
                    onMouseEnter={mouseEntered} onMouseLeave={mouseLeft}
                >{title}</p>
                <FaChevronDown width={15} onClick={() => {setCollapsed(!isCollapsed)}}/>
            </div>
            {!isCollapsed && (
                <div>
                    {items.map((item, index) => (
                        <p key={index} style={{padding: -10, margin: 0, fontSize: 15}}>{item}</p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DetailsBar;