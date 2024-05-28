import {useState } from "react"
import Colors from "../assets/Colors";
import SamplePromptBox from "../components/SamplePromptBox";
import CustomSidebar from "../components/CustomSidebar";
import FullChatList from "./ChatResponse";
import PuffLoader from "react-spinners/PuffLoader";
import { FaPaperPlane } from "react-icons/fa";
import FadeComponent from "../components/FadeComponent";


export default function ResearchRAGScreen() {
    const [dialogue, setDialogue] = useState([])
    const [query, setQuery] = useState("")
    const [present, setPresent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

      async function enter() {
        setLoading(true)
        // checking input
        if (query.length < 15) {
          setError("Please enter a longer query")
          setLoading(false)
          return
        }
        const d = {
          type: 'user',
          body: query
        }
        setDialogue([...dialogue, d])
        setPresent(true)
        setError("Asking GPT . . . ")
        await askGPT(query)
        setLoading(false)
      }

      const queryEntered = (event) => {
        if (event.key === 'Enter') {
          enter()
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
          setError(response.error)
          throw new Error('Network response was had an error');
        }
        const result = await response.json()
        setError('Recieved response');
        try {
          const parsedJson = JSON.parse(result);
          // setGptResponse(parsedJson)
          const bot = {
            type: 'bot',
            body: parsedJson
          }
          setDialogue([...dialogue, bot])
        } catch (e) {
          setError('Error getting response: invalid JSON. Please try again.');
          // setGptResponse(null);
        }
      }

    return (
      <div style={{ position: 'relative' }}>
        <CustomSidebar dialogue={dialogue}/>

        <div style={{ position: 'relative', zIndex: 1 }}>
            {/* title */}
            {/* {!present && ( */}
            <FadeComponent fade={present} fadeOut={true} delay={0}>
              <div>
                <div style={{ opacity: 1, paddingTop: '10%'}}>
                    <p style={{fontFamily: 'Jaldi', fontSize: 60, margin: 0, padding: 0}}>ResearchRAG</p>
                </div>
                {/* line */}
                <div style={{height: 2, color: Colors.gray, backgroundColor: Colors.gray, width: '50%', margin: '0px auto 25px', opacity: 1}}></div>
              </div>
            </FadeComponent>
            {/* )} */}
            {present && (
              <FullChatList dialogue={dialogue} />
            )}

            {/* query bar */}
            <div>
                <p style={{fontFamily: "Jaldi", fontSize: 12}}>{error}</p>
                <div style={{alignItems: "center", flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                  <input type="text" placeholder="Query research papers . . . " value={query} onKeyUp={queryEntered} onChange={updateQuery}
                        style={{backgroundColor: Colors.light_pink, borderRadius: 25, height: 50, 
                        borderWidth: 0, paddingLeft: 30, paddingRight: 30, width: '50%', maxWidth: '50%',
                        color: Colors.black, fontSize: 18, fontFamily: "Jaldi"}}
                        disabled={loading}/>
                          <PuffLoader
                            color={Colors.black}
                            loading={loading}
                            cssOverride={{justifySelf: 'center', alignSelf: 'center', margin: 10}}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        {!loading && (
                          <button onClick={enter} style={{
                            borderRadius: '50%', 
                            backgroundColor: Colors.white,
                            padding: 10, 
                            borderColor: 'transparent', 
                            margin: 10, 
                            color: Colors.black}}>
                            <FaPaperPlane/>
                          </button>
                        )}
                </div>
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
      </div>
    )
}