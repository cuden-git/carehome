<?php
  $loop_index = 0;
?>
<div class="splide">
  <div class="splide__track">
    <ul class="splide__list">
  <?php
  foreach($args as $slide) {
  ?>
      <li class="splide__slide care-home__carousel-slide"><?= wp_get_attachment_image($slide['ID'], 'large') ?></li>
  <?php
    ++$loop_index;
  }
  ?>
    </ul>
  </div>
  <div class="splide__arrows d-flex justify-content-between">
    <i class="splide__arrow splide__arrow--prev icon-arrow-left"></i>
    <ul class="splide__pagination"></ul>
    <i class="splide__arrow splide__arrow--next icon-arrow-right"></i>
  </div>
</div>
