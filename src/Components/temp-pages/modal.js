import React from 'react'
import ReactDOM from 'react-dom'

const modal = (props) =>{

        return ReactDOM.createPortal(
            <div>
                <div>
                    <h1>I am a modal</h1>
                </div>
            </div>,
            document.querySelector('#modal')
        )

}

export default modal;