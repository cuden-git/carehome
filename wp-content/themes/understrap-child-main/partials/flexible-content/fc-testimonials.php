<?php
//$intro = get_sub_field('intro');
//echo 'testimonials';
$intro = get_sub_field('intro');
$carousel = get_sub_field('carousel');
?>
<section class="post-section fc__testimonials">
  <div class="container">
    <h2 class="post-section__title"><?= __('Testimonials', THEME_NAMESPACE) ?></h2>
    <?= $intro ?>
  <?php
    $loop_index = 0;
  ?>
    <div class="glide">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
      <?php
      foreach($carousel as $slide) {
      ?>
          <li class="glide__slide fc_testimonials__slide">
            <blockquote>
              <?= $slide['quote'] ?>
              <footer>
                <cite class="author"><?= $slide['name'] ?></cite>
              </footer>
            </blockquote>
          </li>
      <?php
        ++$loop_index;
      }
      ?>
        </ul>
      </div>
      <div class="glide__bullets hero-carousel__bullets" data-glide-el="controls[nav]">
      <?php
      $loop_index = 0;
      ?>
      <?php
      foreach($carousel as $slide) {
      ?>
        <button class="glide__bullet hero-carousel__bullet" data-glide-dir="=<?= $loop_index ?>"></button>
      <?php
        ++$loop_index;
      }
      ?>
      </div>
    </div>
  </div>
</section>
