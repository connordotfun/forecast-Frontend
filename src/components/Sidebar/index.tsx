import * as React from 'react'
// import Message from '../../models/Message';
import { MessageStore } from '../../stores/messageStore';
import { observer, inject } from 'mobx-react';

import './index.css'
import logo from '../../assets/logo.png'

interface SidebarProps {
    messageStore?: MessageStore
}

@inject('messageStore')
@observer
class Sidebar extends React.Component<SidebarProps> {
    render() {
        return(
            <div className="sidebar">
                <img src={logo} alt="FORECAST" className="branding"/>
            </div>
        )
    }
}

export default Sidebar