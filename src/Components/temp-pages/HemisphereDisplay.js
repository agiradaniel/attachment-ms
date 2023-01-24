import React from "react";
import ReactDOM from "react-dom";

const HemisphereDisplay = ({latitude}) => {
    

    const hemisphere = latitude > 0? 'Northern hemisphere':"Southern hemisphere"

    return(

        <div>
            {hemisphere}
        </div>

    );
/*
    if(latitude>0){
        return(

            <div>
                Northern hemisphere
            </div>
    
        );
    }
    else if(latitude<0){
        return(

            <div>
                Southern hemisphere
            </div>
    
        );
    }

 */   
}

export default HemisphereDisplay;