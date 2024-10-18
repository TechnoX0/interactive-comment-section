import { generateRandomID } from "./Helper";

const databaseName = "commentdb";

const createAccount = (user, pass, img) => {
    const userID = generateRandomID(8);
    return {
        id: userID,
        username: user,
        password: pass,
        image: img,
    };
};

const initDatabase = () => {
    const account01 = createAccount(
        "amyrobson",
        "passone",
        "../assets/images/avatars/image-amyrobson.png"
    );

    const account02 = createAccount(
        "juliusomo",
        "passtwo",
        "../assets/images/avatars/image-juliusomo.png"
    );

    const account03 = createAccount(
        "maxblagun",
        "passthree",
        "../assets/images/avatars/image-maxblagun.png"
    );

    const account04 = createAccount(
        "ramsesmiron",
        "passfour",
        "../assets/images/avatars/image-ramsesmiron.png"
    );

    const data = {
        accounts: [account01, account02, account03, account04],
        comments: [],
        currentUser: {},
    };

    setDatabase(data);
};

const getDatabase = () => {
    return JSON.parse(localStorage.getItem(databaseName));
};

const setDatabase = (value) => {
    localStorage.setItem(databaseName, JSON.stringify(value));
};

const getCurrentUser = () => {
    return getDatabase().currentUser;
};

const setCurrentUser = (account) => {
    const db = getDatabase();
    db.currentUser = account;
    setDatabase(db);
};

const updateLikers = (id, updatedLikers) => {
    const db = getDatabase();

    for (const i in db.comments) {
        const comment = db.comments[i];

        if (comment.id == id) {
            comment.likers = updatedLikers;
            continue;
        }
    }

    setDatabase(db);
};

const postNewComment = (comment) => {
    const db = getDatabase();
    db.comments.push(comment);
    setDatabase(db);
};

const getComment = (commentId) => {
    const db = getDatabase();

    for (const comment of db.comments) {
        if (comment.id == commentId) {
            return comment;
        }

        for (const reply of comment.replies) {
            if (reply.id == commentId) {
                return reply;
            }
        }
    }
};

const setComment = (commentId, newComment) => {
    const db = getDatabase();

    for (const comment of db.comments) {
        if (comment.id == commentId) {
            db.comments = newComment;
            return;
        }

        for (const reply of comment.replies) {
            if (reply.id == commentId) {
                reply = newComment;
                return;
            }
        }
    }

    setDatabase(db);
};

const updateComment = (commentId, newContent) => {
    const db = getDatabase();

    for (const comment of db.comments) {
        for (const replies of comment.replies) {
            if (replies.id == commentId) {
                replies.content = newContent;
                setDatabase(db);
                return comment;
            }
        }
        if (comment.id == commentId) {
            comment.content = newContent;
            setDatabase(db);
            return comment;
        }
    }
};

const postReplyComment = (commentId, content) => {
    const db = getDatabase();

    for (const comment of db.comments) {
        if (comment.id == commentId) {
            comment.replies.push(content);
            setDatabase(db);
            return comment;
        }

        for (const reply of comment.replies) {
            if (reply.id == commentId) {
                comment.replies.push(content);
                setDatabase(db);
                return comment;
            }
        }
    }
};

const deleteComment = (commentId) => {
    const db = getDatabase();

    for (const commentIndex in db.comments) {
        const comment = db.comments[commentIndex];
        const replies = comment.replies;

        for (const replyIndex in replies) {
            const reply = replies[replyIndex];

            if (reply.id == commentId) {
                replies.splice(replyIndex, 1);
                setDatabase(db);
                return replies;
            }
        }

        if (comment.id == commentId) {
            db.comments.splice(commentIndex, 1);
            setDatabase(db);
            return db.comments;
        }
    }
};

const upvoteComment = (id) => {
    const userId = getCurrentUser().id;
    const comment = getComment(id);

    if (comment.user.id == userId || comment.likers.includes(userId))
        return comment.likers;

    comment.likers.push(userId);

    return comment.likers;
};

const downvoteComment = (id) => {
    const userId = getCurrentUser().id;
    const comment = getComment(id);

    if (comment.user.id == userId || !comment.likers.includes(userId))
        return comment.likers;

    const index = comment.likers.indexOf(userId);
    comment.likers.splice(index, 1);

    return comment.likers;
};

export {
    initDatabase,
    getDatabase,
    getCurrentUser,
    setCurrentUser,
    updateLikers,
    postNewComment,
    getComment,
    updateComment,
    postReplyComment,
    deleteComment,
    upvoteComment,
    downvoteComment,
};
