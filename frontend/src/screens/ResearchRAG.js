import { useEffect, useState, useRef } from "react"
import Colors from "../assets/Colors";
import {Row, Col} from 'react-bootstrap'
import SamplePromptBox from "../components/SamplePromptBox";
import ChatResponse from "./ChatResponse";

export default function ResearchRAGScreen() {
    const [dialogue, setDialogue] = useState([])
    const [query, setQuery] = useState("")
    const [gptResponse, setGptResponse] = useState(null)
    const [present, setPresent] = useState(false)
    const [error, setError] = useState("")

      const queryEntered = (event) => {
        if (event.key === 'Enter') {
          const q = event.target.value
          setQuery(q);
          // setError("Asking GPT . . . ")
          // askGPT(q)
          setPresent(true)  // FOR TESTING OTHER PAGE
        }
      };

      const updateQuery = (event) => {
        const q = event.target.value
        setQuery(q);
      }

      async function askGPT(queryString) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const params = { query: queryString};
        const string = new URLSearchParams(params).toString();
        const fullUrl = `${apiUrl}?${string}`;
    
        const response = await fetch(fullUrl);
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was had an error');
        }
        const result = await response.json()
        try {
          const parsedJson = JSON.parse(result);
          setGptResponse(parsedJson)
          setError('');
          setPresent(true)
        } catch (e) {
          setError('Error getting response: invalid JSON. Please try again.');
          setGptResponse(null);
        }
      }

    return (
      <div>
          {/* title */}
          {!present && (
            <div>
              <div style={{ opacity: 1, marginTop: '15%'}}>
                  <p style={{fontFamily: 'Jaldi', fontSize: 60, margin: 0, padding: 0}}>ResearchRAG</p>
              </div>
              {/* line */}
              <div style={{height: 2, color: Colors.gray, backgroundColor: Colors.gray, width: '50%', margin: '0px auto 25px', opacity: 1}}></div>
            </div>
          )}

          {present && (
            <ChatResponse r={gptResponse} />
          )}

          {/* query bar */}
          <div>
              <p style={{fontFamily: "Jaldi", fontSize: 12}}>{error}</p>
              <input type="text" placeholder="Query research papers . . . " value={query} onKeyUp={queryEntered} onChange={updateQuery}
                      style={{backgroundColor: Colors.light_pink, borderRadius: 25, height: 50, 
                      borderWidth: 0, paddingLeft: 30, paddingRight: 30, width: '30%', maxWidth: '50%',
                      color: Colors.black, fontSize: 18, fontFamily: "Jaldi"}}/>
          </div>

          {!present && (
            <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <p style={{fontFamily: "Jaldi", fontSize: 20, marginTop: 100}}>Sample Queries</p>

              <div style={{flexDirection: 'row', flex: 1, display: 'flex', justifyContent: 'center'}}>
                <SamplePromptBox text={"Tell me about the latest research developments with LLMs in sports training . . ."}/>
                <div style={{width: 20}}/>
                <SamplePromptBox text={"I have an idea about _____. What research has already been done about this topic?"}/>
              </div>

            </div>
          )}

          <div style={{height: 30}}/>
      </div>
    )
}