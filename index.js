const popUpEl = document.getElementsByClassName("pop-up")[0];
const dataContainer = document.getElementById("data");
let popUpOpenButton = null;
const popUpDataElementsIds = [
  "pop-up__name",
  "pop-up__second-name",
  "pop-up__patronymic",
  "pop-up__email",
  "pop-up__password",
];

function openPopUp() {
  popUpEl.classList.remove("pop-up--closed");
  window.addEventListener("click", clickOutSidePopUp);
}

function closePopUp() {
  window.removeEventListener("click", clickOutSidePopUp);
  popUpEl.classList.add("pop-up--closed");

  appendData();
  clearPopUp();
}

function clickOutSidePopUp(event) {
  if (!popUpOpenButton) {
    popUpOpenButton = event.target;
    return;
  }

  const popUp = document.getElementById("pop-up__container");

  if (
    popUpOpenButton !== event.target &&
    popUp !== event.target &&
    !popUp.contains(event.target)
  ) {
    closePopUp();
  }
}

function appendData() {
  const divNode = document.createElement("div");
  divNode.classList.add("data__container");
  const dataObj = {};

  popUpDataElementsIds.forEach((id) => {
    const dataNode = document.getElementById(id);
    const data = `${dataNode.placeholder}: ${dataNode.value}`;
    dataObj[dataNode.placeholder] = dataNode.value;
    divNode.appendChild(createPTag(data));
  });

  divNode.appendChild(createPTag(JSON.stringify(dataObj)));

  dataContainer.appendChild(divNode);
}

function createPTag(data) {
  const pNode = document.createElement("p");
  pNode.innerText = data;
  return pNode;
}

function clearPopUp() {
  popUpDataElementsIds.forEach((id) => {
    document.getElementById(id).value = "";
  });
}
