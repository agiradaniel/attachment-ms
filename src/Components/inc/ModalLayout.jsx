import React from 'react';
import ReactDOM from 'react-dom';
import "../../App.css";
import SettingsModal from './settingsModal';


const Modal = () =>{

        return ReactDOM.createPortal(
            <>
                <SettingsModal/>
            </>,
            document.querySelector('#settingsModal')
        )

}

export default Modal;