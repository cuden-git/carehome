// Add your custom JS here.
//import './gm';
import TypeSearch from './type-search';
import CareHomeResults from './care-home-results';
import MapCareHomes from './map-care-homes';
import './carousels';
import ViewSwitch from './view-switch';
import EmailCareer from './email-career';
import MenuCollapse from './menu-collapse';

const careHomeResults = new CareHomeResults();
const typeSearch = new TypeSearch(careHomeResults.stage);
const mapCareHomes = new MapCareHomes();
const viewSwitch = new ViewSwitch();
const emailCareer = new EmailCareer();
const menuCollapse = new MenuCollapse(767);//767 represents the breakpoint to trigger the functionality