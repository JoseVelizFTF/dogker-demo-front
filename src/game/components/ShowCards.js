import React from "react";

export const ShowCards = ({ cards, styleComponent, styleCards = {} }) => {
  const styleCardInside = {
    backgroundColor: "white",
    color: "black",
  };
  if (cards == null || cards.length === 0) {
    return <></>;
  }
  return (
    <div style={styleComponent}>
      {cards.map((card, index) => {
        const value = card.split("-")[0];
        const type = card.split("-")[1];

        return (
          <button
            key={index}
            style={{
              background: "white",
              fontSize: "1.5rem",
              padding: "2rem 0.4rem",
              width: "80px",
              margin: "0 0.2rem",
              ...styleCards,
            }}
          >
            <span role="img" aria-label="" style={styleCardInside}>
              {value}
            </span>
            {type === "h" ? (
              <span role="img" aria-label="" style={styleCardInside}>
                ❤
              </span>
            ) : type === "c" ? (
              <span role="img" aria-label="" style={styleCardInside}>
                ♣️
              </span>
            ) : type === "s" ? (
              <span role="img" aria-label="" style={styleCardInside}>
                ♠
              </span>
            ) : type === "d" ? (
              <span role="img" aria-label="" style={styleCardInside}>
                ♦️
              </span>
            ) : (
              "🔥"
            )}
          </button>
        );
      })}
    </div>
  );
};
