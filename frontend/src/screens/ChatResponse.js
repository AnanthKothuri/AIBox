import Colors from "../assets/Colors";
import Markdown from 'react-markdown'

export default function ChatResponse({r}) {
    const response = {
        title: "LLMs and their use in Sports Medicine",
        sections: [
            {
                subtitle: "Paper number 1",
                body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            {
                subtitle: "Paper number 2, this is a longer title",
                body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,"
            }
        ],
        papers: [
            {
                title: "LLMs in use for coaching and sports strategy",
                link: "https://google.com"
            },
            {
                title: "The inner dive into LLMs and their relationship with footbal playing tactics",
                link: "https://google.com"
            }
        ]
    }
    return (
        <div style={{flexDirection: 'column', height: '80vh', width: '60%', margin: 'auto', overflow: 'scroll', scrollbarWidth: 'none',
                    textAlign: 'left'}}>
            <p style={{fontFamily: 'Jaldi', fontSize: 22}}>{response.title}</p>
        </div>
    )
}