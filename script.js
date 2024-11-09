/************************************* */
/*************NAV BAR**************** */
/*********************************** */
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

/***************************************
 * SEARCH BAR FUNCTIONALITY
 ***************************************/

document.addEventListener("DOMContentLoaded", () => {
  // Select the search bar input by its ID
  const searchInput = document.getElementById("search-bar");
  // Select all elements with the "card" class, representing items to be filtered
  const foodItems = document.querySelectorAll(".card");

  // Function to filter items based on search query
  function filterItems(query) {
    // Convert the search query to lowercase for case-insensitive comparison
    const lowerCaseQuery = query.toLowerCase();

    // Loop through each food item
    foodItems.forEach((item) => {
      // Select the item's title and convert to lowercase
      const title = item.querySelector(".card-title").textContent.toLowerCase();

      // Display item if the title includes the query; otherwise, hide it
      item.style.display = title.includes(lowerCaseQuery) ? "block" : "none";
    });
  }

  // Check if the search input exists on the page before adding event listener
  if (searchInput) {
    // Listen for input events to filter items in real-time as the user types
    searchInput.addEventListener("input", (event) =>
      filterItems(event.target.value)
    );
  } else {
    // Log a warning if the search bar is not found
    console.warn("Search bar element not found on this page.");
  }
});

/***************************************
 * CART FUNCTIONALITY
 ***************************************/

document.addEventListener("DOMContentLoaded", () => {
  // Select elements related to cart functionality
  const addToCartButtons = document.querySelectorAll(".add-to-cart"); // All "add to cart" buttons
  const cartItemCount = document.querySelector(".cart-icon span"); // Cart item count indicator
  const cartItemsList = document.querySelector(".cart-items"); // Cart items list in the sidebar
  const cartTotal = document.querySelector(".cart-total"); // Cart total amount display
  const cartIcon = document.querySelector(".cart-icon"); // Cart icon for toggling sidebar
  const sidebar = document.getElementById("sidebar"); // Sidebar element containing cart details

  // Check if cart elements exist before proceeding to avoid errors
  if (!cartItemCount || !cartItemsList || !cartTotal || !cartIcon || !sidebar) {
    console.warn("Some cart elements are missing on this page.");
    return; // Exit if essential elements are missing
  }

  // Initialize an array to hold items added to the cart
  let cartItems = [];
  // Initialize total cart amount to zero
  let totalAmount = 0;

  // Function to update the cart UI
  function updateCartUI() {
    updateCartItemCount(cartItems.length); // Update the number of items on the cart icon
    updateCartItemList(); // Refresh the list of items in the sidebar
    updateCartTotal(); // Update the total amount in the sidebar
  }

  // Update the cart item count displayed on the cart icon
  function updateCartItemCount(count) {
    cartItemCount.textContent = count;
  }

  // Update the list of items displayed in the sidebar
  function updateCartItemList() {
    // Clear the current list of items in the sidebar
    cartItemsList.innerHTML = "";

    // Loop through each item in the cart to create a display element for each
    cartItems.forEach((item, index) => {
      // Create a new div to represent each item
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item", "individual-cart-item"); // Add appropriate classes
      // Populate the div with the item name, quantity, price, and a remove button
      cartItem.innerHTML = `
          <span>(${item.quantity}x) ${item.name}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-btn" data-index="${index}">
            <i class="fa-solid fa-times"></i>
          </button>
        `;
      cartItemsList.append(cartItem); // Add the created item to the sidebar
    });

    // Add event listeners to each remove button
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      // Listen for click events on each remove button
      button.addEventListener("click", (event) => {
        // Get the item index from the data attribute and remove the item from the cart
        const index = event.target.closest("button").dataset.index;
        removeItemFromCart(index); // Call remove function with item index
      });
    });
  }

  // Remove an item from the cart based on its index
  function removeItemFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0]; // Remove item from cart array
    totalAmount -= removedItem.price * removedItem.quantity; // Update the total amount
    updateCartUI(); // Refresh the cart display after removing the item
  }

  // Update the cart total amount displayed in the sidebar
  function updateCartTotal() {
    cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
  }

  // Toggle sidebar visibility when the cart icon is clicked
  cartIcon.addEventListener("click", () => {
    sidebar.classList.toggle("open"); // Toggle "open" class to show/hide sidebar
  });

  // Find the close button in the sidebar, if it exists
  const closeButton = document.querySelector(".sidebar-close");
  if (closeButton) {
    // Add click event listener to close the sidebar
    closeButton.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  } else {
    // Log a warning if the close button is not found
    console.warn("Close button not found in sidebar.");
  }

  // Add event listeners to each "add to cart" button to handle adding items to the cart
  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Create an item object with details of the item being added
      const item = {
        name: document.querySelectorAll(".card-title")[index].textContent, // Get item name
        price: parseFloat(
          document.querySelectorAll(".price")[index].textContent.slice(1) // Parse price as float
        ),
        quantity: 1, // Set initial quantity to 1
      };

      // Check if the item already exists in the cart
      const existingItem = cartItems.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        // If item already in cart, increase its quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add it as a new item in the cart
        cartItems.push(item);
      }
      totalAmount += item.price; // Update the total amount
      updateCartUI(); // Refresh the cart display
    });
  });
});

/***************************************
 * CONTACT FORM ANIMATION
 ***************************************/

const inputs = document.querySelectorAll(".input"); // Select all form input fields

// Function to add "focus" class when input field is focused
function focusFunc() {
  let parent = this.parentNode; // Select the parent element
  parent.classList.add("focus"); // Add focus class to parent element
}

// Function to remove "focus" class if input field is empty on blur
function blurFunc() {
  let parent = this.parentNode; // Select the parent element
  if (this.value === "") {
    parent.classList.remove("focus"); // Remove focus class if input is empty
  }
}

// Add event listeners to each input field for focus and blur events
inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc); // Add focus event listener
  input.addEventListener("blur", blurFunc); // Add blur event listener
});
