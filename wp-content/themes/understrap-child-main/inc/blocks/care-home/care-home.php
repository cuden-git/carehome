<?php

/**
 * Care Home Block template.
 * Used fore care-home post type. *
 */

$intro = get_field('ch_intro');
$address = get_field('ch_address');
$contact_info = get_field('ch_contact_details');
$header_img = get_field('ch_header_img');
$overview = get_field('ch_overview');
$terms = get_the_terms(get_the_ID(), 'care-home-category');
$premium_class = '';
$map_location = get_field('ch_map_location');
$rows = get_field('ch_the_team');
$tabbed_content = qc_tabbed_content_arrays($rows);
$ch_services = get_field('ch_services_facilities');
$yt_embed_code = get_field('ch_yt_embed_code');
$brochures = get_field('ch_brochures_guides');
$gallery = get_field('ch_gallery_carousel');
$is_premium = (has_term('quantum-select', 'care-home-category'))? true : false;
//set class hook for Quantum select 
if($terms) {
  
  // foreach ($terms as $term) {
  //   if ($term->slug === 'quantum-select') {
  //     $premium_class = ' carehome--premium';
  //   }
  // }
}

?>

<div class="<?= (is_admin())? 'wp-admin-wrap ' : null ?>care-home<?= ($is_premium)? ' care-home--premium' : null ?>">

  <!-- Care Home header -->
  <section class="post-section care-home__header">
    <header class="container">
      <div class="row">
        <h2 class="post-section__title"><?php the_title() ?></h2>      
        <div class="col-md-6">
          <?php
          if($is_premium) {
          ?>
          <img src="<?= LOGO_SELECT_SRC ?>" class="care-home__header-logo" alt="Quantum Care" />
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
          <?php
          if($header_img['ID']) {
          ?>
          <figure class="care-home__header-img">
            <?= wp_get_attachment_image($header_img['ID'], 'large') ?>
          </figure>
          <?php
          }
          ?>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <?= $intro ?>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <a href="<?= get_permalink(get_the_ID()) ?>" class="btn btn-gold btn-gold--inverse titl="<?= __('Find Out More', THEME_NAMESPACE) ?>"><?= __('Find Out More', THEME_NAMESPACE) ?></a>
        </div>
      </div>
    </header>
  </section> 
  <!-- Overview content -->
  <section class="post-section bg-gold-light care-home__overview">
    <div class="container">
      <h2 class="post-section__title"><?= $overview['title'] ?></h2>
      <div class="care-home__overview-text">
        <?= $overview['text'] ?>
        <?php
        if($overview['button']) {
        ?>
          <a href="<?=__($overview['button']['url'], THEME_NAMESPACE) ?>" class="btn btn-gold" title="<?=__($overview['button']['title'], THEME_NAMESPACE) ?>"><?=__($overview['button']['title'], THEME_NAMESPACE) ?></a>
        <?php
        }
        ?>
      </div>
    </div>
  </section>
  <?php
if($gallery) {
?>
  <!-- Carousel -->
  <section class="post-section ch__carousel">
    <div class="container">
      <?php
        get_template_part( 'partials/carousel', null, $gallery);
      ?>
    </div>
  </section>
<?php
}
?>
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
  <section class="post-section bg-gold-light care-home__team">
    <div class="container">
      <h2 class="post-section__title"></h2>
      <?php
        if(!empty($tabbed_content)) {
      ?>
      <div class="row">
        <div class="col-12 col-md-3">
          <ul class="nav nav-links flex-column" role="tablist" aria-orientation="vertical">
        <?php
            $loop_index = 0;
            foreach($tabbed_content['tabs'] as $tab_label) {
        ?>
            <li class="nav-item">
              <a class="nav-link<?= ($loop_index === 0)? ' active' : null ?>" href="#ch-content-<?= $loop_index ?>" data-bs-toggle="tab" role="tab"><?= $tab_label ?></a>
            </li>
          <?php
              ++$loop_index;
            }
          ?>
          </ul>
        </div>
        <div class="col-12 col-md-9">
            <div class="tab-content">
              <?php
              $loop_index = 0;

              foreach($tabbed_content['content'] as $tab_content) {
              ?>
                <div id="ch-content-<?= $loop_index ?>" class="tab-pane fade<?= ($loop_index === 0)? ' show active' : null ?> row" aria-orientation="vertical">
                  <div class="row">
                    <div class="col-md-4">
                      <figure>
                        <?= $tab_content['img'] ?>
                      </figure>
                      <h5><?= $tab_content['name'] ?></h5>
                      <h6><?= $tab_content['role'] ?></h6>
                    </div>
                    <div class="col-md-8">
                      <?= $tab_content['description'] ?>
                    </div>
                  </div>
                </div>
          <?php
                ++$loop_index;
              }
            }
          ?>
          </div>
        </div>
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
          <ul class="list-inline d-flex">
        <?php
          foreach($ch_services['facilities'] as $facility) { 
        ?>
            <li class="d-flex flex-column align-items-center">
              <span>
                <?= $facility['label'] ?>
              </span>
              <i class="icon-<?= $facility['value'] ?>"></i>
            </li>
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
        <div class="col-12">
          <div class="ratio ratio-16x9">
            <?= $yt_embed_code ?>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Brochures & Guides -->
  <?php
if($brochures) {
  ?>
  <section class="post-section care-home__brochures">
    <div class="container">
      <h2 class="post-section__title"><?= __('Brochures & Guides', THEME_NAMESPACE) ?></h2>
      <div class="row">
        <ul>
        <?php
        foreach($brochures as $brochure) { 
        ?>
          <li class="d-flex justify-content-between align-items-center">
            <h6><?= $brochure['title'] ?></h6>
            <a href="<?= $brochure['file']['url'] ?>" class="btn<?= ($is_premium)? ' btn-gold' : ' btn-primary' ?>" target="_blank"><?= __('View', THEME_NAMESPACE) ?></a>
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
</div>
<?php
  //Load Google Maps API
  require_once get_stylesheet_directory() . '/inc/gm-js-load.php';

  //Initialise Google Maps for block
  require_once get_stylesheet_directory() . '/inc/blocks/gm-js-init.php';
?>
