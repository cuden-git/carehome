<?php

/**
 * Care Home Block template.
 * Used fore care-home post type. *
 */

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
$day_care = get_field('day_care');

//set class hook for Quantum select 
$menu_items = qc_get_section_labels();
$reviews = get_field('ch_reviews');
?>

<div class="<?= (is_admin())? 'wp-admin-wrap ' : null ?>care-home<?= ($is_premium)? ' care-home--premium' : null ?>">
<?php
  get_template_part( 'partials/header-care-home', null, $gallery);
?>
<?php
if(!empty($menu_items)) {
  $loop_index = 0;
  ?>
  <nav class="care-home__nav" id="more">
    <div class="menu-collapse">
      <div class="d-md-none d-flex h-100 menu-collapse__display align-items-center justify-content-center"><span></span><i class="icon-arrow-down"></i></div>
      <ul class="list-inline d-flex flex-md-row flex-column justify-content-center">
  <?php
    foreach ($menu_items as $item) {
  ?>
        <li class="w-100 text-center">
          <a href="#section-<?= $loop_index ?>" class="py-3" title="<?= __($item, THEME_NAMESPACE) ?>"><?= __($item, THEME_NAMESPACE) ?></a>
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
<?php
  if($overview) {
?>
  <!-- Overview content -->
  <section id="<?php qc_set_achor_index() ?>" class="post-section care-home__overview" >
    <div class="container">
      <h2  data-aos="fade-up" class="post-section__title mb-3"><?= $overview['title'] ?></h2>
      <div class="care-home__overview-text"  data-aos="fade-up">
        <?= $overview['text'] ?>
        <?php
        if($overview['button']) {
        ?>
        <div>
          <a data-aos="fade-up"  href="<?=__($overview['button']['url'], THEME_NAMESPACE) ?>" class="mt-4 btn <?= ($is_premium)? 'btn-gold' : 'btn-primary' ?>" title="<?=__($overview['button']['title'], THEME_NAMESPACE) ?>"><?=__($overview['button']['title'], THEME_NAMESPACE) ?></a>
          </div>
        <?php
        }
        ?>
        
      </div>
    </div>
  </section>
  <?php
  }
if($gallery) {
?>
  <!-- Carousel -->
  <section class="post-section pt-0 care-home__carousel pb-0 <?= ($is_premium)? ' premium' : null ?>"  >
    <div class=" container">
      <div class="w-100" data-aos="fade-up">
        <?php
          get_template_part( 'partials/carousel', null, $gallery);
        ?>
      </div>
  </div>
  </section>
<?php
}
if($ch_services) {
?>
  
  <!-- Facilities -->
  <section id="<?php qc_set_achor_index() ?>" class=" post-section care-home__facilities<?= ($is_premium)? ' care-home--premium' : null ?>"  >
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 care-home__facilities-intro" data-aos="fade-up">
          <h2 class="mb-4"><?= $ch_services['title'] ?></h2>
          <?= $ch_services['text'] ?>
        </div>
        <div class="col-12 col-md-6 care-home__facilities-types" data-aos="fade-up">
          <h4 class="mb-4"><?= __('Types of care we support:', THEME_NAMESPACE) ?></h4>
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
        <div class="col-xl-10 mx-auto mt-md-5 mt-0 pt-5" data-aos="fade-up">
          <div class="splide" data-splide-bp="768" data-splide='{"type":"loop","perPage":2, "pagination": false}' data-arrows>
            <div class="splide__track">
            <div class="splide__arrows d-flex justify-content-between d-md-none mb-4">
              <i class="splide__arrow splide__arrow--prev icon-arrow-left care-home__carousel-arrow"></i>
              <i class="splide__arrow splide__arrow--next icon-arrow-right care-home__carousel-arrow"></i>
            </div>
              <ul class="splide__list list-inline care-home__facilities-icons d-flex">
            <?php
              foreach($ch_services['facilities'] as $facility) { 
            ?>
                <li class="splide__slide d-flex" data-aos="fade-up">
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
           
          </div>
      </div>
      </div>
    </div>
  </section>
<?php
}

if($day_care) { ?>
  <section id="day-care" class="post-section mb-5 care-home__overview care-home<?= ($is_premium)? ' care-home--premium' : null ?>" >
  <div class="container">
    <h2  data-aos="fade-up" class="post-section__title mb-3 text-white"><?= $day_care['title'] ?></h2>
    <div class="care-home__overview-text text-white"  data-aos="fade-up">
      <?= $day_care['text'] ?>
     
    </div>
  </div>
</section>
<?php }


if($yt_embed_code) {
?>
  <!-- YouTube embed code -->
  <section class="pt-0 pb-0 mb-0 post-section<?= ($is_premium)? ' care-home--premium' : null ?>"  data-aos="fade-up">
    <div class="container">
      <div class="ratio ratio-16x9">
        <?= $yt_embed_code ?>
      </div>
    </div>
  </section>
<?php
}
if($the_team) {
?>
<!-- Tabbed content -->
<section id="<?php qc_set_achor_index() ?>" class=" post-section care-home__team<?= ($is_premium)? ' care-home--premium' : null ?>"  data-aos="fade-up">
    <div class="container">
      <h2 class="post-section__title mb-5"><?= $the_team['title'] ?></h2>
      <?php
        if(!empty($tabbed_content)) {
      ?>
      <div class="d-flex flex-md-row flex-column">
        <div class="menu-collapse">
          <div class="d-md-none d-flex h-100 menu-collapse__display"><span></span><i class="icon-arrow-down px-3"></i></div>
          <ul class="nav nav-links flex-md-column care-home__team-nav" role="tablist" aria-orientation="vertical">
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
        <!-- </div> -->
        <!-- <div class="col-12 col-md-9"> -->
            <div class="tab-content care-home__team-panes">
              <?php
              $loop_index = 0;

              foreach($tabbed_content['content'] as $tab_content) {
              ?>
                <div id="ch-content-<?= $loop_index ?>" class="care-home__team-pane p-lg-5 p-4 tab-pane fade<?= ($loop_index === 0)? ' show active' : null ?>">
                  <div class="d-xl-flex d-block">
                    <div class="flex-1 care-home__team-member mb-xl-0 mb-4">
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
<?php
}
?>
  <!-- Related news -->
  <section id="<?php qc_set_achor_index() ?>" class="post-section care-home__news<?= ($is_premium)? ' care-home--premium' : null ?>"  data-aos="fade-up">
    <div class="container">
      <h2 class="post-section__title mb-5"><?= __( $related_settings['title'], THEME_NAMESPACE) ?></h2>
      <div class="row care-home__news-wrap">
      <?php
      foreach($related_news as $news) {
      ?>
      <div class="col-12 col-lg-4 col-md-6 mb-lg-0 mb-4 mx-auto"  data-aos="fade-up">
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
      <a href="<?= get_post_type_archive_link('post') ?>?news_care_home=<?= get_the_ID() ?>" class="btn <?= ($is_premium)? 'btn-gold' : 'btn-primary' ?>" title="<?= __( $related_settings['achive_cta_label'], THEME_NAMESPACE) ?>"><?= __( $related_settings['achive_cta_label'], THEME_NAMESPACE) ?></a>
    </div>
  </section> 
<!-- -->
  <div class="care-home__forms <?= ($is_premium)? ' care-home--premium' : null ?>"  data-aos="fade-up">
    <?php get_template_part('/partials/contact-form', null, ['is_section' => true]) ?>
  </div>
</div>
<!-- -->
<section id="<?php qc_set_achor_index() ?>" class="post-section care-home__creds mb-5"  data-aos="fade-up">
    <div class="container">
      <h2 class="post-section__title mb-5"></h2>
      <div class="row">
        <div class="col-12 col-md-4 h-auto">
          <script type="text/javascript" src="//www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js?data-id=<?= $reviews['cqc_location_id'] ?>&amp;data-host=www.cqc.org.uk&amp;type=location"></script>
          
          <!-- -->
          <script id="tg-aggregate-rating" type="text/javascript" src="https://api.carehome.co.uk/assets/js/aggregate_rating.js?displayid=<?= $reviews['tg_rating_id'] ?>"></script><script class="tg-review-widget" type="text/javascript" src="https://api.carehome.co.uk/assets/js/review_widget.js?displaydiv=tgrw-ec20679e&amp;displayid=<?= $reviews['tg_rating_id'] ?>&amp;displaycontent=noreviews&amp;displaywidth=&amp;displaycount=2&amp;displayscore=true&amp;displaylink=false&amp;displayborder=true&amp;displaybackgroundcolor=faded&amp;displaypagination=false&amp;displaystrapline=true&amp;displayfontsize=default&amp;displayallratings=false&amp;displaylogo=true&amp;displaywrappers=true&amp;displaybutton=true&amp;displaysettingname=true"></script><div class="tg-review-widget-container mt-4" id="tgrw-ec20679e" style="background: linear-gradient(to right, rgb(254, 254, 254) 44%, rgb(247, 247, 247) 88%, rgb(247, 247, 247) 100%); border-style: solid; border-width: thin; border-color: rgb(192, 192, 192);"><div class="tg_header_wrap" id="tg_header_wrap_tgrw-ec20679e"><div class="tg_chlogo"><img border="none" alt="carehome" src="https://api.carehome.co.uk/assets/images/carehome/logo.svg" style="width: 225px;"><p><span class="tg_text_strap_line">the leading care home review website</span></p></div><hr class="tg_hr"><p class="tg_text_big" style="color: rgb(0, 0, 0); text-decoration: none;"><strong><a class="tg_header_links" target="_blank" href="https://www.carehome.co.uk/carehome.cfm/searchazref/10001040COUA?utm_source=widgets&amp;utm_medium=vertical_widget&amp;utm_campaign=Courtland%2520Lodge_25893&amp;utm_content=profile_name_link">Courtland Lodge</a></strong></p><div class="tg_score_wrapper"><span class="tg_score tg_score_main" style="border-color: rgb(38, 107, 176); background-color: rgb(38, 107, 176);">8.4</span></div><span class="tg_text_small tg_score_text">carehome.co.uk Review&nbsp;Score<br><i>for <a class="tg_header_links" target="_blank" href="https://www.carehome.co.uk/carehome.cfm/searchazref/10001040COUA?utm_source=widgets&amp;utm_medium=vertical_widget&amp;utm_campaign=Courtland%2520Lodge_25893&amp;utm_content=profile_name_link">Courtland Lodge</a> <a class="tg_header_links" target="_blank" href="https://www.carehome.co.uk/carehome.cfm/searchazref/10001040COUA?utm_source=widgets&amp;utm_medium=vertical_widget&amp;utm_campaign=Courtland%2520Lodge_25893&amp;utm_content=profile_name_link&amp;rcsid=1003#reviews">29 reviews</a></i></span></div><div id="tg_reviews_node_tgrw-ec20679e" class="tg_reviews_node"><hr class="tg_hr"><p class="tg_center"><button class="tgbtn" target="_blank" onclick="window.open('https://www.carehome.co.uk/carehome.cfm/searchazref/10001040COUA?utm_source=widgets&amp;utm_medium=vertical_widget&amp;utm_campaign=Courtland%2520Lodge_25893&amp;utm_content=write_review_button_link&amp;rcsid=1003#submit-review','_blank')" style="border-color: rgb(38, 107, 176); background-color: rgb(38, 107, 176);">Write a Review </button></p><div class="tg_footer_wrap"><p class="tg_text_small tg_copywrite">©&nbsp;2024&nbsp;carehome.co.uk</p></div></div></div>
          <!-- -->
        </div>
        <div class="col-12 col-md-8 h-auto">
          <?php
          if(isset($reviews['img'])) {
          ?>
          <div class="h-100 w-100 mt-md-0 mt-5">
            <figure class="h-100 w-100">
              <?= wp_get_attachment_image($reviews['img']['id'], 'large') ?>
            </figure>
          </div>
          <?php
          }
          ?>
          <!-- -->
        </div>
      </div>
    </div>
</section>

<!-- Map -->
<section class="post-section py-0 care-home__location pt-md-0 pt-5 mt-5"  data-aos="fade-up">
  <div class="w-100">
    <div id="map" class="care-home__location-map"></div>
    <?php require_once get_stylesheet_directory() . '/inc/gm-js-init.php' ?>
    </div>
  </div>
</section>