
const btn = document.getElementById("btn");
const productContainer = document.querySelector('.products-container');

let div = document.createElement('div');
div.classList.add("products-container")


function getProduct() {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(prod=> prod.forEach(element => {
                div.innerHTML += `
                <div class="product">
            <img src="${element.image}" alt="" class="product-img">
            <h5 class="product-title">${element.title.slice(0, 20)}...</h5>
            <h6 class="product-price">${element.price}</h6>
            <button class="view-product-btn" onclick='getId(${element.id})'>View</button>
        </div>
         `
    productContainer.append(div)
}))
}

function getId(id) {    
    sessionStorage.setItem("singleId", JSON.stringify(id))
    window.location = 'single.html'
}

function getSingleProduct() {
    const id = JSON.parse(sessionStorage.getItem("singleId"))
    
    let section = document.createElement("section");

    fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json())
    .then((element) => 
        section.innerHTML += `
        <div class="single-product">
        <div class="left">
        <img src="${element.image}" alt="" class="product-img">
        </div>

        <div class="right">
        
        <h5 class="product-title">${element.title}</h5>
        <h6 class="single-price">$${element.price}</h6>
        <p class="single-desc">${element.description}</p>
        <button class='back'  onclick=goBack()>Back</button> 
        </div>

</div>`)
    .catch((err) => console.log(err))

    document.body.append(section)
}

function goBack() {
    window.location ="index.html"
}
