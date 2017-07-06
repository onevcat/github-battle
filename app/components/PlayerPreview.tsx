import * as React from 'react';

interface PlayerPreviewProps {
    username: string
    avatar: string
}

export class PlayerPreview extends React.Component<PlayerPreviewProps, {}> {
    render() {
        return (
            <div>
                <div className='column'>
                    <img className='avatar' src={this.props.avatar} />
                    <h2 className='username'>@{this.props.username}</h2>
                </div>
                {this.props.children}
            </div>
        )
    }
}
