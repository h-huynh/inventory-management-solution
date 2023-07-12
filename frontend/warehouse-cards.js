document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8080/warehouses")
      .then(response => response.json())
      .then(warehouses => {
        warehouses.forEach(warehouse => {
          fetch(`http://localhost:8080/inventory/${warehouse.id}/totalQuantity`)
            .then(response => response.json())
            .then(totalQuantity => {
              warehouse.totalQuantity = totalQuantity;
              createWarehouseCard(warehouse);
            })
            .catch(error => {
              console.error(`Error retrieving total quantity for warehouse ${warehouse.id}:`, error);
            });
        });
      })
      .catch(error => {
        console.error("Error retrieving warehouses:", error);
      });
  });
  
function createWarehouseCard(warehouse) {
    const card = document.createElement("div");
    card.className = "card mb-3";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title mb-3";
    cardTitle.textContent = warehouse.name;

    const progressBar = document.createElement("div");
    progressBar.className = "progress";

    const progressBarValue = document.createElement("div");
    progressBarValue.className = "progress-bar";
    progressBarValue.style.width = `${(warehouse.totalQuantity / warehouse.maximumCapacity) * 100}%`;
    progressBarValue.textContent = '';

    progressBar.appendChild(progressBarValue);

    const currentStorage = document.createElement("div");
    currentStorage.className = "text-center font-weight-bold mb-3";
    currentStorage.textContent = `Current Storage: ${warehouse.totalQuantity}/${warehouse.maximumCapacity}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex justify-content-between";

    const viewButton = document.createElement("button");
    viewButton.className = "btn btn-primary mr-2";
    viewButton.textContent = "View";

    const editButton = document.createElement("button");
    editButton.className = "btn btn-secondary mr-2";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";

    buttonContainer.appendChild(viewButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(progressBar);
    cardBody.appendChild(currentStorage);
    cardBody.appendChild(buttonContainer);

    card.appendChild(cardBody);

    const warehouseCards = document.querySelector(".warehouse-cards");
    warehouseCards.appendChild(card);
}