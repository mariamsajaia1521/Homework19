import { results } from "./data.js";

const deleteBtn = document.getElementById("delete-btn");
if (deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
        e.target.remove();
    });
}

const jsImg = document.createElement("img");
jsImg.src = "https://fastly.picsum.photos/id/534/1000/800.jpg?hmac=tFbU1nZ2RnQNroI_ToBhH-LFB8KNjyWoc3bVv5G9Wkw";
jsImg.classList.add("js-image");
document.body.prepend(jsImg);

const flightListSection = document.getElementById("flight-list");

const htmlString = results.map((flight, index) => {
    const imageUrl = flight.content.image.url;
    const locationName = flight.content.location.name;
    const isDirect = flight.content.flightRoutes.directFlightsAvailable ? "Direct" : "Indirect";
    const price = flight.content.flightQuotes?.cheapest?.price || "";

    return `
        <div class="card">
            <img src="${imageUrl}" alt="${locationName}" />
            <div class="card-info">
                <span>${locationName}</span>
                <span class="details-text" id="details-${index}">${isDirect}, ${price}</span>
            </div>
            <div class="card-actions">
                <button class="btn-details">See more details</button>
                <button class="btn-remove">Remove Flight</button>
            </div>
        </div>
    `;
}).join("");

flightListSection.innerHTML = htmlString;

const cards = flightListSection.querySelectorAll(".card");

cards.forEach((card, index) => {
    const removeBtn = card.querySelector(".btn-remove");
    const detailsBtn = card.querySelector(".btn-details");
    const detailsText = card.querySelector(`#details-${index}`);

    removeBtn.addEventListener("click", () => {
        card.remove();
    });

    detailsBtn.addEventListener("click", () => {
        detailsText.classList.toggle("show");
    });
});
