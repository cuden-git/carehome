<?php
global $post;
$is_premium = (has_term('quantum-select', 'care-home-category'))? true : false;
?>
<div class="col-12 col-md-6" data-map-coords="<?= $post->lng . '/' . $post->lat?>">
  <div class="ch__card<?= ($is_premium)? ' ch__card--premium' : null?>">
    <figure class="ch__card-img">
      <?= get_the_post_thumbnail( get_the_ID(), 'large' ) ?>
    </figure>
    <div class="d-flex justify-content-between">
      <h4 class="ch__card-title"><?php the_title() ?> <?= get_the_id() ?></h4>
      <?php
      if($is_premium) {
      ?>
      <img src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/logo-select.svg' ) ?>" class="ch__card-logo" alt="<?= __('Quantum Select', THEME_NAMESPACE) ?>">
      <?php
      }
      ?>  
    </div>
    <?php
    if(has_term('quantum-select', 'care-home-category')) {
    ?>
    <div class="">

    </div>
  <?php
    }
  ?>
    <div class="d-flex">
      <div class="ch__card-contact">
        <p>
          <?= $args['ch_address_address'] ?><br>
          <?= $args['ch_address_town_city'] ?><br>
          <?= $args['ch_address_county'] ?><br>
          <?= $args['ch_address_post_code'] ?>
        </p>
        <p>
          <a href="mail:<?= $args['ch_contact_details_email'] ?>" title="<?= __('email' . $args['ch_contact_details_email'], THEME_NAMESPACE) ?>"><?= __('email ' . $args['ch_contact_details_email'], THEME_NAMESPACE) ?></a><br>
          <a href="tel:<?= $args['ch_contact_details_telephone_number'] ?>" title="<?= __('telephone ' . $args['ch_contact_details_telephone_number'], THEME_NAMESPACE) ?>"><?= __($args['ch_contact_details_telephone_number'], THEME_NAMESPACE) ?></a>
        </p>
      </div>
      <ul class="ch__card-types<?= ($is_premium)? ' gold-bullets' : null ?>">
        <?php
        foreach($args['ch_services_facilities_care_type'] as $care_type) {
        ?>  
          <li><?= $care_type ?></li>
        <?php
        }
        ?>
      </ul>
    </div>
    <ul class="ch__card-icons list-inline"]>
    <?php
    foreach($args['ch_services_facilities_facilities'] as $facility) {
    ?>  
      <li class="d-flex"><i class="icon-<?= $facility ?>"></i> <span>Label label</span></li>
    <?php
    }
    ?>
    </ul>

    <!-- -->
    <div class="distance">
      Distance=<?= get_post_meta(get_the_ID(), 'ch_distance', true) ?>
    </div>
    <!-- -->
    <a href="<?= get_permalink(get_the_ID()) ?>" class="btn <?= ($is_premium)? 'btn-gold' : 'btn-white' ?>"><?= __('View Home', THEME_NAMESPACE) ?></a>
  </div>
</div>
