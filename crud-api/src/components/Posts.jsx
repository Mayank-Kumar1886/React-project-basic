import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostAPI";
import "../App.css";
import Form from "./Form";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    const res = await getPost();
    setData(res.data);
  };
  useEffect(() => {
    getPostData();
  }, []);
  const handleUpdatePost = (current) => setUpdateDataApi(current);
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPost = data.filter((currentPost) => {
          return currentPost.id !== id;
        });
        setData(newUpdatedPost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        <ol>
          {data.map((current) => {
            const { id, body, title } = current;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdatePost(current)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Posts;
