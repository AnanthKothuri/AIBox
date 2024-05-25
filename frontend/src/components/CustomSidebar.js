import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Colors from '../assets/Colors';
import { useState } from 'react';

export default function CustomSidebar({dialogue}) {
    const [isCollapsed, setCollapsed] = useState(false)
    const openLink = (url) => {
        window.open(url, '_blank');
      };
    return (
        <Sidebar collapsed={isCollapsed} style={{zIndex: 1, textAlign: 'left'}} backgroundColor={Colors.white}>
            <Menu style={{paddingTop: 20, overflow: 'scroll'}}
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                    // only apply styles on first level elements of the tree
                    if (level === 1)
                        return {
                        color: Colors.dark_gray,
                        margin: 0,
                        };
                    },
                }}
            >

                {dialogue.length === 0 && (
                    <MenuItem style={{fontFamily: "Jaldi", fontSize: 16}}> Nothing here yet . . . </MenuItem>
                )}

                {dialogue.map((item, index) => (
                item.type === 'bot' ? (
                    <SubMenu label={item.body.title} defaultOpen={true} key={index} style={{fontFamily: 'Jaldi', fontSize: 18}}>
                        {item.body.papers.map((paper, index) => (
                            // <MenuItem  style={{fontFamily: "Jaldi", fontSize: 15}}>{paper.title}</MenuItem>
                            <MenuItem component={<p style={{fontFamily: "Jaldi", fontSize: 15}} onClick={() => {openLink(paper.link)}} />}> {paper.title}</MenuItem>
                        ))}
                    </SubMenu>
                ) : null
                ))}

                {/* <SubMenu label="Charts" defaultOpen={true}>
                <MenuItem> Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem> */}
            </Menu>
        </Sidebar>
    )
}