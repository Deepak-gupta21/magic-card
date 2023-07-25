import React, { useState } from "react";
import { CardItem } from "./CardItem";
import GameData from "../app.mock";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [clickedCards, setClickedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const onClickHandler = (currentId) => {
    const clickedCard = cardList.find((item) => item.id === currentId);
    console.log(clickedCard);

    // if (matchedCards.includes(clickedCard.id)) {
    //   return;
    // }

    const updatedCardList = cardList.map((item) =>
      item.id === currentId ? { ...item, isOpen: true } : item
    );

    setCardList(updatedCardList);

    const updatedClickedCards = [...clickedCards, clickedCard];
    setClickedCards(updatedClickedCards);

    //logic for matching.
    if (updatedClickedCards.length === 2 ) {
      const [firstCard, secondCard] = updatedClickedCards;
      if (firstCard.name === secondCard.name) {
        // The cards match, keep them open and mark them as matched
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
      } else {
        // The cards don't match, close them after a short delay
        setTimeout(() => {
          const resetCards = updatedCardList.map((item) =>
            item.isOpen ? { ...item, isOpen: false } : item
          );
          setCardList(resetCards);
          setClickedCards([]);
        }, 500);
      }
    }
  };

  const allPairsMatched = matchedCards.length === cardList.length;
  if (allPairsMatched) {
    alert("Game won!");
  }

  return (
    <div className="card-item-list">
      {cardList.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          image={item.pic}
          onClick={() => onClickHandler(item.id)}
          isOpen={item.isOpen}
        />
      ))}
    </div>
  );
};
