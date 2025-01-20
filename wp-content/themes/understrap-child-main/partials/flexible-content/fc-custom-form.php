<?php
$form_shortcode = get_sub_field('form');
?>
<section class="post-section fc__form py-5"  data-aos="fade-up">
  <div class="container py-md-5 py-0">
    <div class="row">
      <div class="col-12 col-md-6 pe-md-5">
      <?php
      if(!empty($form_shortcode['title'])) {
      ?>
        <h2 class="post-section__title"><?= $form_shortcode['title'] ?></h2>
      <?php
      }
      if(!empty($form_shortcode['text'])) {
      ?>
        <?= $form_shortcode['text'] ?>
      <?php
      }
      ?>    
      </div>
      <div class="col-12 col-md-6">
      <?= do_shortcode( $form_shortcode['shortcode'] ); ?>
      </div>
    </div>
  </div>
</section>
