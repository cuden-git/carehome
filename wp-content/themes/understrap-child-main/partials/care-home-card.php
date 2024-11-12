<?php
global $post;
$is_premium = (has_term('quantum-select', 'care-home-category'))? true : false;
?>
<div class="col-12 col-md-6" data-map-coords="<?= $post->lng . '/' . $post->lat?>">
  <div class="row ch__card<?= ($is_premium)? ' ch__card--premium' : null?>">
    <figure class="ch__card-thumbnail col-12 px-0">
      <?= get_the_post_thumbnail( get_the_ID(), 'large' ) ?>
    </figure>
    <div class="col col-md-7">
        <h5 class="ch__card-title"><?php the_title() ?> <?= get_the_id() ?></h5>
    </div>
    <?php
    if(has_term('quantum-select', 'care-home-category')) {
    ?>
    <div class="col-12 col-md-5">
      <img src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/logo-select.svg' ) ?>" class="ch__card-logo" alt="<?= __('Quantum Select', THEME_NAMESPACE) ?>">
    </div>
  <?php
    }
  ?>
    <div class="col-12 col-md-6">
      <p>
        <?= $args['ch_address_address'] ?><br>
        <?= $args['ch_address_town_city'] ?><br>
        <?= $args['ch_address_county'] ?><br>
        <?= $args['ch_address_post_code'] ?>
      </p>
      <p>
        <a href="mail:<?= $args['ch_contact_details_email'] ?>" title="<?= __('email' . $args['ch_contact_details_email'], THEME_NAMESPACE) ?>"><?= __('email ' . $args['ch_contact_details_email'], THEME_NAMESPACE) ?></a>
        <a href="tel:<?= $args['ch_contact_details_telephone_number'] ?>" title="<?= __('telephone ' . $args['ch_contact_details_telephone_number'], THEME_NAMESPACE) ?>"><?= __($args['ch_contact_details_telephone_number'], THEME_NAMESPACE) ?></a>
      </p>
    </div>
    <div class="col-12 col-md-6">
      <ul class="gold-bullets">
        <?php
        foreach($args['ch_services_facilities_care_type'] as $care_type) {
        ?>  
          <li><?= $care_type ?></li>
        <?php
        }
        ?>
      </ul>
    </div>
    <ul class="ch__card-icons d-flex list-inline col-12"]>
    <?php
    foreach($args['ch_services_facilities_facilities'] as $facility) {
    ?>  
      <li><i class="icon-<?= $facility ?>"></i></li>
    <?php
    }
    ?>
    </ul>

    <!-- -->
    <div>
      Distance=<?= get_post_meta(get_the_ID(), 'ch_distance', true) ?>
    </div>
    <!-- -->
    <div class="col-12">
      <a href="<?= get_permalink(get_the_ID()) ?>" class="btn <?= ($is_premium)? 'btn-gold' : 'btn-primary' ?>"><?= __('View Home', THEME_NAMESPACE) ?></a>
    </div>
  </div>
</div>