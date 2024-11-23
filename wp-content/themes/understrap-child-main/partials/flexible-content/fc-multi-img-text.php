<?php
$top_block = get_sub_field('top_block');
$middle_block = get_sub_field('middle_block');
$bottom_block = get_sub_field('bottom_block');
?>
<section class="post-section fc__img-text fc__img-text--multi">
  <div class="container">
<!-- -->
    <div class="row fc__img-text-top">
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__title mb-3"><?= $top_block['title'] ?></h2>
        <div class="mb-3">
          <?= $top_block['text'] ?>
        </div>
        <a href="<?= $top_block['btn']['url'] ?>" class="btn btn-primary mb-4" title="<?= $top_block['btn']['title'] ?>"><?= $top_block['btn']['title'] ?></a>
      </div>
      <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($top_block['img']['id'], 'large') ?>
        </figure>
      </div>
    </div>
<!-- -->
<!-- -->
    <div class="row fc__img-text-mid">
      <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($middle_block['img']['id'], 'large') ?>
        </figure>
      </div>
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__title mb-3"><?= $middle_block['title'] ?></h2>
        <div class="mb-3">
          <?= $middle_block['text'] ?>
        </div>
        <a href="<?= $cta_link['url'] ?>" class="btn btn-primary mb-4" title="<?= $middle_block['btn']['title'] ?>"><?= $middle_block['btn']['title'] ?></a>
      </div>
    </div>
<!-- -->
<!-- -->
    <div class="row fc__img-text-bott">
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__title mb-3"><?= $middle_block['title'] ?></h2>
        <div class="mb-3">
          <?= $middle_block['text'] ?>
        </div>
        <a href="<?= $middle_block['btn']['url'] ?>" class="btn btn-primary mb-4" title="<?= $middle_block['btn']['title'] ?>"><?= $middle_block['btn']['title'] ?></a>
      </div>
      <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($middle_block['img']['id'], 'large') ?>
        </figure>
      </div>
    </div>
<!-- -->
  </div>
</section>