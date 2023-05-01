import { initializeApp } from "firebase/app";
import { DocumentData, getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { QuizProps } from "../Components/Quiz/Quiz";

const firebaseConfig = {
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
    console.log("Document written with ID: ", docRef.id);
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

export { addQuiz, getQuizzes };
