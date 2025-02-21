// import { useEffect, useState } from "react";
// // import { IndexedDB } from "react-indexed-db-hook";

// interface QuizHistory {
//   score: number;
//   date: string;
// }

// const ResultPage: React.FC = () => {
//   const { add, getAll } = IndexedDB("quizHistory");
//   const [history, setHistory] = useState<QuizHistory[]>([]);
//   const [openHistory, setOpenHistory] = useState("")

//   useEffect(() => {
//     getAll().then(setHistory);
//   }, [getAll]);

//   const saveResult = (score: number) => {
//     add({ score, date: new Date().toISOString() }).then(() => {
//       alert("Result Saved");
//     });
//   };

//   return (
//     <div>
//       <h2>Quiz History</h2>
//       <ul>
//         {history.map((entry, index) => (
//           <li key={index}>
//             Score: {entry.score}, Date: {new Date(entry.date).toLocaleString()}
//           </li>
//         ))}
//       </ul>
//       <button onClick={() => saveResult(3)}>Save Result</button>
//     </div>
//   );
// };

// export default ResultPage;
