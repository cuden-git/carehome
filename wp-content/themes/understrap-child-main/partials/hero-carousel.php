<?php
  $loop_index = 0;
?>
<section class="post-section hero-carousel">
  <div class="container">
    <div class="glide">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
      <?php
      foreach($args as $slide) {
      ?>
          <li class="glide__slide hero-carousel__slide">
            <figure class="hero-carousel__slide-img">
              <?= wp_get_attachment_image($slide['img']['ID'], 'large') ?>
            </figure>
            <div class="hero-carousel__slide-text">
              <?= $slide['text'] ?>
            <?php
            if($slide['cta_btns']) {
            ?>
              <div class="">
                <?php
                  foreach($slide['cta_btns'] as $button) {
                ?>
                  <a href="<?= $button['btn']['url'] ?>" class="btn btn-primary" title="<?= $button['btn']['title'] ?>"><?= $button['btn']['title'] ?></a>
                <?php
                  }
                ?>
              </div>
            </div>
            <?php
            }
            ?>
          </li>
      <?php
        ++$loop_index;
      }
      ?>
        </ul>
      </div>
      <!-- TODO: Move buttons to inside text area -->
      <div class="glide__bullets hero-carousel__bullets" data-glide-el="controls[nav]">
      <?php
      $loop_index = 0;
      ?>
      <?php
      foreach($args as $slide) {
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
