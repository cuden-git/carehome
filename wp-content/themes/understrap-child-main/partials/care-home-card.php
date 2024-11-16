<?php
global $post;
$is_premium = (has_term('quantum-select', 'care-home-category'))? true : false;
$contact_info = get_field('ch_contact_details');
$address = get_field('ch_address');
$ch_services = get_field('ch_services_facilities');
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
        <address>
          <?= $address['address'] ?><br>
          <?= $address['town_city'] ?><br>
          <?= $address['county'] ?><br>
          <?= $address['post_code'] ?>
        </address>
        <address>
          <a href="mail:<?= $contact_info['email'] ?>" title="<?= __($contact_info['email'], THEME_NAMESPACE) ?>"><?= __( $contact_info['email'], THEME_NAMESPACE) ?></a><br>
          <a href="tel:<?= $contact_info['telephone_number'] ?>" title="<?= __($contact_info['telephone_number'], THEME_NAMESPACE) ?>"><?= __($contact_info['telephone_number'], THEME_NAMESPACE) ?></a>
        </address>
      </div>
      <ul class="ch__card-types<?= ($is_premium)? ' gold-bullets' : null ?>">
        <?php
        foreach($ch_services['care_type'] as $care_type) {
        ?>  
          <li><?= $care_type ?></li>
        <?php
        }
        ?>
      </ul>
    </div>
    <ul class="ch__card-icons list-inline"]>
    <?php
    foreach($ch_services['facilities'] as $facility) {
    ?>  
      <li class="d-flex"><i class="icon-<?= $facility['value'] ?>"></i> <span><?= __($facility['label'], THEME_NAMESPACE) ?></span></li>
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
