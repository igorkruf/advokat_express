console.log("подключили скрипты");
let gm;
let nm;
let nl; //.nav__link
let razdels;
let questions;
let start = function () {
  razdels = document.querySelectorAll(".razdel");
  nm = document.querySelector(".navmenu");
  gml1 = document.querySelector(".gml:nth-child(1)");
  gml3 = document.querySelector(".gml:nth-child(3)");
  gm = document.querySelector(".header_hamburgermenu");
  gm.addEventListener("click", gm_toggle);
  //массив навигационных ссылок
  nl = document.querySelectorAll(".nav__link");
  nl.forEach((elem) => {
    elem.addEventListener("click", function () {
      if (!this.classList.contains("active")) {
        nl.forEach((elem) => {
          elem.classList.remove("active");
        });
        this.classList.add("active");
      }
      console.log(this.dataset.razdel);
      scrollingtorazdel(this.dataset.razdel);
      gm_toggle();
    });
  });
  questions = document.querySelectorAll(".faqs__question");

  questions.forEach((elem) => {
    elem.addEventListener("click", function () {
      // questions.forEach((elem) => {});
      this.classList.toggle("open");
      let answer = this.nextElementSibling;
      if (elem.classList.contains("open")) {
        answer.style.height = `${answer.scrollHeight}px`;
        answer.style.opacity = 1;
      } else {
        answer.style.height = `0px`;
        answer.style.opacity = 0;
      }
    });
  });

  //intersection observe
  const optionsIORazdel = {
    rootMargin: "-100px",
    threshold: 0,
  };

  let razdel = function (entries, observerRazdel) {
    //entry- переводится как вход
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry.target);
        console.log("сроботало");
        entry.target.classList.remove("unvisible");
        let visibleRazdel = entry.target.dataset.razdel;
        let navLink = document.querySelector(
          `.nav__link[data-razdel="${visibleRazdel}"]`
        );
        activatedNavLink(navLink);
      }
    });
  };
  let observerRazdel = new IntersectionObserver(razdel, optionsIORazdel);

  razdels.forEach((elem) => {
    observerRazdel.observe(elem);
  });
};
//Запускаем функцию start только после того как браузер полностью загрузил HTML-код страницы и построил дерево DOM.
document.addEventListener("DOMContentLoaded", start);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gm_toggle() {
  console.log("кликнули по gm");
  gm.classList.toggle("active");
  if (gm.classList.contains("active")) {
    gm.classList.remove("inactive");
    nm.classList.remove("unvisible_navmenu");
    nm.classList.add("visible_navmenu");
  } else {
    gm.classList.add("inactive");
    nm.classList.remove("visible_navmenu");
    nm.classList.add("unvisible_navmenu");
  }
  console.log(nm);
}
//прокрутка по клику на пункт меню до раздела с data-razdel=""
function scrollingtorazdel(namerazdel) {
  console.log(namerazdel);
  let razdel = document.querySelector(`[data-razdel=${namerazdel}]`);
  let y = razdel.getBoundingClientRect().y;
  let otstupTop = y - 100;
  window.scrollBy({
    top: otstupTop,
    behavior: "smooth",
  });
}
//активация ссылки на раздел при прокрутке контента страницы
function activatedNavLink(navlink) {
  nl.forEach((elem) => {
    elem.classList.remove("active");
  });
  navlink.classList.add("active");
}
