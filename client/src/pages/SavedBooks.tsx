// //import { useState, useEffect } from "react";
// import { useState } from "react";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

// import { useQuery } from "@apollo/client";
// import { QUERY_ME } from "../utils/queries";
// import { useMutation } from "@apollo/client";
// import { REMOVE_BOOK } from "../utils/mutations";

// //import { getMe, deleteBook } from "../utils/API";
// //import { deleteBook } from "../utils/API";

// import Auth from "../utils/auth";
// import { removeBookId } from "../utils/localStorage";
// import type { User } from "../models/User";

// const SavedBooks = () => {
//   const [userData, setUserData] = useState<User>({
//     username: "",
//     email: "",
//     password: "",
//     savedBooks: [],
//   });

//   // use this to determine if `useEffect()` hook needs to run again
//   const userDataLength = Object.keys(userData).length;

//   // GRAPH QL Addition Use the useQuery hook to fetch the user data with the QUERY_ME query
//   const { loading, data } = useQuery(QUERY_ME, {
//     onCompleted: (data) => {
//       setUserData(data.me);
//       console.log("Query Data:", data);
//       console.log("User Data:", userData);
//     },
//   });


//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   // if (data) {
//   //   setUserData(data.me);
//   // }

//   //REST API
//   // useEffect(() => {
//   //   const getUserData = async () => {
//   //     try {
//   //       const token = Auth.loggedIn() ? Auth.getToken() : null;

//   //       if (!token) {
//   //         return false;
//   //       }

//   //       const response = await getMe(token);

//   //       if (!response.ok) {
//   //         throw new Error('something went wrong!');
//   //       }

//   //       const user = await response.json();
//   //       setUserData(user);
//   //     } catch (err) {
//   //       console.error(err);
//   //     }
//   //   };

//   //   getUserData();
//   // }, [userDataLength]);

//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   // REST
//   // const handleDeleteBook = async (bookId: string) => {
//   //   const token = Auth.loggedIn() ? Auth.getToken() : null;

//   //   if (!token) {
//   //     return false;
//   //   }

//   //   try {
//   //     const response = await deleteBook(bookId, token);

//   //     if (!response.ok) {
//   //       throw new Error("something went wrong!");
//   //     }

//   //     const updatedUser = await response.json();
//   //     setUserData(updatedUser);
//   //     // upon success, remove book's id from localStorage
//   //     removeBookId(bookId);
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   // GRAPHQL
//   const [removeBookMutation] = useMutation(REMOVE_BOOK);

//   const handleDeleteBook = async (bookId: string) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       console.error("No token found. User is not logged in.");
//       return false;
//     }

//     try {
//       // Use the removeBookMutation to delete the book
//       const { data } = await removeBookMutation({
//         variables: { bookId },
//       });

//       // Update the userData state with the updated user data
//       // if (data) {
//       //   setUserData(data.removeBook);
//       // }

//       // Upon success, remove book's id from localStorage
//       removeBookId(bookId);
//     } catch (err) {
//       console.error("Error Removing Book:", err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (!userDataLength) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <div className="text-light bg-dark p-5">
//         <Container>
//           {userData.username ? (
//             <h1>Viewing {userData.username}'s saved books!</h1>
//           ) : (
//             <h1>Viewing saved books!</h1>
//           )}
//         </Container>
//       </div>
//       <Container>
//         <h2 className="pt-5">
//           {userData.savedBooks.length
//             ? `Viewing ${userData.savedBooks.length} saved ${
//                 userData.savedBooks.length === 1 ? "book" : "books"
//               }:`
//             : "You have no saved books!"}
//         </h2>
//         <Row>
//           {userData.savedBooks.map((book) => {
//             return (
//               <Col md="4">
//                 <Card key={book.bookId} border="dark">
//                   {book.image ? (
//                     <Card.Img
//                       src={book.image}
//                       alt={`The cover for ${book.title}`}
//                       variant="top"
//                     />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{book.title}</Card.Title>
//                     <p className="small">Authors: {book.authors}</p>
//                     <Card.Text>{book.description}</Card.Text>
//                     <Button
//                       className="btn-block btn-danger"
//                       onClick={() => handleDeleteBook(book.bookId)}
//                     >
//                       Delete this Book!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SavedBooks;

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBookMutation] = useMutation(REMOVE_BOOK);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data?.me || {
    username: "",
    email: "",
    password: "",
    savedBooks: [],
  };

  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.error("No token found. User is not logged in.");
      return false;
    }

    try {
      const { data } = await removeBookMutation({
        variables: { bookId },
      });

      if (data) {
        removeBookId(bookId);
      }
    } catch (err) {
      console.error("Error Removing Book:", err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;