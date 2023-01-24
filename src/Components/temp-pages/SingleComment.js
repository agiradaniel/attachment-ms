import React from "react";
import profile1 from "./images/Passport photo.jpg";
import 'semantic-ui-css/semantic.min.css';

const SingleComment = (props) =>{
    return(

        <div className="comment">
                        <a href="/" className="avatar">
                           { <img src={props.picture} alt="My profile"/>}
                        </a>
                    
                        <div className="content">
                            
                            <a href="/" className="author">
                                {props.name}
                            </a>
                        
                            <div className="metadata">
                                <span className="date">
                                    {props.date}
                                </span>
                            </div>
                            <div className="text">
                                {props.comment}
                            </div>
                        </div>    
        </div>
    );
};

export default SingleComment;