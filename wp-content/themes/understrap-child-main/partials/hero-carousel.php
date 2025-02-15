<?php
  $loop_index = 0;
?>
<section class="hero-carousel">
  <div class="splide h-100">
    <div class="splide__track h-100">
      <ul class="splide__list h-100">
    <?php
    foreach($args as $slide) {
    ?>
   
        <li class="splide__slide hero-carousel__slide h-100">
        <figure class="hero-carousel__slide-img h-100">
          <?= wp_get_attachment_image($slide['img']['ID'], 'full') ?>
        </figure>
         
            <div class="container h-100 position-relative">
             
                  <div class="hero-carousel__slide-text mb-5">
                <h1><?= $slide['text'] ?></h1>
              <?php
              if($slide['cta_btns']) {
              ?>
                <div class="hero-carousel__slide-btns mt-5">
                  <?php
                    foreach($slide['cta_btns'] as $button) {
                  ?>
                    <a href="<?= $button['btn']['url'] ?>" class="btn me-3 mb-4 <?= ($loop_index > 0)? 'btn-white btn-white--inverse' : 'btn-primary' ?>" title="<?= $button['btn']['title'] ?>"><?= $button['btn']['title'] ?></a>
                  <?php
                      ++$loop_index;
                    }
                    $loop_index = 0;
                  ?>
                </div>
            
          </div>
          </div>
            <?php
            }
            ?>
             
        </li>
    <?php
    }
    ?>
      </ul>
    </div>
    <div class="container hero-carousel__pagination">
      <ul class="splide__pagination justify-content-start"></ul>
      <a href="#find-out-more" class="d-block"><i class="icon-arrow-down"></i></a>
    </div>
  </div>
</section>
<div id="find-out-more"></div>