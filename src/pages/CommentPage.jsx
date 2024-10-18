import { createContext, useEffect, useState } from "react";
import { generateRandomID } from "../Helper";
import { getCurrentUser, getDatabase, postNewComment } from "../Database";
import Header from "../components/Header";
import CommentArea from "../components/CommentArea";
import CommentSection from "../components/CommentSection";

function CommentPage() {
    const [database, setDatabase] = useState(getDatabase());
    const [commentSections, setCommentSections] = useState(null);

    useEffect(() => {
        if (database.comments) {
            setCommentSections(
                database.comments.map((comment) => {
                    return (
                        <CommentSection
                            commentData={comment}
                            key={comment.id}
                        />
                    );
                })
            );
        }
    }, [database]);

    function postComment(content) {
        const post = {
            id: generateRandomID(12),
            content: content,
            createdAt: Date.now,
            likers: [],
            user: getCurrentUser(),
            replies: [],
        };

        postNewComment(post);
        setDatabase(getDatabase());
    }

    return (
        <div className="bg-very-light-gray box-border">
            <Header />
            <main className="flex flex-col items-center min-h-screen py-12">
                <div className="flex flex-col gap-4 w-full max-w-3xl min-h-full">
                    <div className="flex flex-col gap-4">
                        {commentSections && commentSections}
                    </div>
                    <CommentArea callback={postComment} />
                </div>
            </main>
        </div>
    );
}

export default CommentPage;
