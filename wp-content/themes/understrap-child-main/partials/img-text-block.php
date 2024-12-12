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
<section data-aos="fade-up" class="post-section py-lg-5 py-4 fc__img-our-care fc__img-text <?= $img_offset_class ?>">
  <div class="container ">
    <div class="row py-lg-5 py-0 ">
      <div data-aos="fade-up" class="col-12 col-lg-5 fc__img-text-text align-items-center d-flex mb-lg-0 mb-5 order-lg-<?= $order[0] ?> order-1">
        <div class="py-lg-5 p-0 w-100 <?php if($order[0] == 1){echo "pe-lg-5 pe-0"; }else { echo "ps-lg-5 ps-0"; } ?>">
          <h2 class="post-section__title"><?= $title ?></h2>
          <?= $img_text['img_text_block']['text']; ?>
        
          <a href="<?= $btn['url'] ?>" class="btn btn-primary" title="<?= $btn['title'] ?>"><?= $btn['title'] ?></a>
        </div>
      </div>
      <div data-aos="fade-up" class="col-12 col-lg-7 fc__img-text-img d-flex align-items-center order-lg-<?= $order[1] ?> order-5">
        <figure>
          <?= wp_get_attachment_image($img['id'], 'large') ?>
        </figure>
      </div>
    </div>
  </div>
</section>
