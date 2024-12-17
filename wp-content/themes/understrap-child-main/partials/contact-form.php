<?php
global $post;

$contact_form_shortcode = get_field('contact_form_short-code', 'option');
$contact_info = get_field('contact_info', 'option');
$contact_text = get_field('contact_us_text', 'option');
$contact_info = qc_contact_data_form(get_the_ID());
$register_page_id = get_field('register_page_id', 'option');
$register_form_shortcode = get_field('register_form_shortcode', 'option');

$form_shortcode = ($register_page_id == $post->ID)? $register_form_shortcode : $contact_form_shortcode;
?>
<?php
  if(isset($args['is_section'])) {
?>

<?php   
  }
?>
<section id="contact" class="site__form<?= (isset($args['is_section']))? ' site__form--section' : (isset($args) && $args['contact']? ' site__form--page' : null) ?>">
  <div class="container">
    <div class="row">
    <?php
      if($register_page_id != $post->ID) {
    ?>
      <div class="col-12 col-md-6">
        <div class="site__form-text" data-aos="fade-up">
          <h2 class="site__form-title mb-4"><?= $contact_text['title'] ?></h2>
          <div class="mb-5"><?= $contact_text['text'] ?></div>
          <h4 class="site__form-sub-title my-4"><?= $contact_text['sub-title'] ?></h4>
          
          <address class="d-flex">
            <a href="tel:<?= __($contact_info['telephone'], THEME_NAMESPACE) ?>"><?= __($contact_info['telephone'], THEME_NAMESPACE) ?></a>
            <a href="mailto:<?= __($contact_info['email'], THEME_NAMESPACE) ?>"><?= __($contact_info['email'], THEME_NAMESPACE) ?></a>
          </address>
          <?php
            if($post && $post->post_name == 'contact') {
          ?>
          <h4 class="my-4"><?= $contact_text['write_to_us']['title'] ?></h4>
          <?= $contact_text['write_to_us']['text'] ?>
          <?php
            }
          ?>
          <address class="d-flex">            
            <?= $contact_info['address'] ?>
          </address>
          <?php
            if(is_singular('care-home')) {
              get_template_part('partials/care-home-follow');
            }
          ?>
        </div>
      </div>
    <?php
      }
    ?>
      <div class="col-12<?= ($register_page_id != $post->ID)? ' col-md-6' : null ?>" data-aos="fade-up">
      <?= do_shortcode($form_shortcode); ?>
      </div>
    </div>
  </div>
</section>
