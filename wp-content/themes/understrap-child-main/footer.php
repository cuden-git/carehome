<?php
$sm_links = get_field('social_media', 'option');
?>
    <!-- prettier-ignore -->
    <script>(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "<?= GOOGLE_API_KEY ?>", v: "weekly"});</script>
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
    ?>
    <div class="container site__footer-wrap">
      <div class="row">
    <!-- -->
      <div class="site__footer-logos col-12 col-md-3">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" itemprop="url">
          <img src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/logo-light.svg' ) ?>" alt="<?= __('Quantum Care', THEME_NAMESPACE) ?>">
        </a>
        <a href="<?= esc_url( 'https://www.nationalcareforum.org.uk/' ); ?>" itemprop="url">
          <img src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/logo-ncf.svg' ) ?>" alt="<?= __('Quantum Care', THEME_NAMESPACE) ?>">
        </a>
      </div>
    <!-- -->
        <div class="col-12 col-md-3">
          <h3 class="site__footer-title"><?= __('Useful Links', THEME_NAMESPACE) ?></h3>
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
        <div class="col-12 col-md-3">
          <h3 class="site__footer-title"><?= __('Policies', THEME_NAMESPACE) ?></h3>
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
        <div class="col-12 col-md-3">
          <h3 class="site__footer-title"><?= __('Follow Us', THEME_NAMESPACE) ?></h3>
          <div class="site__footer-socials">
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
          <p class="mb-0">@<?php echo date("Y") ?> <?= __('Quantum Care', THEME_NAMESPACE) ?></p>
        </div>
      </div>
    </div>
  </footer>
<?php wp_footer(); ?>
  </body>

</html>