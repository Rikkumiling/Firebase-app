import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
// styles
import "./create.css";

export default function UpdateArticle() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const id = state?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const article = { title, author, description };
    const ref = doc(db, "articles", id);
    await updateDoc(ref, article);

    // setTitle("");
    // setAuthor("");
    // setDescription("");

    navigate("/");
  };

  useEffect(() => {
    const retrieveData = async () => {
      const ref = doc(db, "articles", id);
      await getDoc(ref).then((snapshot) => {
        setTitle(snapshot.data().title);
        setAuthor(snapshot.data().author);
        setDescription(snapshot.data().description);
      });
    };
    retrieveData();
  }, []);

  return (
    <div className="create">
      <h2 className="page-title">Update Exsisting Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Author:</span>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}
