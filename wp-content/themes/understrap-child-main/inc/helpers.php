<?php

/**
 * Function to measure distance between 2 sets of long/lat coords
 *  as the crow flies based on the Haversine formula.
 * Set $earth_radius to 3959 for miles and 6371 for kilometers
 */
function qc_coords_distance($lat_from, $long_from, $lat_to, $long_to, $earth_radius = 3959)
{
	// Convert from degrees to radians
	$lat_from = deg2rad($lat_from);
	$long_from = deg2rad($long_from);
	$lat_to = deg2rad($lat_to);
	$long_to = deg2rad($long_to);

	// Haversine formula
	$lat_delta = $lat_to - $lat_from;
	$long_delta = $long_to - $long_from;

	$a = sin($lat_delta / 2) * sin($lat_delta / 2) +
		cos($lat_from) * cos($lat_to) *
		sin($long_delta / 2) * sin($long_delta / 2);
	$c = 2 * atan2(sqrt($a), sqrt(1 - $a));

	// Calculate the distance
	return round($earth_radius * $c);
}

/**
 * Extract repeater tabbed content fields
 */
function qc_tabbed_content_arrays($rows) {
	$arr = [];
	$arr['tabs'] = [];
	$arr['content'] = [];

	if($rows) {
		foreach( $rows as $row ) {
			array_push($arr['tabs'], $row['job_title']);
			array_push($arr['content'], [
				'img' => wp_get_attachment_image($row['image']['ID'], 'large'),
				'name' => $row['name'],
				'role' => $row['role'],
				'description' => $row['description']
			]);
		}
	}

	return $arr;
}
