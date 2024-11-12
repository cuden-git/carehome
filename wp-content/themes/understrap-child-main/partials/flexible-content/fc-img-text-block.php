<?php
  $title = get_sub_field('title');
  $text = get_sub_field('text');
  $img = get_sub_field('img');
  $cta_link = get_sub_field('cta_link');
  $settings = get_sub_field('settings');
?>

<section class="post-section fc__img-text<?= ($settings['img_aligned_left'])? ' fc__img-text--left' : null ?><?= ($settings['img_overlap'])? ' fc__img-text--overlap' : null ?><?= ($settings['bg_colour'])? ' fc__img-text--bg' : null ?>">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__sub-title"><?= $title ?></h2>
        <?= $text ?>
        <a href="<?= $cta_link['url'] ?>" class="btn btn-primary" title="<?= $cta_link['title'] ?>"><?= $cta_link['title'] ?></a>
      </div>
      <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($img['id'], 'large') ?>
        </figure>
      </div>
    </div>
  </div>
</section>
