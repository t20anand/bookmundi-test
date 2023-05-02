<?php
/**
 * Return Output to screen
 * @param mixed $output
 * @param mixed $statusCode
 * @return void
 */
function sendOutput($output, $statusCode) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo (!empty($output))? json_encode($output) : '';
}

/**
 * check input field for empty
 * @param array $fields
 * @param array $validationError
 * @return void
 */
function isRequired(array $fields, array &$validationError) {
    foreach($fields as $field) {
       if(empty($_POST[$field])){
            $validationError[$field][] = ucfirst($field).' field is required';
       }
    }
}

// only POST request allowed
if("POST"!=$_SERVER['REQUEST_METHOD']){
    return sendOutput('', 404);
}

$validationError = [];

isRequired(['id', 'value'], $validationError);

if(!empty($validationError)){
    return sendOutput($validationError, 400);
}

$id = $_POST['id'];
$value = $_POST['value'];


// checking id field for numeric
if(!is_numeric($id)) {
    $validationError['id'][] = "Id must be numeric";
}

// checking value field for string
if(!is_string($value)) {
    $validationError['value'][] = "Value must be string";
}

if(!empty($validationError)){
    return sendOutput($validationError, 400);
}

return sendOutput(['id'=>$id, 'value'=>$value], 200);

