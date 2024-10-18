import { useRef } from "react";
import { getCurrentUser } from "../Database";

function CommentArea({ callback, type = "comment", baseText = "" }) {
    const commentFieldRef = useRef(null);
    const currentUser = getCurrentUser();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-4 w-full p-6 bg-white rounded-md box-border self-end"
        >
            <img
                src={currentUser.image}
                alt="user image"
                className="w-10 h-10"
            />
            <textarea
                name="commentfield"
                id="commentfield"
                rows="4"
                maxLength={280}
                placeholder="Add a comment..."
                defaultValue={baseText}
                ref={commentFieldRef}
                className="px-6 py-2 resize-none w-full border-2 rounded-md focus:outline-moderate-blue"
                style={{ wrap: "hard" }}
            ></textarea>
            <button
                type="submit"
                className="h-min px-6 py-2 rounded-lg text-white bg-moderate-blue"
                onClick={() => {
                    callback(commentFieldRef.current.value);
                }}
            >
                {type.toUpperCase()}
            </button>
        </form>
    );
}

export default CommentArea;
