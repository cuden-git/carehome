<?php
$show = get_sub_field('show');
$cta_btn = get_sub_field('call_to_action');
?>

<?php
if($show) {
  $title = get_sub_field('title');
  $posts = get_posts(
    [
      'numberposts' => 3,
    ]
  );
?>
<section  data-aos="fade-up" class="post-section fc__news my-5">
  <div class="container pt-md-5 pt-0">
    <h2 class="post-section__title mb-4 "><?= $title ?></h2>
    <div class="row">
    <?php
    foreach($posts as $post) {
      get_template_part('partials/news-card', null, ['no-archive' => true]);
    }
    ?>
      <div class="col-12 d-flex justify-content-center fc__news-cta mt-5">
        <?php
        if($cta_btn) {
        ?>
        <a href="<?= $cta_btn['url'] ?>" title="<?= __($cta_btn['title'], THEME_NAMESPACE) ?>" class="btn btn-primary"><?= __($cta_btn['title'], THEME_NAMESPACE) ?></a>
        <?php
        }
        ?>
      </div>
    </div>
  </div>
</section>
<?php
wp_reset_postdata();
}
?>
