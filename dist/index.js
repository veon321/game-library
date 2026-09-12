"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchInput = document.getElementById("search-input");
const suggestionsContainer = document.getElementById("suggestions");
const API_KEY = "7f4909acb44c4aa692a3077158f15860";
const addgame = document.getElementById("add-game");
searchInput.addEventListener("input", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const wpisanyTekst = event.target.value.trim();
    if (wpisanyTekst.length < 3) {
        suggestionsContainer.innerHTML = "";
        return;
    }
    const gry = yield fetchGames(wpisanyTekst);
    if (searchInput.value.trim() !== wpisanyTekst) {
        return;
    }
    const limitedGry = gry.slice(0, 5);
    suggestionsContainer.innerHTML = "";
    limitedGry.forEach((gra) => {
        const propo = document.createElement("p");
        propo.textContent = gra.name;
        propo.classList.add("propo");
        suggestionsContainer.appendChild(propo);
        propo.addEventListener("click", (event) => {
            const text = event.target.textContent;
            searchInput.value = text;
            const propoElementy = document.querySelectorAll(".propo");
            propoElementy.forEach((propo) => {
                propo.remove();
            });
        });
    });
}));
function addGameToLibrary() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(searchInput.value);
        const gry = yield fetchGames(searchInput.value);
        console.log(gry[0]);
    });
}
addgame.addEventListener("click", addGameToLibrary);
function fetchGames(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=6`);
            const data = yield response.json();
            return data.results || [];
        }
        catch (error) {
            console.error("Błąd pobierania danych:", error);
            return [];
        }
    });
}
