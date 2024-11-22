<?php
$double_section = get_field('g_double_img_text');
$block_top = $double_section['img_text_top_img_text_block'];
$block_bottom = $double_section['img_text_bottom_img_text_block'];
?>
<section class="post-section fc__img-text">
  <div class="container">
    <div class="row">
      <!-- -->
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__title"><?= $block_top['title'] ?></h2>
        <?= $block_top['text'] ?>
        <a href="<?= $block_top['btn']['url'] ?>" class="btn btn-primary" title="<?= $block_top['btn']['title'] ?>"><?= $block_top['btn']['title'] ?></a>
      </div>
      <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($block_top['img']['id'], 'large') ?>
        </figure>
      </div>
      <!-- -->
      <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <figure>
          <?= wp_get_attachment_image($block_bottom['img']['id'], 'large') ?>
        </figure>
      </div>
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__title"><?= $block_bottom['title'] ?></h2>
        <?= $block_bottom['text'] ?>
        <a href="<?= $block_bottom['btn']['url'] ?>" class="btn btn-primary" title="<?= $block_bottom['btn']['title'] ?>"><?= $block_bottom['btn']['title'] ?></a>
      </div>
      <!-- -->
    </div>
  </div>
</section>