<?php
	global $post;

	$pages = qc_page_secondary_nav();

	if(!empty($pages['children'])) {
?>
		<nav class="site__sub-nav menu-collapse">
			<div class="d-md-none d-flex h-100 menu-collapse__display align-items-center justify-content-center"><span class="d-block"></span><i class="icon-arrow-down"></i></div>
			<ul class="list-inline d-flex flex-column flex-md-row">
		<?php
		foreach($pages['children'] as $child) {
			if($child && $child->ID != $post->ID ) {
		?>			
				<li class="<?= ($child->ID === get_the_ID())? 'current' : null ; ?>"><a href="<?= get_permalink($child->ID) ?>" class="py-4" title="<?= $child->post_title ?>"><?= $child->post_title ?></a></li>
		<?php
			}
		}
		?>
			</ul>
		</nav>
<?php
	}
?>