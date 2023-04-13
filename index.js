//URL for all the products data
const url = "http://localhost:3000/products";
//fetch all products data
function getAllProducts() {
  fetch(url)
    .then((res) => res.json()) //turn the data into json
    .then((products) => {
      //console.log(products)//check whether the data is loaded
      products.map((product) => {
        let productCard = document.createElement("table");
        productCard.innerHTML = `
       <thead>
       <tr>
         <th scope="col">ID</th>
         <th scope="col">Product Name</th>
         <th scope="col">Category</th>
         <th scope="col">Quantity</th>
         <th scope="col">Price</th>
         <th scope="col">Actions</th>
       </tr>
     </thead>
    
     <tbody>
       <tr>
         <th scope="row">${product.id}</th>
         <td> 
         ${product.name}   
         </td>
         <td> 
         ${product.category}  
         </td>
         <td> ${product.quantity}</td>
      
         <td>$${product.price}</td>
         
         <td>
         <button class="btn btn-secondary delete-btn" data-product-id="${product.id}">Delete</button>
         </td>
        
       </tr>
     </tbody>
   
     `;

        productCard.className = "table";
        document.querySelector(".container").appendChild(productCard); //add products to the DOM
        let productOption = document.createElement("option");
        productOption.innerHTML = `
     <option value="${product.id && product.name} " id="productOption">
     `;
        document.getElementById("datalistOptions").appendChild(productOption);

        // document.querySelector('#del').addEventListener('click',(e)=>{
        //   e.preventDefault()
        //   console.log('clicked')
        //   console.log(product.id)
        // })
      });
    });
}
document
  .querySelector("#add-productForm")
  .addEventListener("submit", handleAddProduct);

//function to get the data from the form
function handleAddProduct(e) {
  e.preventDefault();

  //adding validation to prevent empty insertion of data
  
   
    let productObj = {
      name: e.target.name.value,
      quantity: e.target.quantity.value,
      price: e.target.price.value,
      category: e.target.category.value,
      image: e.target.image.value,
      description: e.target.description.value,
    };
   
  console.log(productObj);
  addProducts(productObj);
}

//Function to perform a POST request to the server
function addProducts(productObj) {
  console.log(JSON.stringify(productObj));
  //fetch takes three parameters, url,{methods and headers}, then the body of the POST incase of a Post request
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productObj),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Success:", response);
      location.reload(); // Reload the page
    })
    .catch((error) => {
      console.error("Error:");
    });
}

//PATCH request at last

const form = document.querySelector("#form-update");
const updateBtn = document.querySelector("#update-btn");

updateBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const id = form.elements.id.value;
  const updatedProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    quantity: form.elements.quantity.value,
    price: form.elements.price.value,
    category: form.elements.category.value,
    image: form.elements.image.value,
  };

  updateProduct(id, updatedProduct);
});
function updateProduct(id, updatedProduct) {
  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Success:", response);
      location.reload(); // Reload the page
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//DELETE
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const productId = event.target.dataset.productId;
    console.log(event.target.dataset);
    deleteProduct(productId);
  }
});

function deleteProduct(productId) {
  fetch(`${url}/${productId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Product deleted successfully:", data);
      // remove the product from the DOM
      location.reload();
      // const productCard = document.querySelector(`[data-product-id="${productId}"]`).parentNode.parentNode;
      // productCard.remove();
    })
    .catch((error) => console.log("Error deleting product:"));
}
window.addEventListener("load", getAllProducts);
