<?php
$map_location = get_field('contact_info', 'option');
$map_location['zoom'] = 14;
?>
<div id="map" class="site__map"></div>
<?php require_once get_stylesheet_directory() . '/inc/gm-js-init.php' ?>
