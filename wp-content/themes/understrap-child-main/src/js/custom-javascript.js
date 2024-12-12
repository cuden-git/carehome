// Add your custom JS here.
//import './gm';
import TypeSearch from "./type-search";
import CareHomeResults from "./care-home-results";
import MapCareHomes from "./map-care-homes";
import "./carousels";
import ViewSwitch from "./view-switch";
import EmailCareer from "./email-career";
import MenuCollapse from "./menu-collapse";
import { chSearch } from "./misc";

const careHomeResults = new CareHomeResults();
const typeSearch = new TypeSearch(careHomeResults.stage);
const mapCareHomes = new MapCareHomes();
const viewSwitch = new ViewSwitch();
const emailCareer = new EmailCareer();
const menuCollapse = new MenuCollapse(767); //767 represents the breakpoint to trigger the functionality

chSearch();

document.addEventListener("DOMContentLoaded", function () {
  AOS.init();

  const navIcons = document.getElementById("nav-icon1");
  const navMenu = document.querySelector(".burger-menu");
  const burgerMenu = () => {
    const mobMenu = document.querySelector(".mobile-menu");
    document.querySelectorAll(".burger").forEach(function (icon) {
      icon.classList.toggle("open");
    });
    mobMenu.classList.toggle("open");
  };

  navIcons.addEventListener("click", function () {
    burgerMenu();
  });
  navMenu.addEventListener("click", function () {
    burgerMenu();
  });
});
