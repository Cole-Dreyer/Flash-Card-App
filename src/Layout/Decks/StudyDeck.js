import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FlashCard from "./FlashCard";
import { readDeck } from "../../utils/api/index";
import NotEnoughCards from "./NotEnoughCards";
import FlashCardStructure from "./FlashCardStructure";

function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [cardId, setCardId] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const name = deck.name ? deck.name : "Deck Name"; //Set a placeholder deck name prior to one loading.

  useEffect(() => {
    //Set a clean up function for when the page re-renders after actions
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const deckInfo = await readDeck(deckId, abortController.signal);
        setDeck(deckInfo);
        setLoaded(true);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("aborted");
        } else {
          throw error;
        }
      }
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  //Set a function to handle how and when a deck is to be restart or not.
  function handleNext() {
    if (cardId >= deck.cards.length - 1) {
      if (window.confirm("Restart cards?")) {
        setCardId(0);
      } else {
        history.push("/");
      }
    } else {
      setCardId(cardId + 1);
    }
  }

  // Set a variable to hold an indication if a deck has too few cards.
  const flashCards =
    deck?.cards?.length > 2 ? (
      <FlashCard handleNext={handleNext} deck={deck} cardId={cardId} />
    ) : (
      <NotEnoughCards deck={deck} />
    );

  //Set a variable to display flashcards when loaded.
  const content = loaded ? flashCards : <FlashCardStructure />;

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
            Study
          </li>
        </ol>
      </nav>
      <h1>{name}: Study</h1>
      {content}
    </div>
  );
}

export default StudyDeck;
