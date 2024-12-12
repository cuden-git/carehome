<?php
  $title = get_sub_field('title');
  $text = get_sub_field('text');
  $img = get_sub_field('video');
  $btn_label = get_sub_field('btn_label');
  $settings = get_sub_field('settings');
?>
<section  data-aos="fade-up" class="post-section fc__video py-5 fc__img-text<?= ($settings['img_aligned_left'])? ' fc__img-text--left' : null ?><?= ($settings['img_overlap'])? ' fc__img-text--overlap' : null ?><?= ($settings['bg_colour'])? ' fc__img-text--bg' : null ?>">
  <div class="container py-md-5 py-0">
    <div class="row">
      <div  data-aos="fade-up" class="col-12 col-xl-5 col-lg-6 fc__img-text-text d-flex order-1 order-lg-5 mb-lg-0 mb-5">
        <h2 class="post-section__title"><?= $title ?></h2>
        <?= $text ?>
        <button class="btn btn-primary"><?= $btn_label ?></button>
      </div>
      <div  data-aos="fade-up" class="col-12 col-xl-7 col-lg-6 fc__img-text-img d-flex order-lg-1 order-5">
        <figure>
          <?= $img ?>
        </figure>
      </div>
    </div>
  </div>
</section>
