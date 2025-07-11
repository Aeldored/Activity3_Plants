let plantsData = [];
let selectedPlantIndex = -1;

window.onload = function() {
    loadPlantsData();
    setupSearchFunctionality();
};

function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterPlantsTable(this.value);
        });
    }
}

function loadPlantsData() {
    fetch('backend.php?action=load')
        .then(response => response.json())
        .then(data => {
            plantsData = data;
            populateZoneDropdown();
            displayPlantsTable();
        })
        .catch(error => {
            console.error('Error loading plants data:', error);
            loadFromXML();
        });
}

function loadFromXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "plant_catalog.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            parseXMLData(xhr.responseXML);
            savePlantsData();
        }
    };
    xhr.send();
}

function parseXMLData(xmlDoc) {
    const plants = xmlDoc.getElementsByTagName("PLANT");
    plantsData = [];
    
    for (let i = 0; i < plants.length; i++) {
        const plant = plants[i];
        const plantData = {
            id: i + 1,
            common: plant.getElementsByTagName("COMMON")[0].textContent,
            botanical: plant.getElementsByTagName("BOTANICAL")[0].textContent,
            zone: plant.getElementsByTagName("ZONE")[0].textContent,
            light: plant.getElementsByTagName("LIGHT")[0].textContent,
            price: plant.getElementsByTagName("PRICE")[0].textContent,
            availability: plant.getElementsByTagName("AVAILABILITY")[0].textContent
        };
        plantsData.push(plantData);
    }
    
    // Populate Zone dropdown from XML data
    populateZoneDropdown();
    displayPlantsTable();
}

function populateZoneDropdown() {
    const zoneSelect = document.getElementById('zone');
    const zones = plantsData.map(plant => plant.zone);
    
    // Get unique zones only
    const uniqueZones = [...new Set(zones)].sort();
    
    // Keep the default "Choose zone..." option
    zoneSelect.innerHTML = '<option value="">Choose zone...</option>';
    
    // Add only unique zones from XML data
    uniqueZones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone;
        zoneSelect.appendChild(option);
    });
    
    console.log(`Zone dropdown populated with ${uniqueZones.length} unique options from XML data`);
}

function addZoneToDropdown(zoneValue) {
    if (!zoneValue || zoneValue.trim() === '') return;
    
    const zoneSelect = document.getElementById('zone');
    const existingOptions = Array.from(zoneSelect.options);
    const trimmedZone = zoneValue.trim();
    
    // Check if zone already exists
    const exists = existingOptions.some(option => 
        option.value && 
        option.value.toLowerCase().trim() === trimmedZone.toLowerCase()
    );
    
    if (!exists) {
        const newOption = document.createElement('option');
        newOption.value = trimmedZone;
        newOption.textContent = trimmedZone;
        zoneSelect.appendChild(newOption);
        console.log(`Added new zone to dropdown: ${trimmedZone}`);
    }
}

function displayPlantsTable() {
    const tbody = document.querySelector("#plantTable tbody");
    tbody.innerHTML = "";
    
    plantsData.forEach((plant, index) => {
        const row = document.createElement("tr");
        row.dataset.index = index;
        
        row.innerHTML = `
            <td>${plant.common}</td>
            <td>${plant.botanical}</td>
            <td>${plant.zone}</td>
            <td>${plant.light}</td>
            <td>${plant.price}</td>
            <td>${plant.availability}</td>
        `;
        
        row.addEventListener("click", function() {
            selectPlant(index);
        });
        
        tbody.appendChild(row);
    });
}

function selectPlant(index) {
    // Clear previous selection
    document.querySelectorAll("#plantTable tbody tr").forEach(tr => tr.classList.remove("selected-row"));
    
    // Select current row
    const selectedRow = document.querySelector(`tr[data-index="${index}"]`);
    if (selectedRow) {
        selectedRow.classList.add("selected-row");
    }
    
    selectedPlantIndex = index;
    const plant = plantsData[index];
    
    // Populate form fields
    if (plant) {
        console.log('Selected plant data:', plant); // Debug log
        
        document.getElementById("common").value = plant.common || '';
        document.getElementById("botanical").value = plant.botanical || '';
        
        // Handle zone field - set exact value from data
        document.getElementById("zone").value = plant.zone || '';
        
        // Handle light field - try to match existing options or add new one  
        setSelectValue("light", plant.light);
        
        // Handle price - remove $ symbol if present
        const priceValue = (plant.price || '').replace('$', '');
        document.getElementById("price").value = priceValue;
        
        // Handle availability as text input
        document.getElementById("availability").value = plant.availability || '';
        
        // Add visual feedback
        showNotification('Plant selected for editing', 'info');
    }
}

function addPlant() {
    const formData = getFormData();
    if (!validateForm(formData)) return;
    
    const newPlant = {
        id: plantsData.length > 0 ? Math.max(...plantsData.map(p => p.id)) + 1 : 1,
        ...formData
    };
    
    plantsData.push(newPlant);
    
    // Add new zone to dropdown if it doesn't exist
    addZoneToDropdown(formData.zone);
    
    savePlantsData();
    displayPlantsTable();
    clearForm();
    showNotification("Plant added successfully!", "success");
}

function updatePlant() {
    if (selectedPlantIndex === -1) {
        showNotification("Please select a plant to update.", "error");
        return;
    }
    
    const formData = getFormData();
    if (!validateForm(formData, true)) return;
    
    plantsData[selectedPlantIndex] = {
        ...plantsData[selectedPlantIndex],
        ...formData
    };
    
    savePlantsData();
    displayPlantsTable();
    clearForm();
    showNotification("Plant updated successfully!", "success");
}

function deletePlant() {
    if (selectedPlantIndex === -1) {
        showNotification("Please select a plant to delete.", "error");
        return;
    }
    
    const plant = plantsData[selectedPlantIndex];
    if (confirm(`Are you sure you want to delete "${plant.common}"?`)) {
        plantsData.splice(selectedPlantIndex, 1);
        savePlantsData();
        displayPlantsTable();
        clearForm();
        showNotification("Plant deleted successfully!", "success");
    }
}

function getFormData() {
    return {
        common: document.getElementById("common").value.trim(),
        botanical: document.getElementById("botanical").value.trim(),
        zone: document.getElementById("zone").value.trim(),
        light: document.getElementById("light").value.trim(),
        price: document.getElementById("price").value.trim(),
        availability: document.getElementById("availability").value.trim()
    };
}

function setSelectValue(elementId, value) {
    const select = document.getElementById(elementId);
    const trimmedValue = (value || '').trim();
    
    // First try to find an exact match
    let optionFound = false;
    for (let option of select.options) {
        if (option.value === trimmedValue || option.text === trimmedValue) {
            select.value = option.value;
            optionFound = true;
            break;
        }
    }
    
    // If no exact match, try partial matching for light field
    if (!optionFound && elementId === 'light') {
        const lightValue = trimmedValue.toLowerCase();
        
        // Map XML light values to form options
        if (lightValue.includes('sun or shade') || lightValue.includes('sun and shade')) {
            select.value = 'Partial Sun';
            optionFound = true;
        } else if (lightValue.includes('mostly sunny') || lightValue === 'sunny') {
            select.value = 'Full Sun';
            optionFound = true;
        } else if (lightValue.includes('mostly shady') || lightValue.includes('mostly shade')) {
            select.value = 'Partial Shade';
            optionFound = true;
        } else if (lightValue === 'shade' || lightValue.includes('full shade')) {
            select.value = 'Full Shade';
            optionFound = true;
        } else if (lightValue === 'sun' || lightValue.includes('full sun')) {
            select.value = 'Full Sun';
            optionFound = true;
        }
    }
    
    
    // If still no match found, add a temporary option
    if (!optionFound && trimmedValue) {
        const newOption = document.createElement('option');
        newOption.value = trimmedValue;
        newOption.textContent = `${trimmedValue} (from data)`;
        newOption.style.fontStyle = 'italic';
        newOption.style.color = '#666';
        select.appendChild(newOption);
        select.value = trimmedValue;
        
        // Add a note that this is custom data
        console.log(`Added custom ${elementId} option: ${trimmedValue}`);
    }
}

function manualRemoveDuplicates() {
    const originalCount = plantsData.length;
    removeDuplicates();
    
    if (originalCount === plantsData.length) {
        showNotification('No duplicates found in the catalog', 'info');
    } else {
        displayPlantsTable();
        savePlantsData();
        showNotification(`Catalog cleaned! Removed ${originalCount - plantsData.length} duplicate${originalCount - plantsData.length > 1 ? 's' : ''}`, 'success');
    }
}

function filterPlantsTable(searchTerm) {
    const tbody = document.querySelector("#plantTable tbody");
    const rows = tbody.querySelectorAll("tr");
    
    if (!searchTerm.trim()) {
        rows.forEach(row => row.style.display = "");
        return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        let found = false;
        
        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchLower)) {
                found = true;
            }
        });
        
        row.style.display = found ? "" : "none";
    });
}

function clearForm() {
    document.getElementById("plantForm").reset();
    selectedPlantIndex = -1;
    document.querySelectorAll("#plantTable tbody tr").forEach(tr => tr.classList.remove("selected-row"));
    showNotification("Form cleared", "info");
}

function savePlantsData() {
    const formData = new FormData();
    formData.append('action', 'save');
    formData.append('data', JSON.stringify(plantsData));
    
    fetch('backend.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (!result.success) {
            console.error('Error saving data:', result.message);
        }
    })
    .catch(error => {
        console.error('Error saving data:', error);
    });
}

// Enhanced notification system with smooth animations
function showNotification(message, type = 'success') {
    // Remove existing notifications with fade out
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.classList.add('fade-out');
        setTimeout(() => {
            if (existingNotification.parentNode) {
                existingNotification.remove();
            }
        }, 300);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds with fade out animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Enhanced validation with better user feedback
function validateForm(data, isUpdate = false) {
    const requiredFields = {
        common: 'Common Name',
        botanical: 'Botanical Name',
        zone: 'Zone',
        light: 'Light Requirements',
        price: 'Price',
        availability: 'Availability'
    };
    
    for (let key in requiredFields) {
        if (!data[key] || data[key].trim() === '') {
            showNotification(`Please fill in the ${requiredFields[key]} field.`, 'error');
            document.getElementById(key).focus();
            return false;
        }
    }
    
    // Validate price is a positive number
    const price = parseFloat(data.price);
    if (isNaN(price) || price < 0) {
        showNotification('Please enter a valid price (positive number).', 'error');
        document.getElementById('price').focus();
        return false;
    }
    
    // Check for duplicates (only when adding new plants, not updating)
    if (!isUpdate && isDuplicatePlant(data)) {
        return false;
    }
    
    
    return true;
}

function isDuplicatePlant(newPlantData) {
    const duplicates = plantsData.filter((plant, index) => {
        // Skip the currently selected plant when updating
        if (index === selectedPlantIndex) return false;
        
        // Check if both common name and botanical name match (case insensitive)
        const commonMatch = plant.common.toLowerCase().trim() === newPlantData.common.toLowerCase().trim();
        const botanicalMatch = plant.botanical.toLowerCase().trim() === newPlantData.botanical.toLowerCase().trim();
        
        return commonMatch && botanicalMatch;
    });
    
    if (duplicates.length > 0) {
        const existingPlant = duplicates[0];
        showNotification(`A plant with the name "${existingPlant.common}" (${existingPlant.botanical}) already exists in the catalog.`, 'error');
        return true;
    }
    
    return false;
}

function isDuplicateZone(zoneValue, isUpdate = false) {
    // Check if this zone value already exists in the dropdown
    const zoneSelect = document.getElementById('zone');
    const existingOptions = Array.from(zoneSelect.options);
    const trimmedZone = zoneValue.trim();
    
    // Skip empty value and the default option
    if (!trimmedZone || trimmedZone === '') return false;
    
    const duplicateExists = existingOptions.some(option => 
        option.value && 
        option.value.toLowerCase().trim() === trimmedZone.toLowerCase()
    );
    
    if (duplicateExists && !isUpdate) {
        showNotification(`Zone "${zoneValue}" already exists in the dropdown. Please select from existing options.`, 'error');
        return true;
    }
    
    return false;
}

function removeDuplicates() {
    const originalCount = plantsData.length;
    const uniquePlants = [];
    const seenPlants = new Set();
    
    plantsData.forEach((plant, index) => {
        // Create a unique key using both common and botanical names (case insensitive)
        const uniqueKey = `${plant.common.toLowerCase().trim()}|${plant.botanical.toLowerCase().trim()}`;
        
        if (!seenPlants.has(uniqueKey)) {
            seenPlants.add(uniqueKey);
            uniquePlants.push({
                ...plant,
                id: uniquePlants.length + 1 // Reassign IDs
            });
        } else {
            console.log(`Removed duplicate plant: ${plant.common} (${plant.botanical})`);
        }
    });
    
    plantsData = uniquePlants;
    
    // Show notification if duplicates were found and removed
    const duplicatesRemoved = originalCount - plantsData.length;
    if (duplicatesRemoved > 0) {
        showNotification(`Removed ${duplicatesRemoved} duplicate plant${duplicatesRemoved > 1 ? 's' : ''} from catalog`, 'info');
    }
}