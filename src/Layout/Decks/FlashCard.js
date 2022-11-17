import React, { useState } from "react";
import classNames from "../../utils/class-names";
import "./FlashCard.css";

function FlashCard({ handleNext, deck = { cards: [] }, cardId = 0 }) { 
  const { cards } = deck;
  const card = cards[cardId] || {};
  const [side, setSide] = useState(true);

  function flipCard() {               //Function that will allow for the "flip" action to occur; has relation to state.
    setSide(!side);
  }

  const nextButton = !side ? (                                  //Function that will allow for the "flip" action to occur; has relation to state.
    <button
      className="btn btn-primary btn-next"
      onClick={() => {
        setSide(true);
        handleNext();
      }}
    >
      Next
    </button>
  ) : (
    ""
  );
  return (
    <div className="card my-1 front">
      <div
        className={classNames({ "card-body": true, front: side, back: !side })}
      >
        <h5 className="card-title">
          Card {cardId + 1} of {cards.length}
        </h5>
        <p className="card-text front-text">{card.front}</p>
        <p className="card-text back-text">{card.back}</p>
        <button className="btn btn-secondary" onClick={flipCard}>
          Flip
        </button>
        {nextButton}
      </div>
    </div>
  );
}

export default FlashCard;
