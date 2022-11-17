import React, { useState, useEffect } from "react";                              //importing from React
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readCard, readDeck, updateCard } from "../../utils/api/index";          //Functions needed from Api


function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  const name = deck.name ? deck.name : "Deck";

  // Single useEffect for loading both the deck and the card as they are connected; they need to be aborted when the user leaves this component
  useEffect(() => {
    const abortController = new AbortController();

    //Load the deck for navbar information
    async function loadDeck() {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setDeck(deckInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }

    // Pre-fill the card information to be edited
    async function loadCard() {
      try {
        const cardInfo = await readCard(cardId, abortController.signal);
        setCard(cardInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }

    loadDeck();
    loadCard();

    return () => abortController.abort();
  }, [deckId, cardId]);

  //Allows for updating of card an then returns user to the "deck details" screen
  async function handleSubmit(card) {
    try {
      await updateCard(card);
      history.push(`/decks/${deckId}`);
    } catch (err) {
      throw err;
    }
  }

  //Returns to the deck details screen
  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="bi bi-house-door-fill"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>{name}: Add Card</h1>
      <CardForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        card={card}
      />
    </div>
  );
}

export default EditCard;

 