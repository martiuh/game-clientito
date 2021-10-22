import "./styles.css";

const URL = "http://localhost:3000";

function init() {
  function render(markup) {
    markup =
      markup ||
      `
    <h1>Hello Vanilla!</h1>
    <div>
      We use the same configuration as Parcel to bundle this sandbox, you can find more
      info about Parcel 
      <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
    </div>
    `;
    document.getElementById("app").innerHTML = markup;
  }

  function postGame(game) {
    const gameData = {
      game
    };

    return fetch("http://localhost:3000/games", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameData)
    });
  }

  function getGames() {
    fetch(`${URL}/games`)
      .then((res) => res.json())
      .then((json) => {
        const { data } = json;
        let result = "";
        for (let i = 0; i < data.length; i++) {
          const game = data[i];
          result += `<li>${game.id} - ${game.name}`;
        }

        render(`<ul>${result}</ul>`);
      });
  }

  getGames();

  const gameInput = document.getElementById("game-input");

  gameInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      console.log(e.target.value);
      const { value } = e.target;
      postGame(value)
        .then(() => {
          e.target.value = "";
          getGames();
        })
        .catch((error) => {
          alert("Cannot post game to API");
        });
    }
  });
}

init();
