
<?php
$intro = get_field('ch_intro');
$address = get_field('ch_address');
$contact_info = get_field('ch_contact_details');
$header_img = get_field('ch_header_img');
$is_premium = qc_is_premium();
?>
<!-- Care Home header -->
  <section class="post-section care-home__header<?= ($is_premium)? ' care-home__header--premium' : null ?> pt-0">
    <header class="container">
      <div class="row">      
        <div class="col-md-7">
          <h2 class="post-section__title"><?php the_title() ?></h2>
          <div class="d-flex align-items-center">
          <?php
          if($is_premium) {
          ?>
          <figure class=" care-home__header-logo">
            <img src="<?= LOGO_SELECT_SRC ?>" alt="Quantum Care" />
          </figure>
          <?php
          }
          ?>
          <address>
            <?= $address['address'] ?>,
            <?= $address['town_city'] ?>,
            <?= $address['county'] ?>,
            <?= $address['post_code'] ?><br>
            T: <a href="tel:<?= $contact_info['telephone_number'] ?>" title="<?= $contact_info['telephone_number'] ?>"><?= $contact_info['telephone_number'] ?></a><br>
            E: <a href="mail:<?= $contact_info['email'] ?>" title="<?= $contact_info['email'] ?>"><?= $contact_info['email'] ?></a>
          </address>
          </div>
          <div class="care-home__header-text">
            <?= $intro ?>
          </div>
        </div>
        <div class="col-md-5">
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
          <a href="<?= get_permalink(get_the_ID()) ?>" class="btn <?= ($is_premium)? 'btn-gold btn-gold--inverse' : 'btn-white btn-white--inverse' ?>" title="<?= __('Find Out More', THEME_NAMESPACE) ?>"><?= __('Find Out More', THEME_NAMESPACE) ?></a>
          <a href="#" class="btn <?= ($is_premium)? 'btn-gold' : 'btn-white' ?>" title="<?=__('Contact Us', THEME_NAMESPACE) ?>"><?=__('Contact Us', THEME_NAMESPACE) ?></a>
        </div>
      </div>
    </header>
  </section> 
  