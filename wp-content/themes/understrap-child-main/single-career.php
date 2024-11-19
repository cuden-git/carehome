<?php
/**
 * The template for single career posts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );

$close_date = get_field('career_closing_date');
$pay_rate = get_field('career_pay_rate');
$shift_job_type = qc_get_job_type(get_the_ID());//get_the_terms(get_the_ID(), 'careers-category');
$job_location = get_field('career_care_home');
$disclaimer = get_field('careers_disclaimer', 'option');
$t_cs = get_field('t_cs', 'option');
$recipient_email = get_field('career_recipient_email');
?>

  <main class="site__main" id="main">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 site__sidebar">
          <?php get_template_part('/partials/single-career-sidebar') ?>
        </div>
        <div class="col-12 col-md-8 site__content">
          <?php
          while ( have_posts() ) {
            the_post();
          ?>
          <div class="">
            <h4><?= __('About this role', THEME_NAMESPACE) ?>:</h4>
          <!-- -->
            <div class="career-single__spec">
              <p><strong><?= __('Pay', THEME_NAMESPACE) ?>: </strong><?= $pay_rate ?></p>
              <p><strong><?= __('Location', THEME_NAMESPACE) ?>: </strong><?= $job_location->post_title ?></p>
              <p><strong><?= __('Shift Time', THEME_NAMESPACE) ?>: </strong><?= $shift_job_type['shift'] ?></p>
              <p><strong><?= __('Type', THEME_NAMESPACE) ?>: </strong><?= $shift_job_type['job'] ?></p>
            </div>
          <!-- -->
            <div class="career-single__disclaimer">
              <?= $disclaimer ?>
            </div>
          <!-- -->
          <?php
            the_content();
          }
          ?>
            <!-- -->
            <div class="career-single__footnote">
              <h6 class="career-single__footnote-title"><?= $t_cs['title'] ?></h6>
              <div class="text">
              <?= $t_cs['text'] ?>
              </div>
            </div>
            <!-- -->
          </div>
        </div>
      </div>
    </div>
  </main>
<?php
get_footer();
