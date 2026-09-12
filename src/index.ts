interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

const searchInput = document.getElementById("search-input") as HTMLInputElement;
const suggestionsContainer = document.getElementById(
  "suggestions",
) as HTMLElement;
const API_KEY = "7f4909acb44c4aa692a3077158f15860";

searchInput.addEventListener("input", async (event) => {
  const wpisanyTekst = (event.target as HTMLInputElement).value.trim();

  if (wpisanyTekst.length < 3) {
    suggestionsContainer.innerHTML = "";
    return;
  }

  const gry = await fetchGames(wpisanyTekst);

  if (searchInput.value.trim() !== wpisanyTekst) {
    return;
  }

  const limitedGry = gry.slice(0, 5);

  suggestionsContainer.innerHTML = "";

  limitedGry.forEach((gra: Game) => {
    const propo = document.createElement("p");
    propo.textContent = gra.name;
    propo.classList.add("propo");
    suggestionsContainer.appendChild(propo);
  });
});

async function fetchGames(query: string): Promise<Game[]> {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=6`,
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    return [];
  }
}
