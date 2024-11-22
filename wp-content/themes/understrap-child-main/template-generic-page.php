<?php
/**
* Template Name: Generic page
*/
?>
<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$top_section = get_field('g_img_text_top');
$double_section = get_field('g_double_img_text');
$bottom_section = get_field('g_img_text_bottom');

get_header();
?>

<main class="site__main" id="main">
<!-- -->
<?php
if($top_section) {
  get_template_part('/partials/img-text-block', null, [$top_section, 'order' => [2, 1]]);
}
?>
<!-- Double section -->
<?php
if($double_section) {
  get_template_part('/partials/img-text-double-block');
}
?>
<!-- -->
<?php
if($bottom_section) {
  get_template_part('/partials/img-text-block', null, [$bottom_section, 'order' => [1, 2]]);
}
?>
</main>

<?php
get_footer();