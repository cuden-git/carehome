<?php
global $post;
$is_premium = qc_is_premium();
$sm_links = get_field('social_media', 'option');
$is_premium = qc_is_premium();

if($is_premium) {
  $logo_src = 'logo-select.svg';
}else {
  $logo_src = 'logo-light.svg';
}
?>
    <!-- prettier-ignore -->

    </div><!-- #page -->
  <footer class="site__footer bg-secondary<?= (is_singular('career'))? ' site__footer--short' : null ?>">
    <?php
      if(is_singular('career')) {
        get_template_part('/partials/career-apply-form');
      }else if(is_singular('care-home')) {
        get_template_part('/partials/care-home-brochures');
      }else {
        get_template_part('/partials/contact-form');
      }

      if($post->post_name === 'contact') {
        get_template_part('/partials/contact-map');
      }
    ?>
    <div class="container site__footer-wrap">
      <div class="row">
    <!-- -->
      <div class="site__footer-logos col-12 col-md-6 col-lg-3 mb-lg-0 mb-5">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" itemprop="url">
          <img class="qc-logo" src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/' . $logo_src ) ?>" alt="<?= __('Quantum Care', THEME_NAMESPACE) ?>">
        </a>
        <a href="<?= esc_url( 'https://www.nationalcareforum.org.uk/' ); ?>" itemprop="url">
          <img class="ncf-logo" src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/logo-ncf.svg' ) ?>" alt="<?= __('Quantum Care', THEME_NAMESPACE) ?>">
        </a>
      </div>
    <!-- -->
        <div class="col-12 col-md-6 col-lg-3 mb-lg-0 mb-5">
          <h5 class="site__footer-title mb-3"><?= __('Useful Links', THEME_NAMESPACE) ?></h5>
        <?php
          wp_nav_menu(
            array(
              'theme_location'  => 'footer',
              'container_class' => 'site__footer-links',
              'menu_class'      => 'list-inline',
              'fallback_cb'     => '',
              'menu_id'         => 'useful-links',
              'depth'           => 1,
            )
          );
        ?>
        </div>
        <div class="col-6 col-md-6 offset-xl-1 col-lg-3 col-xl-2 mb-lg-0 mb-5">
          <h5 class="site__footer-title mb-3"><?= __('Policies', THEME_NAMESPACE) ?></h5>
        <?php
          wp_nav_menu(
            array(
              'theme_location'  => 'footer-secondary',
              'container_class' => 'site__footer-links',
              'menu_class'      => 'list-inline',
              'fallback_cb'     => '',
              'menu_id'         => 'policies',
              'depth'           => 1,
            )
          );
        ?>
        </div>
        <div class="col-6 col-xl-2 offset-xl-1 col-lg-3 col-6 mb-lg-0 mb-5">
          <h5 class="site__footer-title mb-3"><?= __('Follow Us', THEME_NAMESPACE) ?></h5>
          <div class="site__footer-socials mb-3">
          <?php
          foreach($sm_links as $key=>$sm_link) {
          ?>
            <a href="<?= esc_url( $sm_link ) ?>' title="<?= $key ?>">
              <i class="icon-<?= $key ?>"></i>
            </a>
          <?php
          }
          ?>
          </div>
          <p class="mb-0"><small>©<?php echo date("Y") ?> <?= __('Quantum Care', THEME_NAMESPACE) ?></small></p>
        </div>
      </div>
    </div>
  </footer>
<?php wp_footer(); ?>
  </body>

</html>