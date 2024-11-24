<?php
global $post;
$is_premium = (has_term('quantum-select', 'care-home-category'))? true : false;
$contact_info = get_field('ch_contact_details');
$address = get_field('ch_address');
$ch_services = get_field('ch_services_facilities');
?>



<div class="col-12 col-md-6 margin-4rem" data-map-coords="<?= $post->lng . '/' . $post->lat?>">
  <div class="p-4 ch__card<?= ($is_premium)? ' ch__card--premium' : null?>">
      <div class="care-home-image w-100">
        <figure class="ch__card-img w-100">
        <a href="<?= get_permalink(get_the_ID()) ?>">
          <?= get_the_post_thumbnail( get_the_ID(), 'large' ) ?>
        </a>
        </figure>
      </div>
      <div class="container descriptions">
        <div class="row">
          <div class="<?php if($is_premium){ echo "col-lg-8"; } else{ echo "col-12"; } ?>" >
            <h4 class="ch__card-title"><?php the_title() ?> <?= get_the_id() ?></h4>  
          </div>
          <?php 
            if($is_premium){ ?>
              <div class="col-lg-4">  
                <img src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/logo-select.svg' ) ?>" class="ch__card-logo" alt="<?= __('Quantum Select', THEME_NAMESPACE) ?>">
              </div>
              <?php
            }
          ?>  
        </div>
        <div class="row  mt-4">
          <div class="col-xl-6 col-lg-7">
            <div class="d-flex mb-lg-0 mb-4">
              <div class="ch__card-contact">
                <address>
                  <?= $address['address'] ?><br>
                  <?= $address['town_city'] ?><br>
                  <?= $address['county'] ?><br>
                  <?= $address['post_code'] ?>
                </address>
                <address class="d-lg-none d-block">
                <a class="text-white" href="mail:<?= $contact_info['email'] ?>" title="<?= __($contact_info['email'], THEME_NAMESPACE) ?>"><?= __( $contact_info['email'], THEME_NAMESPACE) ?></a><br>
                <a class="text-white" href="tel:<?= $contact_info['telephone_number'] ?>" title="<?= __($contact_info['telephone_number'], THEME_NAMESPACE) ?>"><?= __($contact_info['telephone_number'], THEME_NAMESPACE) ?></a>
              </address>
              </div>
            </div>
          </div>
          <div class="ch__card-types<?= ($is_premium)? ' gold-bullets' : null ?> col-xl-6 col-lg-5">
            <div class="ms-xl-5 ms-0">
              <h5>Types of care</h5>
              <ul >
                <?php
                  foreach($ch_services['care_type'] as $care_type) {
                ?>  
                  <li><?= $care_type ?></li>
                  <?php
                }
                  ?>
                  </ul>
              </div>
          </div>
        </div>
        <div class="row mt-4 d-lg-block d-none">
          <div class="col-12">
            <address>
                <a class="text-white" href="mail:<?= $contact_info['email'] ?>" title="<?= __($contact_info['email'], THEME_NAMESPACE) ?>"><?= __( $contact_info['email'], THEME_NAMESPACE) ?></a><br>
                <a class="text-white" href="tel:<?= $contact_info['telephone_number'] ?>" title="<?= __($contact_info['telephone_number'], THEME_NAMESPACE) ?>"><?= __($contact_info['telephone_number'], THEME_NAMESPACE) ?></a>
              </address>
          </div>
        </div>
        <div class="row icon-holder mt-md-4 mt-0">
            <?php
            foreach($ch_services['facilities'] as $facility) {
            ?>  
            <div class="col-lg-6 ch__card-icons list-inline py-3">
              <div class="row">
                <div class="col-3 d-flex align-items-center"><i class="icon-<?= $facility['value'] ?>"></i></div><div class="col-9"><span><?= __($facility['label'], THEME_NAMESPACE) ?></span></div></div>
              </div>
            <?php
            }
            ?>
       
         
        </div>
        <div class="row mt-4 mb-3">
          <div class="col-12">
          <!-- -->
          <div class="distance">
                Distance=<?= get_post_meta(get_the_ID(), 'ch_distance', true) ?>
              </div>
              <!-- -->
          </div>
        </div>
        <a href="<?= get_permalink(get_the_ID()) ?>" class="btn-absolute btn <?= ($is_premium)? 'btn-gold' : 'btn-white' ?>"><?= __('View Home', THEME_NAMESPACE) ?></a>
      </div>
  </div>
</div>