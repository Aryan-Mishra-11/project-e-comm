"use strict";

const product_request = {
  id: "370860fc-ca9b-4178-9183-98333f0d0a45",
};

const prodHead = document.querySelector("#prodhead1");
const prodHeadList = document.querySelector("#details");
const sellerInfoList = document.querySelector("#sellerinfo");
let prodHeadData;

const fillProdlist = function (prop, value) {
  return `<p>${prop}: ${value}</p>`;
};

const fillProdHeader = function (data) {
  let count = 0;
  console.log(data);
  prodHead.textContent = `${data.brand} ${data.name}`;
  // for (const [k, v] of Object.entries(data)) {
  //   if (!(k === "brand" || k === "name" || k === "id")) {
  //     prodHeadList.insertAdjacentHTML("beforeend", fillProdlist(k,v));
  //   }
  // }

  // adding colors of the product to UI
  const prodColors = data.colorOptions.split(",");
  prodColors.forEach((element) => {
    if (count === 0) {
      prodHeadList.insertAdjacentHTML(
        "beforeend",
        `<span class='prodheadlist'>Colors&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
      );
    }
    if (count === prodColors.length - 1) {
      prodHeadList.insertAdjacentHTML(
        "beforeend",
        `<button class='dot' id='color${count}'></button></span><br>`
      );
    } else {
      prodHeadList.insertAdjacentHTML(
        "beforeend",
        `<button class='dot' id='color${count}'></button>&nbsp;`
      );
    }
    document.querySelector(`#color${count}`).style.backgroundColor = element;
    count += 1;
  });

  count = 0;
  // adding ram variants of the product to UI
  const prodRam = data.ramOptions.split(",");
  prodRam.forEach((element) => {
    if (count === 0) {
      prodHeadList.insertAdjacentHTML(
        "beforeend",
        `<span class='prodheadlist'>Ram &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
      );
    }
    if (count === prodRam.length - 1) {
      prodHeadList.insertAdjacentHTML(
        "beforeend",
        `<button class='prodheadlist button'>${element}</button></span><br>`
      );
    } else {
      prodHeadList.insertAdjacentHTML(
        "beforeend",
        `<button class='prodheadlist button'>${element}</button> &nbsp`
      );
    }
    count += 1;
  });

  //Warranty info
  prodHeadList.insertAdjacentHTML(
    "beforeend",
    `<span class='prodheadlist'>Warranty    <span>${data.warranty} year &nbsp</span></span><br>`
  );

  //add Seller info
  count = 0;
  data.sellerInfo.forEach((element) => {
    document.querySelector(".seller").classList.remove("hidden");
    // document.querySelector("#seller1").textContent = element.name;
    sellerInfoList.insertAdjacentHTML(
      "beforeend",
      `<option value="${element.name}" id="seller${count}">${element.name}</option>`
    );
    count += 1;
  });

  //Add price as per seller
  data.sellerInfo.forEach((element) => {
    if (element.name === sellerInfoList.value)
      prodHeadList.insertAdjacentHTML(
        "beforeend",
        `<br><span id='price'>Price  ${element.price}</span>`
      );
  });

  sellerInfoList.addEventListener("change", (e) => {
    document.querySelector("#price").remove();
    data.sellerInfo.forEach((element) => {
      if (element.name === sellerInfoList.value)
        prodHeadList.insertAdjacentHTML(
          "beforeend",
          `<span id='price'>Price  ${element.price}</span>`
        );
    });
  });
};

const getProduct = async function (url, data1 = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      //    mode: "cors",
      headers: {
        // "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data1), // body data type must match "Content-Type" header
    });
    if (!response.ok) {
      // parses JSON response into native JavaScript objects
      throw new Error("API fault");
    } else {
      return response.json();
    }
  } catch (e) {
    throw new Error("API fault");
  }
};

getProduct(
  "https://e-commerce-production-cd6c.up.railway.app/v1/phone-header-api",
  product_request
)
  .then((data) => fillProdHeader(data))
  .catch((err) => console.error(err));
