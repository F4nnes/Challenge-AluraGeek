import { servicesProducts } from "../services/product-services.js";


const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img class="size" src="${image}" alt="${name}"/>

                    <div class="card-container--info">
                        <p>${name}</p>
                            <div class="card-container--value">
                                <p>$ ${price}</p>
                                <button class="delete-button" data-id="${id}">
                                    <img src="imagen/🦆 icon _trash 2_.png" alt="eliminar" />
                                </button>
                            </div>
                    </div>
    `;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", async () => {
        try {
            await servicesProducts.deleteProduct(id);
            card.remove();
        } catch (error) {
            console.log(error);
        }
    })

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProduct = await servicesProducts.productList();

        listProduct.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        })


    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price, image)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
});



render();