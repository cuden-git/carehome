<?php
global $post;

$form_shortcode = get_field('contact_form_short-code', 'option');
$contact_info = get_field('contact_info', 'option');
$contact_text = get_field('contact_us_text', 'option');
$contact_info = qc_contact_data_form(get_the_ID());
?>
<?php
  if(isset($args['is_section'])) {
?>

<?php   
  }
?>
<section class="site__form<?= (isset($args['is_section']))? ' site__form--section' : null ?>">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="site__form-text">
          <h2 class="site__form-title mb-4"><?= $contact_text['title'] ?></h2>
          <div class="mb-5"><?= $contact_text['text'] ?></div>
          <h4 class="site__form-sub-title my-4"><?= $contact_text['sub-title'] ?></h4>
          
          <address class="d-flex">
            <a href="tel:<?= __($contact_info['telephone'], THEME_NAMESPACE) ?>"><?= __($contact_info['telephone'], THEME_NAMESPACE) ?></a>
            <a href="mailto:<?= __($contact_info['email'], THEME_NAMESPACE) ?>"><?= __($contact_info['email'], THEME_NAMESPACE) ?></a>
          </address>
          <?php
            if($post->post_name == 'contact') {
          ?>
          <h5><?= $contact_text['write_to_us']['title'] ?></h5>
          <?= $contact_text['write_to_us']['text'] ?>
          <?php
            }
          ?>
          <address class="d-flex">            
            <?= $contact_info['address'] ?>
          </address>
        </div>
      </div>
      <div class="col-12 col-md-6">
      <?= do_shortcode($form_shortcode); ?>
      </div>
    </div>
  </div>
</section>
