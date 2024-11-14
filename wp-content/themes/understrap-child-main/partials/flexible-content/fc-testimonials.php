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
    <div class="splide">
      <div class="splide__track">
        <ul class="splide__list">
      <?php
      foreach($carousel as $slide) {
      ?>
          <li class="splide__slide fc_testimonials__slide">
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
      <ul class="splide__pagination splide__pagination--inverse fc_testimonials__bullets"></ul>
    </div>
  </div>
</section>
