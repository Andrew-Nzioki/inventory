//URL for all the products data
const url='http://localhost:3000/products'
//fetch all products data
function getAllProducts(){
 fetch(url)
 .then(res=>res.json())//turn the data into json
 .then(products=>
    {
    console.log(products)//check whether the data is loaded
    products.map(product=>{
        
       console.log(product.name)
    })   
    })
}

function addProducts(){
    fetch(`${url}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(productObj)
    })
}

window.addEventListener('load',getAllProducts)