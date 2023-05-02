<?php

$xml_string = file_get_contents('http://ftp.geoinfo.msl.mt.gov/Documents/Metadata/GIS_Inventory/35524afc-669b-4614-9f44-43506ae21a1d.xml');
$xml_object = simplexml_load_string($xml_string);
$json_string = json_encode($xml_object);
$json_object = json_decode($json_string, true);
print_r($json_object);

