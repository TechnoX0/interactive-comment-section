import React, { useContext, useEffect, useRef, useState } from "react";
import {
    getCurrentUser,
    updateLikers,
    deleteComment,
    postReplyComment,
    updateComment,
    upvoteComment,
    downvoteComment,
} from "../Database";
import { generateRandomID } from "../Helper";
import CommentArea from "./CommentArea";

function CommentCard({ comment, callback = () => {} }) {
    const commentId = comment.id;

    const [content, setContent] = useState(comment.content);
    const [likers, setLikers] = useState(comment.likers);

    const [replyEnabled, setReplyEnabled] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);

    useEffect(() => {
        updateLikers(comment.id, likers);
        buttons();
    }, [content, likers, replyEnabled, editEnabled]);

    const editComment = (content) => {
        updateComment(comment.id, content);
        setEditEnabled(false);
        setContent(content);
    };

    const replyComment = (content) => {
        const reply = {
            id: generateRandomID(12),
            content: content,
            createdAt: Date.now,
            likers: [],
            replies: [],
            user: getCurrentUser(),
            replyingTo: comment.user.username,
        };

        setReplyEnabled(!replyEnabled);
        const newReplies = postReplyComment(comment.id, reply);
        callback(newReplies);
    };

    const changeVote = (type) => {
        let newLikers = [];

        switch (type) {
            case "upvote":
                newLikers = upvoteComment(commentId);
                break;
            case "downvote":
                newLikers = downvoteComment(commentId);
                break;
        }

        console.log(newLikers);

        setLikers(newLikers);
    };

    const buttons = () => {
        const currentUser = getCurrentUser();

        if (currentUser.id == comment.user.id) {
            return (
                <div className="flex gap-4">
                    <button
                        className="flex items-center font-bold gap-2 text-soft-red"
                        onClick={() => {
                            deleteComment(comment.id);
                            window.location.reload();
                        }}
                    >
                        <img
                            src="../assets/images/icons/icon-delete.svg"
                            alt=""
                        />
                        Delete
                    </button>
                    <button
                        className="flex items-center font-bold gap-2 text-moderate-blue"
                        onClick={() => {
                            setEditEnabled(true);
                        }}
                    >
                        <img
                            src="../assets/images/icons/icon-edit.svg"
                            alt=""
                        />
                        Edit
                    </button>
                </div>
            );
        } else {
            return (
                <button
                    className="flex items-center font-bold gap-2 text-moderate-blue"
                    onClick={() => setReplyEnabled(true)}
                >
                    <img
                        src="../assets/images/icons/icon-reply.svg"
                        alt="reply"
                    />
                    <p>Reply</p>
                </button>
            );
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex w-full bg-white p-6 rounded-md">
                <aside className="flex flex-col w-9 h-min text-center bg-light-gray mr-6 rounded-md">
                    <button
                        className="grid w-9 h-9 place-items-center"
                        onClick={() => {
                            changeVote("upvote");
                        }}
                    >
                        <img
                            src="../assets/images/icons/icon-plus.svg"
                            className="w-2/6"
                        />
                    </button>
                    <p className="font-bold text-moderate-blue">
                        {likers.length}
                    </p>
                    <button
                        className="grid w-9 h-9 place-items-center"
                        onClick={() => {
                            changeVote("downvote");
                        }}
                    >
                        <img
                            src="../assets/images/icons/icon-minus.svg"
                            className="w-2/6"
                        />
                    </button>
                </aside>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <img
                                src={comment.user.image}
                                alt="none"
                                className="w-8 h-8"
                            />
                            <div className="flex gap-3 items-center">
                                <p className="text-grayish-blue font-bold">
                                    {comment.user.username}
                                </p>
                                <p>{comment.createdAt}</p>
                            </div>
                        </div>
                        <div className="flex items-center">{buttons()}</div>
                    </div>
                    <div>
                        <p>
                            {comment.replyingTo && (
                                <span className="font-bold text-moderate-blue">{`@${comment.replyingTo}`}</span>
                            )}{" "}
                            {content}
                        </p>
                    </div>
                </div>
            </div>
            {(replyEnabled && (
                <CommentArea callback={replyComment} type="reply" />
            )) ||
                (editEnabled && (
                    <CommentArea
                        callback={editComment}
                        type="edit"
                        baseText={content}
                    />
                ))}
        </div>
    );
}

export default CommentCard;
