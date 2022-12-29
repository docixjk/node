// const express = require("express");

const url = "/customers"
selectAll() //전체 조회
insert() //등록버튼 이벤트 지정
deleted()// 단건조회 , 삭제 
//전체조회 
function selectAll() {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      //list 클리어
      list.innerHTML = '';
      for (let i = 0; i < res.length; i++) {
        const tr =
          `<tr data-id= ${res[i].id}>
            <td><input type="checkbox" /></td>
            <td>${res[i].id}</td>
            <td>${res[i].name}</td>
            <td>${res[i].email}</td>
            <td>${res[i].phone}</td>
            <td>${res[i].address}</td>
            <td><button id="selbtn">조회</button></td>
            <td><button id="delbtn">삭제</button></td>
          </tr>`
        list.innerHTML += tr
      }
    })
}

//등록
function insert() {
  btnadd.addEventListener("click", function (ev) {
    let data = {
      name: names.value,
      email: email.value,
      phone: phone.value,
      address: address.value
    }
    fetch(url, {//요청하는 방식 중 하나
      method: "POST", //post 방식으로 요청
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data) // 바디에서 어떤 데이터를 요청할것이냐
    })
      .then(res => res.json())
      .then(res => { selectAll() })
  })
}


//수정


//삭제
function deleted() {
  //삭제버튼 이벤트
  list.addEventListener("click", function (ev) {
    if (ev.target.id == "selbtn") { //단건조회
      let id = ev.target.closest("tr").getAttribute("data-id")
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then(res => {
          userid.value = res.id;
          names.value = res.name;
          email.value = res.email;
          phone.value = res.phone;
          address.value = res.address;
        })
    } else if ((ev.target.id == "delbtn")) { //해당삭제
      let id = ev.target.closest("tr").getAttribute("data-id")
      fetch(`${url}/${id}`, { method: "DELETE" })
        .then(() => { selectAll() })
    }
  })
}
//단건조회


