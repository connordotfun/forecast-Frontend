import * as React from 'react'
import { MessageStore } from '../../stores/messageStore';
import { observer, inject } from 'mobx-react';

import InfoCard from '../../components/InfoCard'

import './index.css'
import logo from '../../assets/logo.png'
import { observable } from 'mobx';

interface SidebarProps {
    messageStore?: MessageStore
}

@inject('messageStore')
@observer
class Sidebar extends React.Component<SidebarProps> {
    @observable cards: React.ReactNode[]

    componentWillReact() {
        const messages = this.props.messageStore ? this.props.messageStore.$latestMessages : false
        if (messages) {
            let tempCards: React.ReactNode[] = []
            messages.forEach(
                (region, id) => (
                    tempCards.push(<InfoCard key={id} data={region} />)
                )
            )
            this.cards = tempCards
        }
    }

    render() {
        let availableRegions: number = 0
        if (this.props.messageStore) {
            availableRegions = this.props.messageStore.$latestMessages.size
        }
        return(
            <div className="sidebar">
                <img src={logo} alt="FORECAST" className="branding"/>
                <div className="region-cards" key={availableRegions}>
                    {this.cards}
                </div>
            </div>
        )
    }
}

export default Sidebar