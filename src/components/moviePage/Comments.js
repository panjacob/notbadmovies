import React, {useState} from "react";
import Comment from "./Comment";
import {Button, Form} from "react-bootstrap"
import {UseInput} from "../search/Hooks";


export default function Comments(props) {
    const {movieid} = props
    const [commentText] = UseInput("");
    const [isReload, setReload] = useState(false);

    const getComments = () => {
        let currentComments = localStorage.getItem(movieid)
        if (currentComments === undefined || currentComments == null) return []
        else return  JSON.parse(currentComments)
    }

    const [allComments, setAllComments] = useState(getComments());

    const submit = () => {
        let currentComments = getComments()
        const newComment = [{value: commentText.value, date: Date.now(), user: "świrek12"}]
        currentComments.unshift(newComment)
        localStorage.setItem(movieid, JSON.stringify(currentComments))
        setReload(true)
    }


    React.useEffect(() => {
        setAllComments(getComments())
        setReload(false)
    }, [isReload])

    return (
        <>
            <h2 className={"mt-5 mb-2"}>Comments: </h2>
            <Form.Control {...commentText} as="textarea" rows={2}/>
            <Button variant={"dark"} onClick={submit}>Submit</Button>
            { !allComments.length < 1?
                allComments.map(comment => <Comment props={{username: comment[0].user, comment: comment[0].value}}/>)
                : <><h2 className={"text-center mt-2"}>Write first comment!</h2></>
            }
        </>
    );
}