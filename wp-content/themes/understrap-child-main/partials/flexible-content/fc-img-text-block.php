<?php
  $title = get_sub_field('title');
  $text = get_sub_field('text');
  $img = get_sub_field('img');
  $cta_link = get_sub_field('cta_link');
  $settings = get_sub_field('settings');
?>

<section class="post-section fc__img-text<?= ($settings['img_aligned_left'])? ' fc__img-text--left' : ' fc__img-text--right' ?><?= ($settings['img_overlap'])? ' fc__img-text--overlap' : null ?><?= ($settings['bg_colour'])? ' fc__img-text--bg' : ' fc__img-text--none' ?>">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__title mb-3"><?= $title ?></h2>
        <div class="mb-3">
          <?= $text ?>
        </div>
        <a href="<?= $cta_link['url'] ?>" class="btn btn-primary mb-4" title="<?= $cta_link['title'] ?>"><?= $cta_link['title'] ?></a>
      </div>
      <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($img['id'], 'large') ?>
        </figure>
      </div>
    </div>
  </div>
</section>
