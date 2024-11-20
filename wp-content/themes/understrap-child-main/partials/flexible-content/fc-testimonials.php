<?php
$testimonials = get_sub_field('testimonial_fields');
$title = $testimonials['title'];//get_sub_field('title');
$intro = $testimonials['intro'];//get_sub_field('intro');
$carousel = $testimonials['carousel']; //get_sub_field('carousel');

?>
<section class="post-section fc__testimonials">
  <div class="container">
  <?php
    if($intro) {
  ?>
    <h2 class="post-section__title"><?= __($title, THEME_NAMESPACE) ?></h2>
  <?php
    }
  ?>
  <?php
    if($intro) {
  ?>
    <?= $intro ?>
  <?php
    }
  ?>
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
