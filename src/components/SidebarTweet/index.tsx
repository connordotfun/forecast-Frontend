import * as React from 'react'
import { Tweet } from 'react-twitter-widgets';

import './index.css'

interface SidebarTweetProps {
    tid: string
}

const SidebarTweet: React.SFC<SidebarTweetProps> = (props) => {
    return (
        <div className="sidebar-tweet">
            <Tweet
                tweetId={props.tid}
                options={{
                        conversation: 'none',
                        cards: 'hidden',
                        theme: 'dark'
                    }}
            />
        </div>
    )
}

export default SidebarTweet