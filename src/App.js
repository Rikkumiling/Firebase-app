import "./App.css";
//import Modal from './components/Modal';
//import ReminderList from './components/ReminderList';
import {
  BrowserRouter,
  Route,
  NavLink,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

import React, { useState } from "react";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Article from "./pages/Article";
import FormArticle from "./pages/FormArticle";
import UpdateArticle from "./pages/UpdateArticle";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

function App() {
  // const articles = [
  //   {
  //     "id": "1",
  //     "title": "Welcome to the Site",
  //     "author": "Mario",
  //     "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, ullam eos dignissimos aperiam rerum qui suscipit cum nobis, totam ea tenetur perferendis praesentium corporis possimus ducimus et minima voluptatum. Numquam mollitia culpa consectetur unde illum est aut dicta eligendi vero molestias impedit sint, maiores saepe voluptas necessitatibus excepturi ducimus repudiandae, non quidem nobis veritatis! Libero neque, cumque illo est corrupti eaque recusandae ipsum, ut debitis vitae molestias deleniti voluptates distinctio sapiente autem. Tempore aperiam minima sit atque, tempora doloribus blanditiis id ipsum. Distinctio quos nisi, totam sunt ex voluptatum? Neque alias laborum ipsum doloremque fuga earum in autem. Hic alias omnis facilis facere eum assumenda deleniti ad, maiores laudantium temporibus odio non, molestiae dolorum! Quo mollitia ex sapiente maiores excepturi?"
  //   },
  //   {
  //     "id": "2",
  //     "title": "5 React Tips for Beginners",
  //     "author": "Luigi",
  //     "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, ullam eos dignissimos aperiam rerum qui suscipit cum nobis, totam ea tenetur perferendis praesentium corporis possimus ducimus et minima voluptatum. Numquam mollitia culpa consectetur unde illum est aut dicta eligendi vero molestias impedit sint, maiores saepe voluptas necessitatibus excepturi ducimus repudiandae, non quidem nobis veritatis! Libero neque, cumque illo est corrupti eaque recusandae ipsum, ut debitis vitae molestias deleniti voluptates distinctio sapiente autem. Tempore aperiam minima sit atque, tempora doloribus blanditiis id ipsum. Distinctio quos nisi, totam sunt ex voluptatum? Neque alias laborum ipsum doloremque fuga earum in autem. Hic alias omnis facilis facere eum assumenda deleniti ad, maiores laudantium temporibus odio non, molestiae dolorum! Quo mollitia ex sapiente maiores excepturi?"
  //   },
  //   {
  //     "id": "3",
  //     "title": "VS Code Best Packages",
  //     "author": "Mario",
  //     "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, ullam eos dignissimos aperiam rerum qui suscipit cum nobis, totam ea tenetur perferendis praesentium corporis possimus ducimus et minima voluptatum. Numquam mollitia culpa consectetur unde illum est aut dicta eligendi vero molestias impedit sint, maiores saepe voluptas necessitatibus excepturi ducimus repudiandae, non quidem nobis veritatis! Libero neque, cumque illo est corrupti eaque recusandae ipsum, ut debitis vitae molestias deleniti voluptates distinctio sapiente autem. Tempore aperiam minima sit atque, tempora doloribus blanditiis id ipsum. Distinctio quos nisi, totam sunt ex voluptatum? Neque alias laborum ipsum doloremque fuga earum in autem. Hic alias omnis facilis facere eum assumenda deleniti ad, maiores laudantium temporibus odio non, molestiae dolorum! Quo mollitia ex sapiente maiores excepturi?"
  //   }
  // ];

  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  //test username: Rikku
  const [password, setPassword] = useState("");
  //test password: Test

  const Validate = async (e) => {
    e.preventDefault();
    try {
      const querySnapshot = await getDocs(collection(db, "accounts"));
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.username === username && userData.password === password) {
          setLogin(true);
        } else {
          alert("Invalid username or password");
        }
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      {!login ? (
        <div className="LoginBox">
          <h1>Login</h1>
          <form>
            <div>
              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Password: </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button onClick={Validate}>Login</button>
          </form>
        </div>
      ) : (
        <div className="App">
          <BrowserRouter>
            <nav>
              <h1>My Articles</h1>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/new">New Article</NavLink>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/articles/:urlId" element={<Article />} />
              <Route path="/new" element={<FormArticle />} />
              <Route path="/*" element={<Navigate to="/" />} />
              <Route path="/update/" element={<UpdateArticle />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
