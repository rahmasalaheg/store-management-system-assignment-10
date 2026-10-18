
// CRUDS .... (create)
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescribtion = document.getElementById("productDescribtion");
var badgeCount = document.getElementById("badge-count");
var productSearch = document.getElementById("productSearch");
var searchCategory = document.getElementById("searchCategory");
var productImage = document.getElementById("productImage");
var imagePreview = document.getElementById("imagePreview");
var updateButton = document.getElementById("updProd");
var addButton = document.getElementById("addProd");

var updateIndex;
var productList = []

//بعد مما بنحتفظ بالداتا عايزين نحصل عليها وكمان نرجعها لاصلها

if(localStorage.getItem("productArray")!== null){
   productList = JSON.parse(localStorage.getItem("productArray"))
   displayProduct(productList)
}

function addProduct(){
  if(validateProductName() 
  && validateProductPrice()
  && validateProductCategory()
  && validateProductImage()
  && validateProductDesc()){
   var product = {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    description:productDescribtion.value,
    //هنقوله لو الصوره موجوده ضيفها ولو مش موجوده ضيف صوره(no image)
    image:`${productImage.files[0] ? `./IMAGES/${productImage.files[0].name}` : "./IMAGES/no-image.jpg "}`
   }
   productList.push(product);
   //هنحفظ الداتا داخل localStorage
   localStorage.setItem("productArray" , JSON.stringify(productList))
   clearInputValues();
   displayProduct(productList);
  }else{
    alert("etl3 bara")
  }

}

  // عشان نحذف مدخلات المستخدم بعد مايضغط علي الزرار
function clearInputValues(){
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productDescribtion.value = ""

    imagePreview.classList.add("d-none")

    productName.classList.remove("is-valid")
    productPrice.classList.remove("is-valid")
    productCategory.classList.remove("is-valid")
    productImage.classList.remove("is-valid")
    productDescribtion.classList.remove("is-valid")
}    

// CRUDS .... (read / display)

//بعتنا ال arrayده عشان ال الفانكشن تكون مش مقتصره فقط علي productlist
function displayProduct( array){
   badgeCount.innerHTML = `${productList.length} products`
   var originalIndex = productList.indexOf(array[i])
    var caartona = ""
    for( var i = 0; i < array.length; i++){
        caartona += `
         <div class="col-lg-4 col-md-6 col-12">
              <div class="card border-0 shadow">
                <div class="position-relative">
                  <img
                    src="${array[i].image}"
                    class="card-img-top image-card"
                    alt="iphone 16 pro"
                    id = "card-image"
                  />
                  <span
                    class="badge rounded-pill badge-card text-bg-primary px-3 py-2 fs-5"
                    >${array[i].category}</span
                  >
                </div>
               <div class="card-body">
                  <h5 class="card-title fs-4">${array[i].name}</h5>
                  <p class="card-text fs-5 text-muted">
                    ${array[i].description}
                  </p>
                  <div class="d-flex justify-content-between">
                    <p class="text-primary fw-semibold fs-3">${array[i].price}</p>
                    <div class="d-flex align-items-center">
                      <button onclick="deletProduct(${originalIndex})" class="btn btn-outline-danger rounded-end-0">
                        <i class="fas fa-trash-can"></i>
                      </button>
                      <button onclick="getProductToUpdate(${originalIndex})" class="btn btn-outline-warning rounded-start-0">
                        <i class="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `
    }
    document.getElementById("prouductCards").innerHTML = caartona
}

//لاضافه الصوره جمب input الfiles
function previewImage(){
  if(productImage.files[0]){
    var fileName = productImage.files[0].name;
    imagePreview.src = "./IMAGES/" + fileName;
    imagePreview.classList.remove("d-none")
  }
}

//CRUDS ....(delete)

function deletProduct(index){
  productList.splice(index,1)
  localStorage.setItem("productArray" , JSON.stringify(productList))
  displayProduct(productList)
}

//CRUDS ....(Search)

function searchByName(){
  var searchValue = productSearch.value

  var searchArray = []

  for(var i =0; i < productList.length; i++){
    if(productList[i].name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())){
      searchArray.push(productList[i])
    }
  }
  displayProduct(searchArray)
}

function searchByCategory(){
 var searchCategoryValue = searchCategory.value
  var searchCategoryArray = []
 for( var i = 0; i < productList.length; i++){
  if(productList[i].category.trim().toLowerCase().includes(searchCategoryValue.trim().toLowerCase()))
  {
    searchCategoryArray.push(productList[i])
  }
  }
  displayProduct(searchCategoryArray)
}

//CRUDS ....(UPDATE)

//var updateImageName = ""
function getProductToUpdate(index){
  updateIndex = index

  window.scrollTo(0,0)
  addButton.classList.add("d-none")
  updateButton.classList.remove("d-none")

  productName.value = productList[index].name
  productCategory.value = productList[index].category
  productDescribtion.value = productList[index].description
  productPrice.value = productList[index].price
  //للتعديل على الصوره
  //updateImageName = productList[index].image
}

function uptadeProduct(){
  productList[updateIndex].name = productName.value 
  localStorage.setItem("productArray" , JSON.stringify(productList))
  displayProduct(productList)
  clearInputValues()
  addButton.classList.remove("d-none")
  updateButton.classList.add("d-none")
}

// validation

function validateProductName(){
  var nameMsg = document.getElementById("NameMsg")
  var productNameRegex = /^\w{4,}$/
  if(productNameRegex.test(productName.value)){
    productName.classList.add("is-valid")
    productName.classList.remove("is-invalid")
    nameMsg.classList.add("d-none")
    return true
  }else{
    productName.classList.add("is-invalid")
    productName.classList.remove("is-valid")
    nameMsg.classList.remove("d-none")
    return false
  }
}

function validateProductPrice(){
  var priceMsg = document.getElementById("priceMsg")
  var productPriceRegex = /^[5-9]\d{3,}$/
  if(productPriceRegex.test(productPrice.value)){
    productPrice.classList.add("is-valid")
    productPrice.classList.remove("is-invalid")
    priceMsg.classList.add("d-none")
    return true
  }else{
    productPrice.classList.add("is-invalid")
    productPrice.classList.remove("is-valid")
    priceMsg.classList.remove("d-none")
    return false
  }
}

function validateProductCategory(){
  var categoryeMsg = document.getElementById("categoryeMsg")
  //i....> عشان لو المستخدم كتب بحروف small | captail يقبله عادي
  var productCategoryRegex = /^(Tv|Mobile|Labtop)$/i
  if(productCategoryRegex.test(productCategory.value)){
    productCategory.classList.add("is-valid")
    productCategory.classList.remove("is-invalid")
    categoryeMsg.classList.add("d-none")
    return true
  }else{
    productCategory.classList.add("is-invalid")
    productCategory.classList.remove("is-valid")
    categoryeMsg.classList.remove("d-none")
    return false
  }
}

function validateProductImage(){
  var imageMsg = document.getElementById("imageMsg")
  var productImageRegex = /^.+\.(jpg|png|jpeg|avif)$/i
  if(productImageRegex.test(productImage.value)){
    productImage.classList.add("is-valid")
    productImage.classList.remove("is-invalid")
    imageMsg.classList.add("d-none")
    return true
  }else{
    productImage.classList.add("is-invalid")
    productImage.classList.remove("is-valid")
    imageMsg.classList.remove("d-none")
    //عشان نمسح بس ال الصوره انها تظلر في الجمب 
    imagePreview.classList.add("d-none")
    return false
  }
}

function validateProductDesc(){
  var descMsg = document.getElementById("descMsg")
  var productDescRegex = /^.{5,}$/m
  if(productDescRegex.test(productDescribtion.value)){
    productDescribtion.classList.add("is-valid")
    productDescribtion.classList.remove("is-invalid")
    descMsg.classList.add("d-none")
    return true
  }else{
    productDescribtion.classList.add("is-invalid")
    productDescribtion.classList.remove("is-valid")
    descMsg.classList.remove("d-none")
    return false
  }
}
/*
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productImage = document.getElementById("productImage");
var productDescribtion = document.getElementById("productDescribtion");
var imagePreview = document.getElementById("imagePreview");
var badgeCount = document.getElementById("badge-count");
var productSearch = document.getElementById("productSearch");
var searchCategory = document.getElementById("searchCategory");
var addProd = document.getElementById("addProd");
var updProd = document.getElementById("updProd");

var updateIndex;
var productList = []

if(localStorage.getItem("productArray")!== null){
  productList = JSON.parse(localStorage.getItem("productArray"))
  displayProduct(productList)
}

function addProduct(){
  if(validateProductName() && 
  validateProductPrice() &&
  validateProductCategory()&&
  validateProductImage() &&
  validateProductDesc()
){
    var product = {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    description:productDescribtion.value,
    //هنقوله لو الصوره موجوده ضيفها ولو مش موجوده ضيف صوره(no image)
    image:`${productImage.files[0] ? `./IMAGES/${productImage.files[0].name}` : "./IMAGES/no-image.jpg "}`
  }
  productList.push(product);
  localStorage.setItem("productArray" , JSON.stringify(productList))
  clearInputValues();
  displayProduct(productList);
  }else{
    alert("etl3 bara")
  }

}

function clearInputValues(){
  productName.value = ""
  productPrice.value = ""
  productCategory.value = ""
  productDescribtion.value = ""
  
  imagePreview.classList.add("d-none")

  productName.classList.remove("is-valid")
  productImage.classList.remove("is-valid")
  productDescribtion.classList.remove("is-valid")
  productCategory.classList.remove("is-valid")
  productPrice.classList.remove("is-valid")
}


function displayProduct(array){
    badgeCount.innerHTML = `${array.length} product`
    var caartona = ""
    for( var i = 0; i < array.length; i++){
        caartona += `
         <div class="col-lg-4 col-md-6 col-12">
              <div class="card border-0 shadow">
                <div class="position-relative">
                  <img
                    src="${array[i].image}"
                    class="card-img-top image-card"
                    alt="iphone 16 pro"
                    id = "card-image"
                  />
                  <span
                    class="badge rounded-pill badge-card text-bg-primary px-3 py-2 fs-5"
                    >${array[i].category}</span
                  >
                </div>
               <div class="card-body">
                  <h5 class="card-title fs-4">${array[i].name}</h5>
                  <p class="card-text fs-5 text-muted">
                    ${array[i].description}
                  </p>
                  <div class="d-flex justify-content-between">
                    <p class="text-primary fw-semibold fs-3">${array[i].price}</p>
                    <div class="d-flex align-items-center">
                      <button onclick="deletProduct(${i})" class="btn btn-outline-danger rounded-end-0">
                        <i class="fas fa-trash-can"></i>
                      </button>
                      <button onclick="getProductToUpdate(${i})" class="btn btn-outline-warning rounded-start-0">
                        <i class="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `
    }
    document.getElementById("prouductCards").innerHTML = caartona
}

function previewImage(){
  if(productImage.files[0]){
    var fileName = productImage.files[0].name
    imagePreview.src = "./IMAGES/" + fileName
    imagePreview.classList.remove("d-none")
  }
}

function deletProduct(index){
  productList.splice(index,1)
  localStorage.setItem("productArray" , JSON.stringify(productList))
  displayProduct(productList);
}

function searchByName(){
  var searchValue = productSearch.value

 var searchArray = []
  
  for(var i = 0; i < productList.length; i++){
    if(productList[i].name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())){
      searchArray.push(productList[i])
    }
    
  }
  displayProduct(searchArray);
}

function searchByCategory(){
  var searchCategoryValue = searchCategory.value
  var searchCategoryArray = []
  for(var i = 0; i < productList.length; i++){
    if(productList[i].category.trim().toLowerCase().includes(searchCategoryValue.trim().toLowerCase())){
      searchCategoryArray.push(productList[i])
    }
  }
  displayProduct(searchCategoryArray)
}

function getProductToUpdate(index){
  updateIndex = index

  scrollTo(0,0)
  addProd.classList.add("d-none")
  updProd.classList.remove("d-none")

  productName.value = productList[index].name
  productCategory.value = productList[index].category
  productPrice.value = productList[index].price
  productDescribtion.value = productList[index].description
  productImage.value = productList[index].description
}

function uptadeProduct(){
  productList[updateIndex].name = productName.value
  localStorage.setItem("productArray" , JSON.stringify(productList))
  updProd.classList.add("d-none")
  addProd.classList.remove("d-none")
  displayProduct(productList)
  clearInputValues()
}

function validateProductName(){
  var NameMsg = document.getElementById("NameMsg")
  var productNameRegex = /^\w{4,}$/
  if(productNameRegex.test(productName.value)){
    productName.classList.add("is-valid")
    productName.classList.remove("is-invalid")
    NameMsg.classList.add("d-none")
    return true
  }else{
    productName.classList.remove("is-valid")
    productName.classList.add("is-invalid")
    NameMsg.classList.remove("d-none")
    return false
  }
}

function validateProductPrice(){
  var priceMsg = document.getElementById("priceMsg")
  var productPriceRegex = /^[5-9]\d{3,}$/
  if(productPriceRegex.test(productPrice.value)){
    productPrice.classList.add("is-valid")
    productPrice.classList.remove("is-invalid")
    priceMsg.classList.add("d-none")
  }else{
    productPrice.classList.remove("is-valid")
    productPrice.classList.add("is-invalid")
    priceMsg.classList.remove("d-none")
  }
}

function validateProductCategory(){
  var categoryeMsg = document.getElementById("categoryeMsg")
  var producteCategoryRegex = /^(tv|laptop|mobile)$/i
  if(producteCategoryRegex.test(productCategory.value)){
    productCategory.classList.add("is-valid")
    productCategory.classList.remove("is-invalid")
    categoryeMsg.classList.add("d-none")
  }else{
    productCategory.classList.remove("is-valid")
    productCategory.classList.add("is-invalid")
    categoryeMsg.classList.remove("d-none")
  }
}

function validateProductImage(){
  var imageMsg = document.getElementById("imageMsg")
  var productImageRegex = /^.+\.(jpg|png|jpeg|avif)$/i
  if(productImageRegex.test(productImage.value)){
    productImage.classList.add("is-valid")
    productImage.classList.remove("is-invalid")
    imageMsg.classList.add("d-none")
  }else{
    productImage.classList.remove("is-valid")
    productImage.classList.add("is-invalid")
    imageMsg.classList.remove("d-none")
  }
}

function validateProductDesc(){
  var descMsg = document.getElementById("descMsg")
  var productDescRegex = /^.{5,}$/m
  if(productDescRegex.test(productDescribtion.value)){
    productDescribtion.classList.add("is-valid")
    productDescribtion.classList.remove("is-invalid")
    descMsg.classList.add("d-none")
  }else{
    productDescribtion.classList.remove("is-valid")
    productDescribtion.classList.add("is-invalid")
    descMsg.classList.remove("d-none")
  }
}
*/