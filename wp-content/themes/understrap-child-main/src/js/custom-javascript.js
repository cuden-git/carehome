// Add your custom JS here.
//import './gm';
import TypeSearch from './type-search';
import CareHomeResults from './care-home-results';
import MapCareHomes from './map-care-homes';

import './carousels';

const careHomeResults = new CareHomeResults();
const typeSearch = new TypeSearch(careHomeResults.stage);
const mapCareHomes = new MapCareHomes();

//new Glide('.glide').mount()
