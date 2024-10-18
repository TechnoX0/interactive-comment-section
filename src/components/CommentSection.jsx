import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

function CommentSection({ commentData }) {
    const [comment, setComment] = useState(commentData);
    const [replyCards, setReplyCards] = useState(null);

    const renderReplies = () => {
        const cards = comment.replies.map((reply) => {
            return (
                <CommentCard
                    comment={reply}
                    key={reply.id}
                    callback={setComment}
                />
            );
        });

        return cards;
    };

    useEffect(() => {
        const cards = renderReplies();
        setReplyCards(cards || []);
    }, [comment]);

    return (
        <div key={comment.id} className="flex flex-col gap-4">
            <div>
                <CommentCard comment={comment} callback={setComment} />
            </div>
            {comment.replies.length > 0 && (
                <div className="flex">
                    <div className="w-[2px] bg-light-gray mx-10"></div>
                    <div className="flex flex-col gap-4 w-full">
                        {replyCards}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommentSection;
