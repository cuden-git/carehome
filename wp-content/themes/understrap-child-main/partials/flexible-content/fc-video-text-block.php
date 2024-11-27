<?php
  $title = get_sub_field('title');
  $text = get_sub_field('text');
  $img = get_sub_field('video');
  $btn_label = get_sub_field('btn_label');
  $settings = get_sub_field('settings');
?>
video
<section class="post-section fc__img-text<?= ($settings['img_aligned_left'])? ' fc__img-text--left' : null ?><?= ($settings['img_overlap'])? ' fc__img-text--overlap' : null ?><?= ($settings['bg_colour'])? ' fc__img-text--bg' : null ?>">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__title"><?= $title ?></h2>
        <?= $text ?>
        <button class="btn btn-primary"><?= $btn_label ?></button>
      </div>
      <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <figure>
          <?= $img ?>
        </figure>
      </div>
    </div>
  </div>
</section>
