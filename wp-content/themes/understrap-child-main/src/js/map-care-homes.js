import getPosts from "./get-posts";

class MapCareHomes {
  constructor() {
    this.mapStage = document.getElementById('care-homes-maps');
    this.map;
    if(!this.mapStage) {
      return;
    }

    this.locations;
    this.coords = [...document.querySelectorAll('data-map-coords')];
    getPosts()
    .then((posts) => {
      console.log('Posts = ', posts)
    //  this.locations = posts;
      this.initMap(posts);
    });
  }

  async initMap(posts) {
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    this.map = new Map(this.mapStage , {
      zoom: 14,
      center: {lat: posts[0].lat, lng: posts[0].lng },
      mapId: "DEMO_MAP_ID",
    });

    posts.forEach((item, index) => {
      let pin = new google.maps.marker.PinElement({
        background: "#002147",
        borderColor: "#B99475",
        glyphColor: "#B99475",
      });

      let marker = new AdvancedMarkerElement({
        map: this.map,
        position: {lat: item.lat, lng: item.lng },
        title: posts.title,
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
    })
    // const marker = new AdvancedMarkerElement({
    //   map: this.map,
    //   position: position,
    //   title: "Uluru",
    // });
  }
}

export default MapCareHomes;
