<?php
/**
* Template Name: Career benefits template
*/
?>

<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$cta_blocks = get_field('cta_blocks');
$testimonials = get_field('cr_testimonials');

get_header();
?>
<main class="site__main c-roles" id="main">
  <div class="container py-lg-5 my-lg-5 py-0">
    <div class="row">
      <div class="col-12 col-xl-5 col-lg-6 d-flex align-items-center">
        <div class="pe-lg-5 pe-0">
          <h2 class="page-intro__title"><?php the_title() ?></h2>
          <?php the_content() ?>
        </div>
      </div>
      <div class="col-12 col-xl-7 col-lg-6">
        <figure class="role__img">
          <?= get_the_post_thumbnail( get_the_ID() ) ?>
        </figure>
      </div>
    </div>
  </div>
  <section class="post-section care-home__overview flexi-working-section py-5 bg-secondary">
    <div class="container">
      <div class="row">
        <?php 

if( have_rows('benefits') ):
  while( have_rows('benefits') ) : the_row();
   ?>
 <div class="col-lg-4 col-md-6 h-auto mb-5  ">
          <div data-aos="fade-up" class="h-100  border-bottom-white pb-2 mb-3">
              <h2  class=" text-white post-section__title mb-3"><?= get_sub_field('hero'); ?></h2>
              <div><?= get_sub_field('copy'); ?></div>
              <?php 
                 $link = get_sub_field('btn');
                if( $link ): 
                  $link_url = $link['url'];
                  $link_title = $link['title'];
                  $link_target = $link['target'] ? $link['target'] : '_self'; ?>
                  <a class="btn btn-white my-3" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
                  <?php endif; ?>
          </div>
        </div>
   <?php
  endwhile;
endif;
        ?>
      </div>
    
    </div>
  </section>
 

 <?php 
 if($testimonials !=""){
  get_template_part('/partials/flexible-content/fc-testimonials', null, ['testimonials' => $testimonials['testimonial_fields']]); 
 }
 if($cta_blocks !=""){
 ?>
<div class="py-lg-5 py-0 mb-5">
<?php
    get_template_part('/partials/flexible-content/fc-cta-blocks', null, ['cta_blocks' => $cta_blocks]);
?>
</div>
<?php } ?>
</main>
<?php
get_footer();
