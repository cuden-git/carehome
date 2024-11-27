<?php
	global $post;

	$pages = qc_page_secondary_nav();

	if(!empty($pages['children'])) {
?>
		<nav class="site__sub-nav menu-collapse">
			<div class="d-md-none h-100 menu-collapse__display"><span></span></div>
			<ul class="container list-inline d-flex flex-column flex-md-row">
		<?php
			if($pages['parent'] && $pages['parent']->ID != $post->ID ) {
		?>
				<li><a href="<?= get_permalink($pages['parent']->ID) ?>" title="<?= $pages['parent']->post_title ?>"><?= $pages['parent']->post_title ?></a></li>
		<?php
			}
		foreach($pages['children'] as $child) {
		?>
				<li class="<?= ($child->ID === get_the_ID())? 'current' : null ; ?>"><a href="<?= get_permalink($child->ID) ?>" title="<?= $child->post_title ?>"><?= $child->post_title ?></a></li>
		<?php
		}
		?>
			</ul>
		</nav>
<?php
	}
?>