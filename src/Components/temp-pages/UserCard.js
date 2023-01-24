import React from "react";
import 'semantic-ui-css/semantic.min.css';

const UserCard= (props) => {
    return(
        <div className = "ui card">
            <div className = "content">
                <div className="header">Featured</div>
                <div className="description">{props.children}</div>
            </div>
            <div className="ui bottom button">
                <i className="add icon"></i> Add Friend
            </div>

        </div>

    );
}

export default UserCard;