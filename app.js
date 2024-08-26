const companyName = $(".name_company");
const nameProduct = $(".name_product");
const desProduct = $(".des_product");
const link_image = $(".link_image");
const original_price = $(".original_price");
const pice = $(".pice");
const buyPrice = $(".buy_price");
const collection = $(".collection");
const outStock = $(".out_stock");
const weight = $(".weight");
const lengthProduct = $(".length");
const width = $(".width");
const height = $(".height");
let dataProducts = [];
let isImageSelected = false;
let datalink = "";
async function handleSave() {
  let firstEmptyField = null;

  function trimAndCheckEmpty(field) {
    if (field) {
      field.value = field.value.trim();
      if (field.value === "") {
        field.style.border = "2px solid red"; // Add red border if empty
        if (!firstEmptyField) {
          firstEmptyField = field; // Set the first empty field
        }
      } else {
        field.style.border = ""; // Remove red border if not empty
      }
    }
  }
  if (!isImageSelected) {
    alertStatus("Lỗi", "Vui lòng thêm ảnh", "error");
  }
  // Trim and check only the required fields
  trimAndCheckEmpty(companyName);
  trimAndCheckEmpty(nameProduct);
  trimAndCheckEmpty(pice);
  trimAndCheckEmpty(original_price);
  trimAndCheckEmpty(buyPrice);
  trimAndCheckEmpty(collection);
  trimAndCheckEmpty(outStock);

  if (firstEmptyField) {
    firstEmptyField.focus();
    alertStatus("Lỗi", "vui lòng điền đủ thông tin", "error");
  } else {
    const formData = new FormData();
    console.log(datalink);
    if (datalink) {
      formData.append("entry.505956557", companyName.value);
      formData.append("entry.1863638133", nameProduct.value);
      formData.append("entry.317256156", desProduct.value);
      formData.append("entry.1258579997", datalink);
      formData.append("entry.1191524847", original_price.value);
      formData.append("entry.571820124", pice.value);
      formData.append("entry.641352626", collection.value);
      formData.append("entry.1075306477", outStock.value);
      formData.append("entry.1551506225", buyPrice.value);
      formData.append("entry.874634289", weight.value);
      formData.append("entry.1454700767", lengthProduct.value);
      formData.append("entry.958301316", width.value);
      formData.append("entry.1932043724", height.value);
      fetch(API_POST, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      }).then(() => {
        alertStatus("Thành công", "Cảm ơn quý khách", "success");
        removeValue();
        const file = elInput.files[0];
        if (!file) {
          return elInput.click();
        }

        // Đặt lại giá trị của input file
        elInput.value = "";
      });
      await renderData();
    }
  }
  $(".img_1").src = "";
  isImageSelected = false;
}

// Function to remove the red border when typing
function removeRedBorderOnInput(field) {
  if (field) {
    field.addEventListener("input", function () {
      field.style.border = ""; // Remove red border on input
    });
  }
}
function removeValue() {
  companyName.value = "";
  nameProduct.value = "";
  desProduct.value = "";
  original_price.value = "";
  pice.value = "";
  buyPrice.value = "";
  collection.value = "";
  outStock.value = "";
  weight.value = "";
  lengthProduct.value = "";
  width.value = "";
  height.value = "";
}
const elInput = document.getElementById("file");
const img = document.getElementById("img");
const uploadBtn = document.getElementById("upload");
const closeImg = $(".close");
uploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const file = elInput.files[0];
  if (!file) {
    return elInput.click();
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    const data = reader.result.split(",")[1];
    const postData = {
      name: nameProduct.value,
      type: file.type,
      data: data,
    };
    postFile(postData);
    isImageSelected = true;
  });
});
// 19gVGrySj6HzxIvSZnpf0iEVBrsJXVTMy
// closeImg.addEventListener("click", async (e) => {
//   e.preventDefault();

//   fetch("https://script.google.com/macros/s/AKfycbyDGQn4CQMXP5y6bt8NyCxCykRRLLsPXDmebQ638MfrJsd9_d1Hk4ONSVmbKYZyVi6O-w/exec", {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id: "19gVGrySj6HzxIvSZnpf0iEVBrsJXVTMy" }),
//     mode: "cors", // Sử dụng "cors" thay vì "no-cors"
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       if (data.status === "success") {
//         console.log("File has been moved to trash:", data);
//       } else {
//         console.error("Error:", data.message);
//       }
//     })
//     .catch((error) => {
//       console.error("Fetch error:", error);
//     });
// });

async function postFile(postData) {
  try {
    const response = await fetch(DRIVE_API, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    datalink = data.link;
    img.src = data.link;
  } catch (error) {
    alert("Vui lòng thử lại");
  }
}
// Attach input event listeners to required fields
removeRedBorderOnInput(companyName);
removeRedBorderOnInput(nameProduct);
removeRedBorderOnInput(pice);
removeRedBorderOnInput(original_price);
removeRedBorderOnInput(buyPrice);
removeRedBorderOnInput(collection);
removeRedBorderOnInput(outStock);
async function getData() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbzcg88_8wn216sgwaCJj6ORjbxWY3Byp9Tu8LKpqf7hSbUskzGY5IC8gJ2_TDvnN5BG/exec");
  const data = await res.json();
  return (dataProducts = data);
}
const popup = $(".popup");
let view = $("tbody");
async function renderData() {
  await getData();
  view.innerHTML = "";
  if (dataProducts.length > 0) {
    dataProducts.forEach((item, index) => {
      view.innerHTML += `
          <tr>
                  <td>${index + 1}</td>
                  <td>${item.nameCompany}</td>
                  <td>${item.nameProduct}</td>
                  <td>${item.desProduct}</td>
                  <td>${item.urlImage}</td>
                  <td>${item.ori_price}</td>
                  <td>${item.price}</td>
                  <td>${item.buy_price}</td>
                  <td>${item.collection}</td>
                  <td>${item.outStock}</td>
                  <td>${item.weight}</td>
                  <td>${item.lengthProduct}</td>
                  <td>${item.width}</td>
                  <td>${item.height}</td>
                  <td>
                  <button onclick="handleEdit(${item.id})" type="button">Edit</button>
                  <button onclick="handleRemove(${item.id})" type-"button">Delete</button>
                  </td>
                </tr>
        `;
    });
  }
}
let idEdit = "";
function handleEdit(id) {
  idEdit = id;
  popup.classList.add("active");

  const product = dataProducts.find((item) => item.id === id);
  $(".popup .name_company").value = product.nameCompany;
  $(".popup .name_product").value = product.nameProduct;
  $(".popup .des_product").value = product.desProduct;
  $(".popup .original_price").value = product.ori_price;
  $(".popup .pice").value = product.price;
  $(".popup .buy_price").value = product.buy_price;
  $(".popup .collection").value = product.collection;
  $(".popup .out_stock").value = product.outStock;
  $(".popup .weight").value = product.weight;
  $(".popup .length").value = product.lengthProduct;
  $(".popup .width").value = product.width;
  $(".popup .height").value = product.height;
  //   $(".popup .name_company").value = "";
}
async function handleSaveEdit() {
  console.log(idEdit);

  // Close the popup
  popup.classList.remove("active");

  // Get updated data from the popup form
  const formData = new FormData();
  formData.append("entry.736135814", idEdit);
  formData.append("entry.505956557", $(".popup .name_company").value);
  formData.append("entry.1863638133", $(".popup .name_product").value);
  formData.append("entry.317256156", $(".popup .des_product").value);
  formData.append("entry.1258579997", datalink);
  formData.append("entry.1191524847", $(".popup .original_price").value);
  formData.append("entry.571820124", $(".popup .pice").value);
  formData.append("entry.641352626", $(".popup .collection").value);
  formData.append("entry.1075306477", $(".popup .out_stock").value);
  formData.append("entry.1551506225", $(".popup .buy_price").value);
  formData.append("entry.874634289", $(".popup .weight").value);
  formData.append("entry.1454700767", $(".popup .length").value);
  formData.append("entry.958301316", $(".popup .width").value);
  formData.append("entry.1932043724", $(".popup .height").value);

  // Send updated data to Google Sheets via PUT request
  fetch(API_POST, {
    method: "POST",
    body: formData,
    mode: "no-cors",
  });
  await getData();
  alertStatus("Thành công", "Dữ liệu đã được cập nhật", "success");
  renderData();
}
async function handleRemove(id) {
  const formData = new FormData();
  formData.append("entry.1674130079", id);
  fetch(API_POST, {
    method: "POST",
    body: formData,
    mode: "no-cors",
  });
  await getData();
  renderData();
  alertStatus("Thành công", "Dữ liệu đã được xóa", "success");

  //   alertStatus("Cảnh báo", "Bạn có chắc muốn xóa không", "warning");
}
getData();
renderData();
