<?php
$top_block = get_sub_field('top_block');
$middle_block = get_sub_field('middle_block');
$bottom_block = get_sub_field('bottom_block');
?>
<div class=" post-section fc__img-text fc__img-text--multi">
<section class="position-relative top_img_section">
  <div class="container">
<!-- -->
    <div class="row fc__img-text-top">
      <div class="col-12 col-lg-5 fc__img-text-text d-flex">
        <div class="pe-lg-5 ps-0">
          <h2 class="post-section__title mb-3"><?= $top_block['title'] ?></h2>
          <div class="mb-3">
            <?= $top_block['text'] ?>
          </div>
          <a href="<?= $top_block['btn']['url'] ?>" class="btn btn-primary mb-4" title="<?= $top_block['btn']['title'] ?>"><?= $top_block['btn']['title'] ?></a>
        </div>
      </div>
      <div class="col-12 col-lg-7 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($top_block['img']['id'], 'large') ?>
        </figure>
      </div>
    </div>
</div>
</section>
<!-- -->
<!-- -->
<section class="fc__img-text-mid position-relative">
  <div class="white-overlay d-lg-none d-block position-absolute"></div>
  <div class="container rise-up">
    <div class="row">
      <div class="col-12 col-lg-7 fc__img-text-img d-flex order-lg-1 order-5">
        <figure>
          <?= wp_get_attachment_image($middle_block['img']['id'], 'large') ?>
        </figure>
      </div>
      <div class="col-12 col-lg-5 fc__img-text-text d-flex  order-lg-5 order-1">
        <div class="ps-lg-5 ps-0">
          <h2 class="post-section__title mb-3"><?= $middle_block['title'] ?></h2>
          <div class="mb-3">
            <?= $middle_block['text'] ?>
          </div>
          <a href="<?= $cta_link['url'] ?>" class="btn btn-primary mb-4" title="<?= $middle_block['btn']['title'] ?>"><?= $middle_block['btn']['title'] ?></a>
        </div>
      </div>
    </div>
    </div>
</section>
<!-- -->
<!-- -->
<section class="position-relative bott-img-section">
  <div class="container">
    <div class="row fc__img-text-bott">
      <div class="col-12 col-lg-5 fc__img-text-text d-flex">
        <div class="pe-lg-5 ps-0">
          <h2 class="post-section__title mb-3"><?= $middle_block['title'] ?></h2>
          <div class="mb-3">
            <?= $middle_block['text'] ?>
          </div>
          <a href="<?= $middle_block['btn']['url'] ?>" class="btn btn-primary mb-4" title="<?= $middle_block['btn']['title'] ?>"><?= $middle_block['btn']['title'] ?></a>
        </div>
      </div>
      <div class="col-12 col-lg-7 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($middle_block['img']['id'], 'large') ?>
        </figure>
      </div>
    </div>
<!-- -->
  </div>
</section>