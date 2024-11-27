<?php
$testimonials = (isset($args['testimonials']))? $args['testimonials'] : get_sub_field('testimonial_fields');
$title = $testimonials['title'];
$intro = $testimonials['intro'];
$carousel = $testimonials['carousel']; 

?>
<section class="post-section fc__testimonials py-5">
  <div class="container">
  <div class="row">
    <div class="col-md-8 mx-auto">
  <?php
    if($intro) {
  ?>
    <h2 class="post-section__title mb-4"><?= __($title, THEME_NAMESPACE) ?></h2>
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
   
      <div class="splide mt-5">
      <div class="splide__track">
        <ul class="splide__list">
      <?php
      foreach($carousel as $slide) {
      ?>
          <li class="splide__slide fc_testimonials__slide">
            <blockquote>
              <?= $slide['quote'] ?>
              <footer class="my-3">
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
    </div>
  </div>
</section>
