<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$jsonFile = 'plants.json';

function loadPlantsFromXML() {
    $xmlFile = 'plant_catalog.xml';
    if (!file_exists($xmlFile)) {
        return [];
    }
    
    $xml = simplexml_load_file($xmlFile);
    $plants = [];
    $id = 1;
    
    foreach ($xml->PLANT as $plant) {
        $plants[] = [
            'id' => $id++,
            'common' => (string)$plant->COMMON,
            'botanical' => (string)$plant->BOTANICAL,
            'zone' => (string)$plant->ZONE,
            'light' => (string)$plant->LIGHT,
            'price' => (string)$plant->PRICE,
            'availability' => (string)$plant->AVAILABILITY
        ];
    }
    
    return $plants;
}

function loadPlantsData() {
    global $jsonFile;
    
    if (file_exists($jsonFile)) {
        $jsonData = file_get_contents($jsonFile);
        $plants = json_decode($jsonData, true);
        return $plants ? $plants : [];
    } else {
        $plants = loadPlantsFromXML();
        savePlantsData($plants);
        return $plants;
    }
}

function savePlantsData($data) {
    global $jsonFile;
    
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);
    $result = file_put_contents($jsonFile, $jsonData);
    
    return $result !== false;
}

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');

switch ($action) {
    case 'load':
        $plants = loadPlantsData();
        echo json_encode($plants);
        break;
        
    case 'save':
        if (isset($_POST['data'])) {
            $data = json_decode($_POST['data'], true);
            if ($data !== null) {
                $success = savePlantsData($data);
                echo json_encode(['success' => $success, 'message' => $success ? 'Data saved successfully' : 'Failed to save data']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No data provided']);
        }
        break;
        
    default:
        echo json_encode(['error' => 'Invalid action']);
        break;
}
?>