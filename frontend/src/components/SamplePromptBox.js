import Colors from "../assets/Colors";


export default function SamplePromptBox({text}) {
    return (
        // <div style={{width: "15%", minWidth: 100, height: 100, backgroundColor: Colors.light_gray, borderRadius: 10}}>
            <p style={{fontFamily: "Jaldi", fontSize: 16, wordWrap: 'normal', color: Colors.dark_gray, padding: 20, textAlign: 'left',
                        width: "15%", minWidth: 100, marginTop: 10, marginBottom: 10, 
                        backgroundColor: Colors.light_gray, borderRadius: 15}}>
                {text}</p>
        // </div>
    )
}