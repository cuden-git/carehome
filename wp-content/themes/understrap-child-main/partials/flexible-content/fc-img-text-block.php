<?php
  $title = get_sub_field('title');
  $text = get_sub_field('text');
  $img = get_sub_field('img');
  $cta_link = get_sub_field('cta_link');
  $settings = get_sub_field('settings');
?>

<section class="post-section py-5 fc__img-text<?= ($settings['img_aligned_left'])? ' fc__img-text--left' : ' fc__img-text--right' ?><?= ($settings['img_overlap'])? ' fc__img-text--overlap' : null ?><?= ($settings['bg_colour'])? ' fc__img-text--bg' : ' fc__img-text--none' ?>">
  <div class="container">
    <div class="row py-md-5 py-0">
      <div class="col-12 col-lg-5 fc__img-text-text d-flex <?= ($settings['img_aligned_left'])? 'order-lg-5 order-1' : ' order-1' ?>">
        <div class="mb-lg-0 mb-5 <?= ($settings['img_aligned_left'])? ' ps-lg-5 ps-0 ' : ' pe-lg-5 pe-0 ' ?>">
          <h2 class="post-section__title mb-3"><?= $title ?></h2>
          <div class="mb-3">
            <?= $text ?>
          </div>
          <a href="<?= $cta_link['url'] ?>" class="btn btn-primary mb-4" title="<?= $cta_link['title'] ?>"><?= $cta_link['title'] ?></a>
        </div>
      </div>
      <div class="col-12 col-lg-7  align-items-center fc__img-text-img d-flex <?= ($settings['img_aligned_left'])? 'order-lg-1 order-5' : ' order-5' ?>">
        <figure class="w-100">
          <?= wp_get_attachment_image($img['id'], 'large') ?>
        </figure>
      </div>
    </div>
  </div>
</section>
