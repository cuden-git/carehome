<?php

/**
 * Care Home Block template.
 * Used fore care-home post type.
 *
 */

$intro = get_field('ch_intro');
$address = get_field('ch_address');
$contact_info = get_field('ch_contact_details');
$terms = get_the_terms(get_the_ID(), 'care-home-category');
$premium_class = '';
$map_location = get_field('ch_map_location');
print_r($map_location);

foreach ($terms as $term) {
  if ($term->slug === 'quantum-select') {
    $premium_class = ' carehome--premium';
  }
}
?>
<?php if (is_admin()) { ?>
  <div class="wp-admin-wrap<?= $premium_class ?>">
  <?php } ?>
  <!-- -->
  <section class="post-section">
    <div class="container">
      <div class="row">
        <div class="col-md-6">

        </div>
        <div class="col-md-6">
          <address>
            <?= $address['address'] ?>,
            <?= $address['town_city'] ?>,
            <?= $address['county'] ?>,
            <?= $address['post_code'] ?>
            <p>
              T: <a href="tel:<?= $contact_info['telephone_number'] ?>" title="<?= $contact_info['telephone_number'] ?>"><?= $contact_info['telephone_number'] ?></a>
              E: <a href="mail:<?= $contact_info['email'] ?>" title="<?= $contact_info['email'] ?>"><?= $contact_info['email'] ?></a>
            </p>
          </address>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <?= $intro ?>
        </div>
      </div>
    </div>
  </section>
  <!-- -->
  <section class="post-section">
    <div>
      <div class="container">
        <?php if ($map_location) { ?>
          <div id="map" class="acf-map" data-zoom="16" style="height: 400px; border: solid black 5px"></div>
        <?php } ?>

      </div>
  </section>
  <!-- -->
  <?php if (is_admin()) { ?>
  </div>
<?php } ?>
<?php
  //Load Google Maps API
  require_once get_stylesheet_directory() . '/inc/gm-js-load.php';

  //Initialise Google Maps for block
  require_once get_stylesheet_directory() . '/inc/blocks/gm-js-init.php';
?>
