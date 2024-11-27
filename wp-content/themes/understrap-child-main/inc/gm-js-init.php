 <!-- prettier-ignore -->
 <script>
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
    ({key: "<?= GOOGLE_API_KEY ?>", v: "weekly"});
    
    // Initialize and add the map
    let map;

    async function initMap() {
      const position = { lat: <?= $map_location['lat'] ?>, lng: <?= $map_location['lng'] ?> };
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      const pin = new google.maps.marker.PinElement({
        background: "#002147",
        borderColor: "#B99475",
        glyphColor: "#B99475",
      });
      map = new Map(document.getElementById("map"), {
        zoom: <?= $map_location['zoom'] ?>,
        center: position,
        mapId: "<?= get_post_field( 'post_name' ) ?>",
      });

      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "<?= get_the_title() ?>",
        content: pin.element,
      });
    }

    initMap();
    
</script>
