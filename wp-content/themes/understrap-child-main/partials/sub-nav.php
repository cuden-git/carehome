<?php
	$child_pages = qc_page_secondary_nav();

	if(!empty($child_pages)) {
?>
		<nav class="site__sub-nav">
			<ul class="container list-inline d-flex">
		<?php
		foreach($child_pages as $child) {
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