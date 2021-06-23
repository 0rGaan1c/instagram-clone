import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import firebase from "../services/firebase-config";
import TopBar from "./TopBar";
import { Redirect, useHistory } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { username } = useParams();
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const {
    currentUser: { uid },
  } = useUser();
  const history = useHistory();

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setLoggedInUsername(doc.data().username);
      });
  }, [uid]);

  useEffect(() => {
    if (loggedInUsername && username !== loggedInUsername) {
      setRedirect(`/${username}`);
    }
  }, [loggedInUsername, username]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setFileUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();

    setUploading(true);
    const storage = firebase.storage();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Error", error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            const db = firebase.firestore();
            db.collection("users").doc(uid).collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username,
              url,
              caption,
              likes: [],
            });
            console.log("uploaded");

            setCaption("");
            setImage(null);
            setFileUrl(null);
            setUploading(false);
            history.push(`/${username}`);
          });
      }
    );
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <TopBar show={"Upload"} />
      {fileUrl ? (
        <div>
          <img src={fileUrl} alt="" className="mx-auto" />
          <form>
            <input
              type="text"
              placeholder="Enter a caption..."
              onChange={(e) => setCaption(e.target.value)}
              className="mt-4 w-full focus:outline-none h-8"
            />
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                ></div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="bg-blue-500 mt-2 p-2 mr-2 rounded-sm text-white"
                onClick={uploadImage}
                disabled={uploading}
              >
                Upload
              </button>
              <button
                className="bg-red-500 p-2 ml-2 rounded-sm text-white"
                onClick={() => setFileUrl(null)}
                disabled={uploading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-3/4 mx-auto mt-10">
          {error && (
            <div className="text-sm text-red-500 text-center mb-4">
              Please select an image!
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!image) {
                setError(true);
                setTimeout(() => {
                  setError(false);
                }, 2000);
              }
            }}
          >
            <input type="file" onChange={handleChange} />
            <button className="bg-blue-500 block mt-4 px-4 py-2 mx-auto rounded-sm text-white">
              Next
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
