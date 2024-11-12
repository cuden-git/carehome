<?php
  $loop_index = 0;
?>
<div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
  <?php
  foreach($args as $slide) {
  ?>
      <li class="glide__slide care-home__carousel-slide"><?= wp_get_attachment_image($slide['ID'], 'large') ?></li>
  <?php
    ++$loop_index;
  }
  ?>
    </ul>
  </div>
  <div class="glide__arrows care-home__carousel-controls" data-glide-el="controls">
    <span class="glide__arrow glide__arrow--left" data-glide-dir="<"><i class="icon icon-arrow-left"></i></span>
    <span class="glide__arrow glide__arrow--right" data-glide-dir="&gt;"><i class="icon icon-arrow-right"></i></span>
  </div>
  <div class="glide__bullets care-home__carousel-bullets" data-glide-el="controls[nav]">
  <?php
  $loop_index = 0;
  ?>
  <?php
  foreach($args as $slide) {
  ?>
    <button class="glide__bullet care-home__carousel-bullet" data-glide-dir="=<?= $loop_index ?>"></button>
  <?php
    ++$loop_index;
  }
  ?>
  </div>
</div>
