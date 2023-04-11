//URL for all the products data
const url='http://localhost:3000/products'
//fetch all products data
function getAllProducts(){
 fetch(url)
 .then(res=>res.json())//turn the data into json
 .then(products=>
    {
    //console.log(products)//check whether the data is loaded
    products.map(product=>{
            

       let productCard=document.createElement('table')
       productCard.innerHTML=`
       <thead>
       <tr>
         <th scope="col">ID</th>
         <th scope="col">Product Name</th>
         <th scope="col">Quantity</th>
         <th scope="col">Price</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <th scope="row">${product.id}</th>
         <td> ${product.name}</td>
         <td> ${product.quantity}</td>
         <td>$${product.price}</td>
       </tr>
     </tbody>`

    productCard.className='table'
    document.querySelector('.container').appendChild(productCard) //add products to the DOM
     let productOption=document.createElement('option')
     productOption.innerHTML=`
     <option value="${product.id && product.name} " id="productOption">
     `
     document.getElementById('datalistOptions').appendChild(productOption)
})})}

document.querySelector("#add-productForm").addEventListener("submit", handleAddProduct);
//function to get the data from the form
function handleAddProduct(e){
e.preventDefault()

//adding validation to prevent empty insertion of data
if (!e.target.name.value || !e.target.price.value) {
    alert("Please fill in both fields!");
    return;
  }
let productObj = {
    name: e.target.name.value,
    quantity: e.target.qty.value,
    price: e.target.price.value,
    img: e.target.img.value,
    description: e.target.description.value
  };
 console.log(productObj)
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
  }
window.addEventListener('load',getAllProducts)