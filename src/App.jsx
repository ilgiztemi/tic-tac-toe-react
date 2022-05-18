import "./styles.css";
import { useState, useEffect } from "react";

const App = () => {
  const [block, setBlock] = useState([...Array(9).keys()]);
  const [clicked, setClicked] = useState(false);
  const [storeX, setStoreX] = useState([]);
  const [storeO, setStoreO] = useState([]);
  const [winner, setWinner] = useState("");
  const values = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleClick = (index) => {
    let newData = [...block];
    if (!clicked) {
      newData[index] = "X";
      setStoreX([...storeX, index]);
    } else {
      newData[index] = "O";
      setStoreO([...storeO, index]);
    }
    setBlock(newData);
    setClicked(!clicked);
  };

  function longerClicks(arr1, arr2) {
    let counter = 0;
    for (let i of arr1) {
      if (arr2.includes(i)) {
        counter++;
      }
    }
    return counter === 3 ? true : false;
  }
  useEffect(() => {
    for (let i of values) {
      let joined = i.join("");
      if (storeX.join("") === joined || longerClicks(storeX, i)) {
        console.log("X is a winner");
        setWinner("X won");
      } else if (storeO.join("") === joined || longerClicks(storeO, i)) {
        console.log("O is a winner");
        setWinner("O won");
      }
    }
  }, [storeX, storeO]);

  return (
    <div className="container">
      <div className="row">
        {block.map((el, index) => {
          return (
            <div
              className="box col-sm-4"
              onClick={() => {
                handleClick(index);
              }}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="winner">{winner}</div>
    </div>
  );
};

export default App;
