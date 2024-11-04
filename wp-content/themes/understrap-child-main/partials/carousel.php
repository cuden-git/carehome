<?php
  $loop_index = 0;
?>
<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <?php
      $loop_index = 0;
      foreach($args as $slide) {
    ?>
    <div class="carousel-item<?= ($loop_index === 0)? ' active' : null ?>">
      <?= wp_get_attachment_image($slide['ID'], 'large') ?>
    </div>
    <?php
      ++$loop_index;
      }
    ?>
  </div>
  <div class="carousel-indicators">
    <?php
    foreach($args as $slide) {
    ?>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="<?= $loop_index ?>" class="<?= ($loop_index === 0)? ' active' : null ?>" aria-current="true" aria-label="Slide 1"></button>
    <?php
    ++$loop_index;
    }
    ?>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
