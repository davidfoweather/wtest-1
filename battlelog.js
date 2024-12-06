const fetchAndDisplayBattles = async () => {
  try {
    const response = await fetch("http://97.80.237.197:5000/battlelog");
    const battles = await response.json();

    const container = document.getElementById("battle-cards-container");

    battles.forEach((battle) => {
      const card = document.createElement("div");
      card.className = "battle-card";

      card.innerHTML = `
        <h2>${battle.mode.toUpperCase()}</h2>
        <p><strong>Result:</strong> ${battle.result}</p>
        <p><strong>Star Player:</strong> ${battle.starplayer}</p>
        <p><strong>Duration:</strong> ${battle.duration} seconds</p>
        <p><strong>Trophy Change:</strong> ${battle.trophychange}</p>
        <p><strong>Map:</strong> ${battle.eventmap}</p>
        <p><strong>Battle Type:</strong> ${battle.battletype}</p>
        <p><strong>My Team:</strong> ${battle.my_team}</p>
        <p><strong>Opponent Team:</strong> ${battle.opponent_team}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching battle data:", error);
  }
};

fetchAndDisplayBattles();
