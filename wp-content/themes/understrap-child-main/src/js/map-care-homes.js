import getPosts from "./get-posts";

class MapCareHomes {
  constructor() {
    this.mapStage = document.getElementById('care-homes-maps');
    this.map;
    if(!this.mapStage) {
      return;
    }

    this.locations;
    this.lngLats = [];
   // this.coordsEles = [...document.querySelectorAll('[data-map-coords]')];
    this.chEles = [...document.querySelectorAll('[data-post-id]')];
    this.postIds = this.getPostIds();
    console.log('postIds=', this.postIds);
    console.log('longLats=', this.lngLats);

    getPosts(this.postIds)
    .then((posts) => {
      console.log('Posts = ', posts)
      this.initMap(posts);
    });

    
    const queryString = window.location.search;
    console.log('queryString', queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log('urlParams', urlParams.get('location'));
  
  }

  extractLngLat(str) {
    let lngLat = str.split('/');

    return lngLat;
  }

  getPostIds() {
    let ids = [];

    this.chEles.forEach((item) => {
     ids.push(parseInt(item.getAttribute('data-post-id')));
     let lngLats = this.extractLngLat(item.getAttribute('data-map-coords'));
     this.lngLats.push({lng:parseFloat(lngLats[0]), lat: parseFloat(lngLats[1])});
    })

    return ids;
  }

  async initMap(posts) {
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const bounds = new google.maps.LatLngBounds();

    this.map = new Map(this.mapStage , {
      zoom: 14,
      center: {
        lat: this.lngLats[0].lat,
        lng: this.lngLats[0].lng
      },
      mapId: "CARE_HOME_MAP_ID",
    });

    posts.forEach((item, index) => {
      let pin = new google.maps.marker.PinElement({
        background: "#002147",
        borderColor: "#B99475",
        glyphColor: "#B99475",
      });

      let marker = new AdvancedMarkerElement({
        map: this.map,
        position: {
          lat: this.lngLats[index].lat, 
          lng: this.lngLats[index].lng,
        }, 
        title: item.title,
        content: pin.element,
      });
      let infowindow = new google.maps.InfoWindow({
        content: `<h6>${item.title}</h6>
        <a href="${item.link}">View<a/>`,
        ariaLabel: item.title,
      });
      // infowindow.open({
      //   anchor: marker,
      //   map: this.map,
      // });
      marker.addListener("gmp-click", () => {
        infowindow.open({
          anchor: marker,
          map: this.map,
        });
      });

      bounds.extend(this.lngLats[index]);
    })

    if (this.lngLats.length === 1) {alert('bo');
      this.map.setCenter(this.lngLats[0]);
      this.map.setZoom(14);
    } else {
      this.map.fitBounds(bounds);
    }
    // const marker = new AdvancedMarkerElement({
    //   map: this.map,
    //   position: position,
    //   title: "Uluru",
    // });
  }
}

export default MapCareHomes;
