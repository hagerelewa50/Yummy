let innerWidth = $(".nav-item").outerWidth(true)
$(".nav-side").animate({left:`-${innerWidth}px`})
$(".open-close-icon").click(function(){
    let left = $(".nav-side").css("left")
    if(left=="0px"){
        $(".nav-side").animate({left:`-${innerWidth}px`},500)
         $(".open-close-icon").removeClass("fa-x").addClass("fa-align-justify")
         $(".nav-link").animate({marginTop:"100px"},500)
    }else{
        $(".nav-side").animate({left:"0px"})
        $(".nav-link").animate({marginTop:"15px"},500)
        // anthor solution for animation nav-link
        // for(var i = 0;i < 5 ;i++){
        //     $(".nav-link").eq(i).animate({marginTop:"15px"},(i+5)*100)
        // }
        $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x")
    }
})
$(document).ready(function(){
    $(".loading").fadeOut(1000)
})

async function getData(name=""){
    $(".loading").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let response = await api.json()
    $("#home").removeClass("d-none")
    displayHome(response.meals.slice(0 , 20))
    $(".loading").fadeOut(300)  
}
getData()

function displayHome(response){
    // $("#ingredients").addClass("d-none")

    $("#home").removeClass("d-none")
    var meal = ""
    for(var i = 0 ; i < response.length;i++){
        meal+=` <div class="col-lg-3 col-md-6">
        <div class="items-meal">
            <div class="meal position-relative" idMeal="${response[i].idMeal}">
                <img src="${response[i].strMealThumb}" class="w-100  rounded-3">
                <div class="layer-meal position-absolute start-0 end-0 bottom-0 top-100 rounded-3 text-black d-flex align-items-center">
                    <h3 class="ps-2">${response[i].strMeal}</h3>
                </div>
            </div>
        </div>

    </div>`
    }
    document.getElementById("mealHome").innerHTML= meal
    $(".meal").click(function(){
        $("#home").addClass("d-none")
        $("#details").removeClass("d-none")
        let idMeal=$(this).attr("idMeal")
        getDetailMeal(idMeal)
    })
}
// detail meal
async function getDetailMeal(idMeal){ 
    $(".loading").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    let response = await api.json()
    detailMeal(response)
    $(".loading").fadeOut(300)

}

function detailMeal(response){
    let mealDet= response.meals[0]
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (mealDet[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${mealDet[`strMeasure${i}`]} ${mealDet[`strIngredient${i}`]}</li>`
        }
    }
    if(mealDet.strTags!=null){
        let myArray=mealDet.strTags.split(",")
        var tag=""
        for(let i=0;i < myArray.length ; i++){
          tag+=` <li class="alert alert-danger p-1 m-2 ">${myArray[i]}</li>`
        }
    }else{
        tag=""
    }
    let temp=` <div class="col-md-4">
    <img src="${mealDet.strMealThumb}" class="w-100 rounded-3">
    <h2>${mealDet.strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions </h2>
    <p>${mealDet.strInstructions}</p>
    <h3>Area : ${mealDet.strArea} </h3>
    <h3>Category :${mealDet.strCategory} </h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex flex-wrap">
        ${ingredients}
    </ul>
    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex flex-wrap">
       ${tag}
    </ul>
    <a target="_blank" href="${mealDet.strSource}" class="btn btn-success">Source</a>
    <a target="_blank" href="${mealDet.strYoutube}" class="btn btn-danger">Youtube</a>
</div>`
document.getElementById("detailRow").innerHTML= temp
}
// search
$("#searchInput").click(function(){
    $("#home").addClass("d-none")
    $("#details").addClass("d-none")
    $("#contact").addClass("d-none")
    $("#Area").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#Search").removeClass("d-none")
    $("#category").addClass("d-none")

    let searchNameValue = document.getElementById("searchName")
    let searchLetterValue = document.getElementById("searchLetter")

    searchNameValue.addEventListener("keyup",function(){
        let name = searchNameValue.value
        getDataSearchFullName(name)
    })
    searchLetterValue.addEventListener("keyup",function(){
        let letter = searchLetterValue.value
        if(letter == ""  || letter==" "){
            getDataSearchLetter(letter="a")
        }else(
            getDataSearchLetter(letter)
        )
    })
})

async function getDataSearchFullName(name){
    $(".loading").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let response = await api.json()
    if(response.meals!=null){
        displaySearch(response.meals.slice(0, 20))
        $(".loading").fadeOut(300)
        $(".meal").click(function(){
            $("#Search").addClass("d-none")
            $("#details").removeClass("d-none")
            let idMeal=$(this).attr("idMeal")
            getDetailMeal(idMeal)
        })
    }
    $(".loading").fadeOut(300)
}
async function getDataSearchLetter(letter){
    $(".loading").fadeIn(300)

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let response = await api.json()
        displaySearch(response.meals.slice(0, 20))
        $(".meal").click(function(){
            $("#Search").addClass("d-none")
            $("#details").removeClass("d-none")
            let idMeal=$(this).attr("idMeal")
            getDetailMeal(idMeal)
        })
        $(".loading").fadeOut(300)
}
function displaySearch(response){
    let meal = ""
    for(let i = 0 ; i < response.length ;i++){
        meal+=` <div class="col-lg-3 col-md-6">
        <div class="items-meal">
            <div class="meal position-relative" idMeal="${response[i].idMeal}">
                <img src="${response[i].strMealThumb}" class="w-100  rounded-3">
                <div class="layer-meal position-absolute start-0 end-0 bottom-0 top-100 rounded-3 text-black d-flex align-items-center">
                    <h3 class="ps-2">${response[i].strMeal}</h3>
                </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById("searchData").innerHTML= meal
}
// category
$("#categoryInput").click(function(){
    $("#home").addClass("d-none")
    $("#Search").addClass("d-none")
    $("#details").addClass("d-none")
    $("#Area").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#contact").addClass("d-none")
    $("#category").removeClass("d-none")
    getCategory()
})

async function getCategory(){
    $(".loading").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let response = await api.json()
   disPlayCategory(response.categories.slice(0, 20))
   $(".loading").fadeOut(300)
   $(".layer-meal").click(function(){
    $("#category").addClass("d-none")
    let nameCategory=$(this).attr("nameCategory")
     getData(nameCategory)
   })
}

function disPlayCategory(response){
   let temp =""
   for(let i=0 ;i < response.length; i++ ){
    temp +=`<div class="col-lg-3 col-md-6">
    <div class="items-meal">
        <div class="meal position-relative overflow-hidden">
            <img src="${response[i].strCategoryThumb}" class="w-100  rounded-3">
            <div class="layer-meal position-absolute start-0 end-0 bottom-0 top-100 rounded-3 text-black text-center p-2" nameCategory="${response[i].strCategory}">
                <h3>${response[i].strCategory}</h3>
                <p>${response[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>
</div>`
}

document.getElementById("categoryRow").innerHTML=temp
}
// area
$("#areaInput").click(function(){
    $("#home").addClass("d-none")
    $("#Search").addClass("d-none")
    $("#details").addClass("d-none")
    $("#category").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#contact").addClass("d-none")
    $("#Area").removeClass("d-none")
    getArea()
})
async function getArea(){
    $(".loading").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response = await api.json()
    disPlayArea(response.meals)
    $(".loading").fadeOut(300)

}
function disPlayArea(response){
    let temp =""
    for(let i=0 ;i < response.length; i++ ){
     temp +=`<div class="col-lg-3 col-md-6">
     <div onclick="disPlayAreaMeal('${response[i].strArea}')"  class="area-meal text-center">
         <i class="fa-solid fa-house-laptop fa-4x"></i>
         <h3>${response[i].strArea}</h3>  
     </div>
 </div>`
 }
 
 document.getElementById("areaRow").innerHTML=temp

}
async function disPlayAreaMeal(area){
    $(".loading").fadeIn(300)
    $("#Area").addClass("d-none")
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response = await api.json()
    displayHome(response.meals.slice(0 , 20))
    $(".loading").fadeOut(300)

}
// ingredients
$("#ingredientsInput").click(function(){
    $("#home").addClass("d-none")
    $("#Search").addClass("d-none")
    $("#details").addClass("d-none")
    $("#category").addClass("d-none")
    $("#Area").addClass("d-none")
    $("#contact").addClass("d-none")
    $("#ingredients").removeClass("d-none")

    getIngredient()
})
async function getIngredient(){
    $(".loading").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let response = await api.json()
    disPlayIngredient(response.meals.slice(0,20))
    $(".loading").fadeOut(300)


}
function disPlayIngredient(response){
    let temp =""
    for(let i=0 ;i < response.length; i++ ){
     temp +=` <div class="col-lg-3 col-md-6">
     <div class="area-meal text-center" onclick="disPlayIngredientMeal('${response[i].strIngredient}')">
         <i class="fa-solid fa-drumstick-bite fa-4x"></i>
         <h3>${response[i].strIngredient}</h3> 
         <p>${response[i].strDescription.split(" ").slice(0,25).join(" ")}</p> 
     </div>
 </div>`
 }
 
 document.getElementById("ingredientRow").innerHTML=temp
}

async function disPlayIngredientMeal(ingred){
    $(".loading").fadeIn(300)
    $("#ingredients").addClass("d-none")
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`)
    let response = await api.json()
    displayHome(response.meals.slice(0 , 20))
    $(".loading").fadeOut(300)

}

// contacts
$("#ContactInput").click(function(){
    $("#home").addClass("d-none")
    $("#Search").addClass("d-none")
    $("#details").addClass("d-none")
    $("#category").addClass("d-none")
    $("#Area").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#contact").removeClass("d-none")
})
let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let phoneInput = document.getElementById("phoneInput")
let ageInput = document.getElementById("ageInput")
let passInput = document.getElementById("passInput")
let repassInput = document.getElementById("repassInput")
let nameAlert = document.getElementById("nameAlert")
let emailAlert = document.getElementById("emailAlert")
let phoneAlert = document.getElementById("phoneAlert")
let ageAlert = document.getElementById("ageAlert")
let passAlert = document.getElementById("passAlert")
let repassAlert = document.getElementById("repassAlert")
let btnSubmit = document.getElementById("btnSubmit")
let rowForm = document.getElementById("rowForm")

    //  validation
rowForm.addEventListener("keyup",function(){
    if(nameValidation()== true && emailValidation()== true && phoneValidation()== true && ageValidation()== true && passValidation()== true && repassValidation() == true){
        btnSubmit.removeAttribute("disabled")
    }else{
        btnSubmit.setAttribute("disabled",true)
    }
})
nameInput.addEventListener("keyup",nameValidation)
function nameValidation(){
    let regName = /^[a-zA-Z ]+$/
    if (regName.test(nameInput.value)==true){
        nameAlert.classList.add("d-none")
        return true
    }else{
        nameAlert.classList.remove("d-none")
        return false
    }
}
emailInput.addEventListener("keyup",emailValidation)
function emailValidation(){
    let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regEmail.test(emailInput.value)==true){
        emailAlert.classList.add("d-none")
        return true
    }else{
        emailAlert.classList.remove("d-none")
        return false
    }
}
phoneInput.addEventListener("keyup",phoneValidation)
function phoneValidation(){
    let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (regPhone.test(phoneInput.value)==true){
        phoneAlert.classList.add("d-none")
        return true
    }else{
        phoneAlert.classList.remove("d-none")
        return false
    }
}
ageInput.addEventListener("keyup",ageValidation)
function ageValidation(){
    let regAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    if (regAge.test(ageInput.value)==true){
        ageAlert.classList.add("d-none")
        return true
    }else{
        ageAlert.classList.remove("d-none")
        return false
    }
}
passInput.addEventListener("keyup",passValidation)
function passValidation(){
    let regPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if (regPass.test(passInput.value)==true){
        passAlert.classList.add("d-none")
        return true
    }else{
        passAlert.classList.remove("d-none")
        return false
    }
}
repassInput.addEventListener("keyup",repassValidation)
function repassValidation(){
    if (repassInput.value == passInput.value){
        repassAlert.classList.add("d-none")
        return true
    }else{
        repassAlert.classList.remove("d-none")
        return false
    }
}