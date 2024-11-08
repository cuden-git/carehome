<?php

/**
 * Care Home Block template.
 * Used fore care-home post type. *
 */

$intro = get_field('ch_intro');
$address = get_field('ch_address');
$contact_info = get_field('ch_contact_details');
$terms = get_the_terms(get_the_ID(), 'care-home-category');
$premium_class = '';
$map_location = get_field('ch_map_location');
$rows = get_field('ch_the_team');
$tabbed_content = qc_tabbed_content_arrays($rows);
$ch_services = get_field('ch_services_facilities');
$yt_embed_code = get_field('ch_yt_embed_code');
$brochures = get_field('ch_brochures_guides');
$gallery = get_field('ch_gallery_carousel');

//set class hook for Quantum select 
if($terms) {
  foreach ($terms as $term) {
    if ($term->slug === 'quantum-select') {
      $premium_class = ' carehome--premium';
    }
  }
}

?>
<?php if (is_admin()) { ?>
  <div class="wp-admin-wrap<?= $premium_class ?>">
  <?php } ?>
  <!-- Care Home header -->
  <section class="post-section">
    <header class="container">
      <h2 class="post-section__title"></h2>
      <div class="row">
        <div class="col-md-6">
          <?php
          if(has_term('quantum-select', 'care-home-category')) {
          ?>
          <img src="<?= LOGO_SELECT_SRC ?>" alt="Quantum Care" />
          <?php
          }
          ?>
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
    </header>
  </section>
  <!-- Map -->
  <section class="post-section">
      <div class="container">
        <h2 class="post-section__title"></h2>
        <?php if ($map_location) { ?>
          <div id="map" class="acf-map" data-zoom="16" style="height: 400px; border: solid black 5px"></div>
        <?php } ?>

      </div>
  </section>
  <!-- Tabbed content -->
  <section class="post-section">
    <div class="container d-flex align-items-start">
      <h2 class="post-section__title"></h2>
      <?php
        if(!empty($tabbed_content)) {
      ?>
        <ul class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <?php
          $loop_index = 0;
          foreach($tabbed_content['tabs'] as $tab_label) {
      ?>
          <li>
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#ch-content-<?= $loop_index ?>" type="button" role="tab" aria-controls="home" aria-selected="true"><?= $tab_label ?></button>
          </li>
        <?php
            ++$loop_index;
          }
        ?>
        </ul>
        <div class="tab-content" id="v-pills-tabContent">
          <?php
          $loop_index = 0;

          foreach($tabbed_content['content'] as $tab_content) {
          ?>
            <div id="ch-content-<?= $loop_index ?>" class="row tab-pane fade<?= ($loop_index === 0)? ' show active' : null ?>">
              <div class="col-md-4">
                <?= $tab_content['img'] ?>
                <h5><?= $tab_content['name'] ?></h5>
                <h6><?= $tab_content['role'] ?></h6>
              </div>
              <div class="col-md-8">
                <?= $tab_content['description'] ?>
              </div>
            </div>
      <?php
            ++$loop_index;
          }
        }
      ?>
        </div>
      <!-- -->
    </div>
  </section>
  <!-- Facilities -->
  <section class="post-section">
    <div class="container">
      <h2 class="post-section__title"></h2>
      <div class="row">
        <div class="col-12 col-md-6">
          <?= $ch_services['text'] ?>
        </div>
        <div class="col-12 col-md-6">
          <ul>
          <?php
          foreach($ch_services['care_type'] as $care_type) { 
          ?>
            <li><?= $care_type ?></li>
          <?php
          }
          ?>
          </ul>
        </div>
        <div class="col-12">
          <ul>
        <?php
          foreach($ch_services['facilities'] as $facility) { 
        ?>
            <li><?= $facility ?></li>
        <?php
          }
        ?>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- YouTube embed code -->
  <section class="post-section">
    <div class="container">
      <h2 class="post-section__title"></h2>
      <div class="row">
        <div class="col-12 col-md-6">
            <?= $yt_embed_code ?>
        </div>
      </div>
    </div>
  </section>
  <!-- Brochures & Guides -->
  <?php
if($brochures) {
  ?>
  <section class="post-section">
    <div class="container">
      <h2 class="post-section__title"></h2>
      <div class="row">
        <ul>
        <?php
        foreach($brochures as $brochure) { 
        ?>
          <li>
            <h6><?= $brochure['title'] ?></h6>
            <a href="<?= $brochure['file']['url'] ?>" target="_blank"><?= __('View', THEME_NAMESPACE) ?></a>
          </li>
        <?php
        }
        ?>
        </ul>
      </div>
    </div>
  </section>
<?php
}
?>
<?php
if($gallery) {
?>
  <!-- Carousel -->
  <section class="post-section">
    <div class="container">
      <?php
        get_template_part( 'partials/carousel', null, $gallery);
      ?>
    </div>
  </section>
<?php
}
?>
  <?php if (is_admin()) { ?>
  </div>
<?php } ?>
<?php
  //Load Google Maps API
  require_once get_stylesheet_directory() . '/inc/gm-js-load.php';

  //Initialise Google Maps for block
  require_once get_stylesheet_directory() . '/inc/blocks/gm-js-init.php';
?>
