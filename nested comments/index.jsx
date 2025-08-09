import React, { useState } from "react";

export default function App() {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "This is the first comment",
      replies: [
        { id: 2, text: "This is a reply to the first comment", replies: [] },
      ],
    },
    { id: 3, text: "This is another top-level comment", replies: [] },
  ]);

  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const addReply = (parentId) => {
    if (!replyText.trim()) return;
    const newComments = addReplyRecursive(comments, parentId, replyText);
    setComments(newComments);
    setReplyText("");
    setReplyTo(null);
  };

  const addReplyRecursive = (commentList, parentId, text) => {
    return commentList.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, { id: Date.now(), text, replies: [] }],
        };
      }
      return {
        ...comment,
        replies: addReplyRecursive(comment.replies, parentId, text),
      };
    });
  };

  const Comment = ({ comment }) => (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div
        style={{
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p>{comment.text}</p>
        <button
          style={{ fontSize: "12px", cursor: "pointer" }}
          onClick={() => setReplyTo(comment.id)}
        >
          Reply
        </button>
      </div>

      {replyTo === comment.id && (
        <div style={{ marginTop: "5px" }}>
          <input
            type="text"
            placeholder="Type your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{ padding: "5px", width: "70%" }}
          />
          <button
            onClick={() => addReply(comment.id)}
            style={{
              padding: "5px 10px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          >
            Post
          </button>
        </div>
      )}

      {comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </div>
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Nested Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
