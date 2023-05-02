<?php

/**
 * return filtered list of id with price greater than certain threshold
 * @param array $list
 * @param int $threshold
 * @return array
 */
function getFilteredPriceListGreaterThanThreshold(array $list, float $threshold): array {
    if(!is_array($list) || empty($list) || !array_key_exists('price', $list[0]) || !array_key_exists('id', $list[0])) {
        throw new Exception("Invalid List provided");
    }

    return array_filter($list, function($item) use($threshold) {
        return $item['price'] > $threshold;
    });
}

/**
 * return sum of filtered list of id with price greater than certain threshold
 * @param array $list
 * @param int $threshold
 * @return float
 */
function getSumFilteredPriceListGreaterThanThreshold(array $list, float $threshold): float {
    $filteredList = getFilteredPriceListGreaterThanThreshold($list, $threshold);

    $total = array_reduce($filteredList, function($sum, $item){
        return ($sum + $item['price']);
    }, 0);

    return  $total;
}