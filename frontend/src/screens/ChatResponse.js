import { useState, useEffect } from "react";
// import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { TypeAnimation } from 'react-type-animation';
import Microlink from "@microlink/react";
import Colors from "../assets/Colors";
import Card from 'react-bootstrap/Card';
import PDFPage from "../components/PDFPage";

export default function FullChatList({dialogue}) {
  return (
    <div style={{ scrollbarWidth: 'none', overflowY: 'scroll', height: '80vh'}}>
      {dialogue.map((item, index) => (
          item.type === 'bot' ? (
            <ChatResponse response={item.body} key={index}/>
          ) : (
            <UserQuery query={item.body} key={index} />
          )
      ))}
    </div>
  )
}

function UserQuery({query}) {
  return (
    <div style={{width: '100%'}}>
      <TypeAnimation sequence={[{query}, 1000]} wrapper="span" speed={100}
      style={{fontFamily: "Jaldi", fontSize: 18, margin: '0 50px', textAlign: 'left'}} />
          {/* <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'We produce food for Mice',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'We produce food for Hamsters',
        1000,
        'We produce food for Guinea Pigs',
        1000,
        'We produce food for Chinchillas',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    /> */}
    </div>
  )
}

function ChatResponse({ response }) {
  const [mappings, setMappings] = useState([]);

  useEffect(() => {
    const arr = [];
    response.sections.forEach((s) => {
      let idx = 0;
      let added = false;
      response.papers.forEach((p) => {
        if (!added && (s.body.includes(p.title) || s.body.includes(p.link))) {
          arr.push(idx);
          added = true;
        }
        idx += 1;
      });
      if (!added) {
        arr.push(null);
      }
    });
    setMappings(arr);
  }, [response]);

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div style={{
      flexDirection: 'column',
      width: '60%',
      margin: 'auto',
      textAlign: 'left',
      marginBottom: 50,
      marginTop: 50,
    }}>
      {/* title */}
      <p style={{ fontFamily: 'Jaldi', fontSize: 22, textAlign: 'center' }}>{response.title}</p>
      {/* <LinkPreview url='https://en.wikipedia.org/wiki/Dog' width='400px' /> */}
      {/* <Microlink url="https://arxiv.org/pdf/2301.11325" /> */}
      {/* <PDFPage link={"https://arxiv.org/pdf/2301.11325" } /> */}

      {/* sections */}
      {response.sections.map((section, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
          {/* {mappings[index] !== null && index % 2 === 1 && mappings[index] < response.papers.length && (
            <LinkPreview url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' width='400px' />
          )} */}
          <div>

            <p style={{ fontFamily: 'Jaldi-Bold', fontSize: 20 }}>{section.subtitle}</p>
            <p style={{ fontFamily: 'Jaldi', fontSize: 18 }}>{section.body}</p>
          </div>
          {/* {mappings[index] !== null && index % 2 === 0 && mappings[index] < response.papers.length && (
            <LinkPreview url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' width='400px' />
          )} */}
        </div>
      ))}

      {/* papers */}
      <p style={{ fontFamily: 'Jaldi', fontSize: 20, textAlign: 'center', marginTop: 40}}>Papers</p>
      <div style={{height: 2, color: Colors.gray, backgroundColor: Colors.gray, width: '80%', margin: '0px auto 0px', opacity: 1}}></div>

      <div style={{flexDirection: 'row', display: 'flex', textAlign: 'left', margin: 'auto', justifyContent: 'center'}}>
        {response.papers.map((paper, index) => (
          <Card style={{ width: '18rem', margin: 20 }}>
            {/* <Card.Img variant="top" src=""/> */}
            <Card.Body>
              <Card.Title style={{fontFamily: "Jaldi", fontSize: 15, color: Colors.dark_gray}}>Paper {index + 1}</Card.Title>
              <Card.Text style={{fontFamily: "Jaldi", fontSize: 20}}>
                {paper.title}
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
              <button onClick={() => openLink(paper.link)} 
                style={{borderWidth: 0, backgroundColor: 'transparent', color: Colors.black, fontFamily: "Jaldi", fontSize: 15, color: 'blue'}}>
                  Learn More
              </button>
            </Card.Body>
          </Card>
          // <div style={{padding: 15, margin: 10, backgroundColor: Colors.light_gray, borderRadius: 10, width: 150, height: 150, textOverflow: 'ellipsis'}}>
          //   <p style={{textOverflow: 'ellipsis', fontFamily: 'Jaldi', fontSize: 18, maxHeight: 100, overflowY: 'scroll'}}>{paper.title}</p>
            // <button onClick={() => openLink(paper.link)} 
            // style={{borderWidth: 0, backgroundColor: 'transparent', color: Colors.black, fontFamily: "Jaldi", fontSize: 15, color: 'blue'}}>
            //   Learn More</button>
          // </div>
        ))}
      </div>

    </div>
  );
}
