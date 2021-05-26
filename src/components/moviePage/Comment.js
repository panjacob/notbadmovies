import React from "react";

export default function Comment(props) {
    const {username, comment} = props.props
    return (
        <>
            <div className="card" >
                <div className="card-body">
                    <p className="font-weight-bold">{username}</p>
                    <p className="card-text">{comment}</p>
                </div>
            </div>
        </>
    );
}