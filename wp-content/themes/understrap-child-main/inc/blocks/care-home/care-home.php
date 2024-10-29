<?php
/**
 * Care Home Block template.
 * Used fore care-home post type.
 *
 */
// echo get_the_ID();
//  print_r(acf_get_field_groups(['post_id' => $post_id]));;
//  print_r(acf_get_fields(41));die();
//echo get_the_terms(get_the_ID(), 'care-home-categories');die();
$intro = get_field('ch_intro');
$address = get_field('ch_address');
$contact_info = get_field('ch_contact_details');
?>

<section class="post-section">
  <div class="container">
    <div class="row">
      <div class="col-md-6">

      </div>
      <div class="col-md-6">
        <address>
          <?= $address['address'] ?>
          <?= $address['post_code'] ?>
          T: <a href="tel:<?= $contact_info['telephone_number'] ?>" title="<?= $contact_info['telephone_number'] ?>"><?= $contact_info['telephone_number'] ?></a>
          E: <a href="mail:<?= $contact_info['email'] ?>" title="<?= $contact_info['email'] ?>"><?= $contact_info['email'] ?></a>
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
