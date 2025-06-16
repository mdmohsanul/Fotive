import { useAppDispatch, useAppSelector } from "@/app/store";
import { fetchComments, updateComment } from "@/features/image/imageThunks";
import { useEffect, useState } from "react";

type CommentPanelProps = {
  showComments: boolean;
  setShowComments: (value: boolean) => void;
  imageId: string | undefined;
};
const CommentPanel = ({
  showComments,
  setShowComments,
  imageId,
}: CommentPanelProps) => {
  const dispatch = useAppDispatch();
  const [commentText, setCommentText] = useState("");
  const { comments } = useAppSelector((state) => state.image);

  useEffect(() => {
    dispatch(fetchComments(imageId));
  }, [dispatch, imageId]);
  console.log(comments);
  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    const comment = {
      comment: commentText,
    };
    try {
      await dispatch(updateComment({ imageId, comment })).unwrap();
      await dispatch(fetchComments(imageId));
      setCommentText(""); // Clear field after post
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg z-50 p-4 flex flex-col justify-between transform transition-transform duration-300 ${
          showComments ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Comments</h2>
            <button
              className="text-gray-600 hover:text-black"
              onClick={() => setShowComments(false)}
            >
              ✕
            </button>
          </div>

          {/* Comment list or placeholder */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="flex gap-3 items-start">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.email}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {comment.user?.userName}
                      </p>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Input Field + Post Button */}
        <div className="pt-4 border-t mt-4">
          <textarea
            rows={3}
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handlePostComment}
          >
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentPanel;
