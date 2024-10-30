<script>
  // Initialize and add the map
  let map;

  async function initMap() {
    // The location of Uluru
    const position = {
      lat: <?= $map_location['lat'] ?>,
      lng: <?= $map_location['lng'] ?>,
    };
    // Request needed libraries.
    //@ts-ignore
    const {
      Map
    } = await google.maps.importLibrary("maps");
    const {
      AdvancedMarkerElement
    } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
      zoom: <?= $map_location['zoom'] ?>,
      center: position,
      mapId: "CAREHOME_MAP_ID",
      mapTypeControl: false
    });

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: "<?= get_the_title() ?>",
    });
  }

  initMap();
</script>
