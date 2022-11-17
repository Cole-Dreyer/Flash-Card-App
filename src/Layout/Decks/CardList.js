import React from "react";
import CardDetails from "./CardDetails";
import CardDetailsStructure from "./CardDetailsStructure";

function CardList({ deck, deleteHandler }) {
  let rows = deck.cards?.map(
    (card) => CardDetails({ ...card, deckId: deck.id, deleteHandler }) // Allow for new complete cards to be added or blank cards that hold the base card structureif needed.
  );
  if (!deck.name) {
    rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(<CardDetailsStructure key={i} />);
    }
  }

  return (
    // return rows array, which holds the cardlist, whatever that may end up holding
    <>
      <h2 className="mt-4">Cards</h2>
      {rows}
    </>
  );
}

export default CardList;
