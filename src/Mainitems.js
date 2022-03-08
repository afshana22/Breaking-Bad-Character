import React from "react";

export default function Mainitems({ image, name, status, dob, nickname ,link }) {
  return (
    <a href ={`https://en.wikipedia.org/wiki/${link}_(Breaking_Bad)`}>
    <div class="flip">
      <div
        class="front"
        style={{ backgroundImage: `url(${image})`, objectFit: "contain" }}
      ></div>
      <div class="back">
        <h2>Actor name : {name}</h2>
        <h2>Nickname : {nickname}</h2>
        <h2>DOB : {dob}</h2>
        <h2>Status : {status}</h2>
      </div>
    </div>
    </a>
  );
}
