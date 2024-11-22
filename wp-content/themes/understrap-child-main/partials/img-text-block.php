<?php
$img_text = $args[0];//print_r($img_text);die();
$img = $img_text['img_text_block']['img'];
$title = $img_text['img_text_block']['title'];
$text = $img_text['img_text_block']['text'];
$btn = $img_text['img_text_block']['btn'];
$settings = $img_text['img_text_block']['settings'];
$img_offset_class = ($settings['offset_img'] === 'top')
  ? ' fc__img-text--top' 
  : ( ($settings['offset_img'] === 'bottom')
  ? ' fc__img-text--bottom' : null);

$img_overlap_class = ($settings['offset_img'] === 'top')
  ? ' fc__img-text--top' 
  : ( ($settings['offset_img'] === 'bottom')
  ? ' fc__img-text--bottom' : null);
$order = $args['order'];
?>
<section class="post-section fc__img-text <?= $img_offset_class ?>">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 fc__img-text-text d-flex order-<?= $order[0] ?>">
        <h2 class="post-section__title"><?= $title ?></h2>
        <?= $text ?>
        <a href="<?= $btn['url'] ?>" class="btn btn-primary" title="<?= $btn['title'] ?>"><?= $btn['title'] ?></a>
      </div>
      <div class="col-12 col-md-6 fc__img-text-img d-flex order-<?= $order[1] ?>">
        <figure>
          <?= wp_get_attachment_image($img['id'], 'large') ?>
        </figure>
      </div>
    </div>
  </div>
</section>
