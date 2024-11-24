<?php

/**
 * Care Home Block template.
 * Used fore care-home post type. *
 */

// $intro = get_field('ch_intro');
// $address = get_field('ch_address');
// $contact_info = get_field('ch_contact_details');
// $header_img = get_field('ch_header_img');
$overview = get_field('ch_overview');
$terms = get_the_terms(get_the_ID(), 'care-home-category');
$premium_class = '';
$map_location = get_field('ch_map_location');
$the_team = get_field('ch_the_team');
$tabbed_content = qc_tabbed_content_arrays($the_team['members']);
$ch_services = get_field('ch_services_facilities');
$yt_embed_code = get_field('ch_yt_embed_code');
$gallery = get_field('ch_gallery_carousel');
$is_premium = qc_is_premium();
$related_news = qc_related_news(get_the_ID(), 3);
$related_settings = get_field('ch_latest_news');
//print_r(get_field_objects());die();
//set class hook for Quantum select 
$menu_items = qc_get_section_labels();

?>

<div class="<?= (is_admin())? 'wp-admin-wrap ' : null ?>care-home<?= ($is_premium)? ' care-home--premium' : null ?>">
<?php
  get_template_part( 'partials/header-care-home', null, $gallery);
?>
<?php
if(!empty($menu_items)) {
  $loop_index = 0;
  ?>
  <nav class="care-home__nav">
    <div class="container">
      <ul class="list-inline d-flex justify-content-center">
  <?php
    foreach ($menu_items as $item) {
  ?>
        <li>
          <a href="#section-<?= $loop_index ?>" title="<?= __($item, THEME_NAMESPACE) ?>"><?= __($item, THEME_NAMESPACE) ?></a>
        </li>
  <?php
        ++$loop_index;
      }
  ?>
      </ul>
    </div>
  </nav>
<?php
  }
?>
  <!-- Overview content -->
  <section id="<?php qc_set_achor_index() ?>" class="post-section care-home__overview">
    <div class="container">
      <h2 class="post-section__title"><?= $overview['title'] ?></h2>
      <div class="care-home__overview-text">
        <?= $overview['text'] ?>
        <?php
        if($overview['button']) {
        ?>
          <a href="<?=__($overview['button']['url'], THEME_NAMESPACE) ?>" class="btn <?= ($is_premium)? 'btn-gold' : 'btn-primary' ?>" title="<?=__($overview['button']['title'], THEME_NAMESPACE) ?>"><?=__($overview['button']['title'], THEME_NAMESPACE) ?></a>
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
  <section class="post-section pt-0 care-home__carousel pb-0 <?= ($is_premium)? ' premium' : null ?>">
    <div class="w-100">
      <?php
        get_template_part( 'partials/carousel', null, $gallery);
      ?>
    </div>
  </section>
<?php
}
?>
  
  <!-- Facilities -->
  <section id="<?php qc_set_achor_index() ?>" class="post-section care-home__facilities<?= ($is_premium)? ' care-home--premium' : null ?>">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 care-home__facilities-intro">
          <h2 class="post-section__title post-section__title--lrg"><?= $ch_services['title'] ?></h2>
          <?= $ch_services['text'] ?>
        </div>
        <div class="col-12 col-md-6 care-home__facilities-types">
          <h5 class="post-section__title post-section__title mb-4"><?= __('Types of care we support:', THEME_NAMESPACE) ?></h5>
          <ul class="<?= ($is_premium)? ' gold-bullets' : 'blue-bullets' ?>">
          <?php
          foreach($ch_services['care_type'] as $care_type) { 
          ?>
            <li><?= $care_type ?></li>
          <?php
          }
          ?>
          </ul>
        </div>
        <div class="col-xl-10 mx-auto">
          <div class="splide" data-splide-bp="768" data-splide='{"type":"loop","perPage":2, "pagination": false}' data-arrows>
            <div class="splide__track">
              <ul class="list-inline care-home__facilities-icons d-flex">
            <?php
              foreach($ch_services['facilities'] as $facility) { 
            ?>
                <li class="splide__slide d-flex">
                  <span>
                    <div class="width-90 mx-auto">
                      <?= $facility['label'] ?>
                    </div>
                  </span>
                  <i class="icon-<?= $facility['value'] ?>"></i>
                </li>
            <?php
              }
            ?>
          </ul>
          </div>
            <div class="splide__arrows d-flex justify-content-between d-md-none">
              <i class="splide__arrow splide__arrow--prev icon-arrow-left care-home__carousel-arrow"></i>
              <i class="splide__arrow splide__arrow--next icon-arrow-right care-home__carousel-arrow"></i>
            </div>
          </div>
      </div>
      </div>
    </div>
  </section>
  <!-- YouTube embed code -->
  <section class="pt-0 pb-0 mb-0 post-section<?= ($is_premium)? ' care-home--premium' : null ?>">
      <div class="ratio ratio-16x9">
        <?= $yt_embed_code ?>
      </div>
  </section>
<!-- Tabbed content -->
<section id="<?php qc_set_achor_index() ?>" class=" post-section care-home__team<?= ($is_premium)? ' care-home--premium' : null ?>">
    <div class="container">
      <h2 class="post-section__title mb-5"><?= $the_team['title'] ?></h2>
      <?php
        if(!empty($tabbed_content)) {
      ?>
      <div class="d-flex">
        <!-- <div class="col-12 col-md-3"> -->
          <ul class="nav nav-links flex-column care-home__team-nav" role="tablist" aria-orientation="vertical">
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
        <!-- </div> -->
        <!-- <div class="col-12 col-md-9"> -->
            <div class="tab-content care-home__team-panes">
              <?php
              $loop_index = 0;

              foreach($tabbed_content['content'] as $tab_content) {
              ?>
                <div id="ch-content-<?= $loop_index ?>" class="care-home__team-pane tab-pane fade<?= ($loop_index === 0)? ' show active' : null ?>">
                  <div class="d-flex">
                    <div class="flex-1 care-home__team-member">
                      <figure>
                        <?= $tab_content['img'] ?>
                      </figure>
                      <h4><?= $tab_content['name'] ?></h4>
                      <h6><?= $tab_content['role'] ?></h6>
                    </div>
                    <div class="flex-2 care-home__team-info">
                      <?= $tab_content['description'] ?>
                    </div>
                  </div>
                </div>
          <?php
                ++$loop_index;
              }
            }
          ?>
          <!-- </div> -->
          </div>
      </div>
      <!-- -->
    </div>
  </section>
  <!-- Related news -->
  <section id="<?php qc_set_achor_index() ?>" class="post-section care-home__news<?= ($is_premium)? ' care-home--premium' : null ?>">
    <div class="container">
      <h2 class="post-section__title mb-5"><?= __( $related_settings['title'], THEME_NAMESPACE) ?></h2>
      <div class="row care-home__news-wrap">
      <?php
      foreach($related_news as $news) {
      ?>
      <div class="col-12 col-md-4">
        <div class="care-home__news-card d-flex">
          <figure class="care-home__news-card-img">
            <?= get_the_post_thumbnail($news->ID, "large") ?>
          </figure>
          <div class="care-home__news-card-text d-flex">
            <h4 class="care-home__news-card-title"><?= $news->post_title ?></h4>
            <p><?= $news->post_excerpt ?></p>
            <a href="<?= get_permalink($news->ID) ?>" class="btn <?= ($is_premium)? 'btn-gold' : 'btn-primary' ?>"title="<?= __( $related_settings['post_cta_label'], THEME_NAMESPACE) ?>"><?= __( $related_settings['post_cta_label'], THEME_NAMESPACE) ?></a>
          </div>
        </div>
      </div>
      <?php
      }
      ?>
      </div>
      <!-- TODO: -->
      <a href="<?= get_post_type_archive_link('post') ?>?meta_key=" class="btn <?= ($is_premium)? 'btn-gold' : 'btn-primary' ?>" title="<?= __( $related_settings['achive_cta_label'], THEME_NAMESPACE) ?>"><?= __( $related_settings['achive_cta_label'], THEME_NAMESPACE) ?></a>
    </div>
  </section> 
<!-- -->
  <?php get_template_part('/partials/contact-form', null, ['is_section' => true]) ?>
</div>
<!-- Map -->
<section class="post-section py-0 care-home__location">
    <div class="w-100">
      <?php if ($map_location) { ?>
        <div id="map" class="acf-map care-home__location-map" data-zoom="16"></div>
      <?php } ?>
      </div>
    </div>
  </section> 
<?php
  //Load Google Maps API
  require_once get_stylesheet_directory() . '/inc/gm-js-load.php';

  //Initialise Google Maps for block
  require_once get_stylesheet_directory() . '/inc/blocks/gm-js-init.php';
?>
