<?php
$double_section = get_field('oc_double_img_text');
$block_top = $double_section['img_text_top_img_text_block'];
$block_bottom = $double_section['img_text_bottom_img_text_block'];

?>
<section data-aos="fade-up" class="post-section fc__img-text bg-colour-double q-bg-img-dark">
  <div class="white-overlay d-lg-none d-block position-absolute"></div>
  <div class="container">
    <div class="row py-lg-5 py-4">
      <!-- -->
      <div data-aos="fade-up" class="col-12 col-lg-5 fc__img-text-text d-flex align-items-center mb-lg-0 mb-5">
        <div class="pe-lg-5 pe-0">
          <h2 class="post-section__title"><?= $block_top['title'] ?></h2>
          <?= $block_top['text'] ?>
          <a href="<?= $block_top['btn']['url'] ?>" class="btn btn-primary" title="<?= $block_top['btn']['title'] ?>"><?= $block_top['btn']['title'] ?></a>
        </div>
      </div>
      <div data-aos="fade-up" class="col-12 col-lg-7 fc__img-text-img d-flex align-items-center">
        <figure>
          <?= wp_get_attachment_image($block_top['img']['id'], 'large') ?>
        </figure>
      </div>
    </div>
    <div class="row py-lg-5 py-4">
      <!-- -->
      <div data-aos="fade-up" class="col-12 col-lg-7 fc__img-text-img d-flex order-lg-1 order-5 align-items-center">
        <figure>
          <?= wp_get_attachment_image($block_bottom['img']['id'], 'large') ?>
        </figure>
      </div>
      <div data-aos="fade-up" class="col-12 col-lg-5 fc__img-text-text d-flex order-lg-5 order-1 align-items-center mb-lg-0 mb-5">
        <div class="ps-lg-5 ps-0">
          <h2 class="post-section__title"><?= $block_bottom['title'] ?></h2>
          <?= $block_bottom['text'] ?>
          <a href="<?= $block_bottom['btn']['url'] ?>" class="btn btn-primary" title="<?= $block_bottom['btn']['title'] ?>"><?= $block_bottom['btn']['title'] ?></a>
        </div>
      </div>
      <!-- -->
    </div>
  </div>
</section>