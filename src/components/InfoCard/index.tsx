import * as React from 'react'

const InfoCard: React.SFC<{}> = (props) => {
    const infoCardStyle: React.CSSProperties = {
        position: 'fixed',
        width: '300px',
        height: '150px',
        top: '10px',
        right: '10px',
        backgroundColor: 'white'
    }
    return (
        <div className="info-card" style={infoCardStyle}/>
    )
}

export default InfoCard