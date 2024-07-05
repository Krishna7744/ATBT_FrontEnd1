import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { AuthContext } from "../../../../contexts/authContext/authContext";
import { formatDateandTime } from "../../../../utils/utils";

const CommentsView = ({
  comments,
  messagesEndRef,
  setIsCommentEditing,
  setNewComment,
  fileName,
  setFileName,
}) => {
  const { authState } = useContext(AuthContext);

  let fetcher = useFetcher();
  const attachmentStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
    margin: "10px",
  };
  const [commentCrudView, setCommentCrudView] = useState(null);
  const handleCommentCrudView = (id) => {
    setCommentCrudView(id === commentCrudView ? null : id);
  };
  const handleDeleteComment = (commentId) => {
    let UpdateData = {
      id: commentId,
      type: "DELETE_COMMENT",
    };
    console.log("UpdateData", UpdateData);
    try {
      fetcher.submit(UpdateData, {
        method: "DELETE",
        encType: "application/json",
      });
      setCommentCrudView(null);
    } catch (error) {
      console.log(error, "which error");
    }
  };
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCommentCrudView(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [displayAllComments, setDisplayAllComments] = useState(true);
  console.log("displayAllComments", displayAllComments);

  useEffect(() => {
    setDisplayAllComments(comments?.length <= 5);
  }, [comments]);
  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <div className="bg-[#f8fafc] ">
        <hr />
        {/* {comments?.length > 5 && (
          <p
            onClick={() => setDisplayAllComments((prev) => !prev)}
            className="text-sm p-3 text-end text-blue-500 hover:underline"
          > */}
        {/* {displayAllComments
              ? "Hide earlier comments"
              : comments.length - 5 + " more comments"} */}
        {comments?.length > 5 && (
          <p
            onClick={() => setDisplayAllComments((prev) => !prev)}
            className="text-sm p-3 text-end text-blue-500 hover:underline"
          >
            {displayAllComments
              ? "Hide earlier comments"
              : comments.length === 6
              ? "One more comment"
              : comments.length - 5 + " more comments"}
          </p>
        )}

        {Array.isArray(comments) &&
          comments.length > 0 &&
          comments?.map((comment, index) => {
            const getFileName = (url) => {
              const urlParts = url.split("/");
              const encodedFileName = urlParts[urlParts.length - 1];
              return decodeURIComponent(encodedFileName);
            };
            let fileName;
            if (comment?.file) {
              fileName = getFileName(comment?.file);
            }
            let createdAt = formatDateandTime(comment.createdAt);
            return (
              <React.Fragment key={comment.id}>
                {displayAllComments || index >= comments.length - 5 ? (
                  <div className=" pe-5 md:pe-3  py-2 grid grid-cols-11 sm:grid-cols-11 md:grid-cols-11 xl:grid-cols-11 lg:grid-ols-11  items-start">
                    <div className="md:col-span-1 text-center  flex justify-center">
                      <p className="hidden md:block  w-8 h-9 rounded-full ">
                        <span className="flex justify-center text-white text-sm">
                          <img src={comment.senderImage} className="mt-3   w-9 h-9 rounded-md" />
                        </span>
                      </p>
                    </div>
                    <div key={index} className="col-span-9 ">
                      <div>
                        <span className="font-semibold block md:inline text-sm">
                          {comment.senderName} &nbsp;
                        </span>
                        <span className="text-sm text-gray-500">
                          {comment.createdAt && createdAt}
                        </span>
                      </div>
                      <p className="text-sm">{comment.message}</p>
                      {comment && comment.file && (
                        <p className="text-xs mt-1 text-gray-400">
                          Attachment :
                          <span className="text-xs">{fileName}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-end items-center md:gap-5">
                        {comment && comment.file && (
                          <div className="flex gap-2">
                            {/* <span> {fileName}</span> */}
                            <button title={fileName}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-5 hover:text-orange-600 cursor-pointer"
                                onClick={() => handleDownload(comment.file)}
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                              </svg>
                            </button>
                          </div>
                        )}

                        <div class="relative inline-block text-left bottom-0">
                          <div>
                            {parseInt(authState?.user?.id) ===
                              parseInt(comment.senderId) && (
                              <button
                                type="button"
                                class="inline-flex w-full justify-center items-center gap-x-1.5  text-sm font-semibold text-gray-900  "
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={() =>
                                  handleCommentCrudView(comment.id)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-4 h-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </button>
                            )}

                            {commentCrudView === comment.id && (
                              <div
                                ref={menuRef}
                                
                                class="absolute right-0 bottom-0   z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabindex="-1"
                                
                              >
                                <div class="py-1" role="none">
                                  <p
                                    class="text-gray-700  px-3 py-1.5 text-sm flex gap-3 cursor-pointer hover:bg-gray-200"
                                    onClick={() => {
                                      setIsCommentEditing(true);
                                      setNewComment(comment);
                                      setCommentCrudView(null);
                                      setFileName(fileName);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-5 h-5"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                      />
                                    </svg>
                                    Edit
                                  </p>
                                  <p
                                    className="text-gray-700  px-3 py-1.5 text-sm flex gap-3 cursor-pointer hover:bg-gray-200"
                                    onClick={() => {
                                      handleDeleteComment(comment.id);
                                      setIsCommentEditing(false);

                                      setCommentCrudView(null);
                                      setFileName(null);
                                      setNewComment({
                                        message: "",
                                        file: "",
                                        senderId: "",
                                      });
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-5 h-5"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                      />
                                    </svg>
                                    Delete
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}

        {/* <div>
              {comment.file.map((attachment, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(attachment)}
                  alt={`Attachment ${idx}`}
                  style={attachmentStyle}
                />
              ))}
            </div> */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default CommentsView;
