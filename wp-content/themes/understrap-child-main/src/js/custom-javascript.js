// Add your custom JS here.
//import './gm';
import TypeSearch from './type-search';
import CareHomeResults from './care-home-results';
import MapCareHomes from './map-care-homes';
import './carousels';
import ViewSwitch from './view-switch';

const careHomeResults = new CareHomeResults();
const typeSearch = new TypeSearch(careHomeResults.stage);
const mapCareHomes = new MapCareHomes();
const viewSwitch = new ViewSwitch();
//new Glide('.glide').mount()
