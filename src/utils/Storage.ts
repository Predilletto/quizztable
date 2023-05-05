import { initializeApp } from "firebase/app";
import {
  DocumentData,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { QuizProps } from "../Components/Quiz/Quiz";

export const firebaseConfig = {
  apiKey: "AIzaSyBT0C_3C6J8VmeIJOyb0s8-8crD0wIWWYY",
  authDomain: "quiz-12108.firebaseapp.com",
  projectId: "quiz-12108",
  storageBucket: "quiz-12108.appspot.com",
  messagingSenderId: "86686665495",
  appId: "1:86686665495:web:13fb964f9c4392b0310552",
  measurementId: "G-CSFJHGT8YS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addQuiz(quiz: QuizProps) {
  try {
    const docRef = await addDoc(collection(db, "Quizzes"), quiz);
    await updateDoc(doc(db, "Quizzes", docRef.id), { id: docRef.id });
    alert("Document written with ID: " + docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getQuizzes() {
  const quizzes: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, "Quizzes"));
  querySnapshot.forEach((v) => quizzes.push(v.data()));
  return quizzes;
}

async function retrieveQuiz(id: string) {
  const docRef = doc(db, "Quizzes", id);
  let quiz: QuizProps | null = null;

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      quiz = docSnap.data() as QuizProps;
      return quiz;
    } else {
      alert("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeQuiz(id: string | undefined) {
  if (id) {
    const docRef = doc(db, "Quizzes", id);
    deleteDoc(docRef)
      .then(() => {
        alert("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("document not found");
  }
}

export { addQuiz, getQuizzes, retrieveQuiz, removeQuiz };
