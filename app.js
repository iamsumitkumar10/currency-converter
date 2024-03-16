const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.min.json";
// const apikey="710383ab23f15259a4c8ec13";
// const BASE_URL="https://v6.exchangerate-api.com/v6/710383ab23f15259a4c8ec13/";

// const BASE_URL= `https://v6.exchangerate-api.com/v6/${apikey}/latest/currencies/`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form button ");   

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");
let i=0;
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name ==="from" && currcode === "USD"){
            newOption.selected =" selected";
        } else if(select.name ==="to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}


// update flag to their name 
const updateFlag = (element) => {
    // console.log(element);
    let currcode = element.value;
    let country_code = countryList[currcode];
    let newSrc= `https://flagsapi.com/${country_code}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};



btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amounts = document.querySelectorAll(".amount input");
    let amtVal = amounts.value;
    // console.log(amtVal)
    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amounts.value="1";
    }
    // console.log(fromcurr.value, tocurr.value);
    const URL =`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    console.log(rate);


    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;


}); 
