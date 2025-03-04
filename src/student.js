import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    500
);

camera.position.set(0, 250, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(new THREE.Color(0xF4F4F4));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

const ambientLight = new THREE.AmbientLight(0xf6f6f6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
directionalLight.position.set(10, 35, 50);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 1;
controls.enableZoom = true;
controls.zoomSpeed = 2;
controls.minDistance = 120;
controls.maxDistance = 300;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2.5;
controls.update();

// Lists of locations for markers and navigating
const locations = {
    mainEntrance: {
        position: { x: 68, y: 10, z: 75 },
        title: 'Main Entrance',
        description: 'The main entry point to the University of Perpetual Help System DALTA, providing direct access to the campus facilities and serving as a welcoming area for students, staff, and visitors.',
        tags: ['entrance', 'main']
    },
    adminBuilding: {
        position: { x: -21, y: 10, z: -30 },
        title: 'Administration Building',
        description: 'The central administrative building of the university, home to key offices like the Registrar, Cashier, and Information Technology Services (ITS). It also houses classrooms and labs for the College of Computer Studies and the College of Law, ensuring both academic and operational functions are supported.',
        tags: ['Admin', 'Administration', 'ITS [ID Section]', 'Information Technology', 'Computer Science',
            'University Cashier [Ground Floor]', 'Registrar Office[Ground Floor]',
            'Mac Lab [Second Floor]',
            // College of Law
            'College of Law [Ground Floor]',
            // College of Dentistry
            'College of Dentistry [Ground Floor]',
            // CCS
            'CCS - Faculty Office [Second Floor]', 'CCS', 'College of Computer Studies [Second Floor]',
            // Comms
            'Department of Communication [Third Floor]',
            // Rooms
            'Room 201 [Second Floor]', 'Room 202 [Second Floor]', 'Room 203 [Second Floor]', 'Room 205 [Second Floor]',
            // Admission Office
            'Admission Office [Ground Floor]',
        ],
        panoramaImages: [
            { src: '/assets/panoramas/adminBuilding.jpg', label: 'Ground Floor - Inside admin building' },
            { src: '/assets/panoramas/admissionOffice.jpg', label: 'Ground Floor - Admission Office' },
            { src: '/assets/panoramas/collegeOfLaw.jpg', label: 'Ground Floor - College of Law' },
            { src: '/assets/panoramas/cashier.jpg', label: 'Ground Floor - Cashier' },
            { src: '/assets/panoramas/registrar.jpg', label: 'Ground Floor - Registrar' },
            { src: '/assets/panoramas/ccsBuilding1.jpg', label: 'Second Floor - College Of Computer Studies' },
            { src: '/assets/panoramas/ccsBuilding2.jpg', label: 'Second Floor - College Of Computer Studies' },
            { src: '/assets/panoramas/ccsBuilding3.jpg', label: 'Second Floor - College Of Computer Studies' },
            { src: '/assets/panoramas/ccsBuilding4.jpg', label: 'Second Floor - College Of Computer Studies' },
            { src: '/assets/panoramas/ccsBuilding5.jpg', label: 'Second Floor - College Of Computer Studies' }
        ]
    },
    newGradeSchoolBuilding: {
        position: { x: 10, y: 10, z: -20 },
        title: 'New Grade School Building',
        description: 'A modern facility designed for grade school students, featuring updated classrooms and learning spaces tailored to provide an engaging and effective educational experience.',
        tags: ['New', 'Grade School', 'Grade', "Grade School Principal Office [Ground Floor]"]
    },
    oldGradeSchoolBuilding: {
        position: { x: -90, y: 10, z: -10 },
        title: 'Old Grade School Building',
        description: 'A building now repurposed for various administrative functions. It houses offices for the College of Medical Technology, Business Administration, and other departments, providing essential support for academic and administrative activities.',
        panoramaImages: [
            { src: '/assets/panoramas/oldGradeSchoolEntrance.jpg', label: 'Ground Floor - Entrance' },
            { src: '/assets/panoramas/insideOldGradeSchoolBuilding.jpg', label: 'Ground Floor - Inside Entrance' },
            { src: '/assets/panoramas/schoolDirectorOffice.jpg', label: 'Ground Floor - Office of School Director' },
            { src: '/assets/panoramas/gspcOffice.jpg', label: 'Ground Floor - Graduate School Program Chairperson Office' },
            { src: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg', label: "Second Floor - CBAA Dean’s Office and MED TECH Dean’s Office" },
            { src: '/assets/panoramas/nursingDeanOffice.jpg', label: "Second Floor - Nursing Dean’s Office" },
            { src: '/assets/panoramas/PTOTRTDeanOffice.jpg', label: "Second Floor - PT/OT/RT Dean’s Office" },
            { src: '/assets/panoramas/CASDeanOffice.jpg', label: "Second Floor - College of Arts and Science Dean’s Office" },
            { src: '/assets/panoramas/CPDeanOffice.jpg', label: "Second Floor - College of Pharmacy Dean’s Office" },
            { src: '/assets/panoramas/EDUCOffice.jpg', label: "Second Floor - College of Education Dean’s Office" },
            { src: '/assets/panoramas/researchAndDevelopmentCenter.jpg', label: "Second Floor - Research and Development Center" },
            { src: '/assets/panoramas/VPOffice.jpg', label: "Second Floor - Office of Executive Vice President" },
        ],
        tags: ["School Director Office [Ground Floor]", "Graduate School Program Chairperson Office [Ground Floor]",
            "Community Extension Services Office [Ground Floor]",
            "Marketing and Sales Office [Ground Floor]",
            "International Student Affairs Office [Ground Floor]",
            "Safety and Health Office [Ground Floor]",
            "HR Office [Ground Floor]",
            "DEAC [Ground Floor]",
            "Recruitment Office [Ground Floor]",
            // Perpetualite Office
            "Perpetualite Office [Second Floor]",
            "ETEEAP Office [Second Floor]",
            "NSRCS & CWTS Office [Second Floor]",
            "HR Director Office [Second Floor]",
            // Med Tech
            "College of Medical Technology", "College of Medical Technology Dean's Office [Second Floor]", "CMT", "CMT Dean's Office [Second Floor]", "Med Tech",
            // CBAA
            "College of Business Administration and Accountancy", "College of Business Administration and Accountancy Dean's Office [Second Floor]", "CBAA", "CBAA Dean's Office [Second Floor]",
            // Nursing
            "Nursing Dean's Office [Second Floor]",
            // PT OT RT
            "PT/OT/RT Dean's Office [Second Floor]", "Phsical Therapy", "Occupational Therapy", "Respiratory Therapist",
            // CAS
            "College of Arts and Science", "College of Arts and Science Dean's Office [Second Floor]", "CAS", "CAS Dean's Office [Second Floor]", 
            // CP
            "College of Pharmacy", "CP", "College of Pharmacy Dean's Office [Second Floor]",
            // Research and Development Center
            "Research and Development Center [Second Floor]",
            // Office of Executive VP
            "Office of Executive Vice President [Second Floor]",
            // SHS Principal Office
            "SHS Principal's Office [Second Floor]", "Senior High School Principal's Office [Second Floor]"
        ]
    },
    criminologyBuilding: {
        position: { x: -38, y: 10, z: -18 },
        title: 'Criminology Building',
        description: 'A dedicated facility for the College of Criminology, providing classrooms and offices that support academic programs and faculty workspaces.',
        panoramaImages: [
            { src: '/assets/panoramas/criminologyDeanOffice.jpg', label: "Ground Floor - Dean's Office" },
        ],
        tags: ["College of Criminology Dean's Office [Ground Floor]"],

    },
    epcHall: {
        position: { x: -70, y: 10, z: -53 },
        title: 'EPC Hall',
        description: 'A building that combines a comprehensive library for research and study with an auditorium used for university seminars, events, and activities.',
        panoramaImages: [
            { src: '/assets/panoramas/library.jpg', label: 'Ground Floor - Library' },
            { src: '/assets/panoramas/auditorium.jpg', label: 'Second Floor - Auditorium'}
        ],
        tags: ['University Library [Ground Floor]','Auditorium [Second Floor]', 'Arts and Culture Office [Second Floor]', 'Function Rooms [Second Floor]']
    },
    gymBuilding: {
        position: { x: 37, y: 10, z: -55 },
        title: 'Gym 1 and 2',
        description: 'Two large gymnasiums used for physical education classes, training sessions, and sports events, as well as recreational activities for students and staff.',
        tags: ['GYM', 'Basketball Court', 'Sports Office [Second Floor]']
    },
    cithmBuilding: {
        position: { x: -107, y: 10, z: -63 },
        title: 'International Hospitality Management Building',
        description: 'The main facility for the College of International Tourism and Hospitality Management, featuring modern training labs, kitchens, and classrooms designed to prepare students for the hospitality and tourism industries.',
        panoramaImages: [
            { src: '/assets/panoramas/hospitalityManagement.jpg', label: 'Ground Floor - Inside the building of International Hospitality Management' },
            { src: '/assets/panoramas/cithmDeanOffice.jpg', label: "Second Floor - CITHM Dean's Office" }
        ],
        tags: ['CITHM', "CITHM Dean's Office [Second Floor]", "College of International Tourism Hospitality Management Dean's Office [Second Floor]",
            "Security Office [Ground Floor]",
            "CITHM Library [Fourth Floor]"
        ]
    },
    newCollegeBuilding: {
        position: { x: -55, y: 10, z: -28 },
        title: 'New College Building',
        description: 'A modern facility that serves as a hub for senior high school and college students. It houses the TVET Department, Maritime Affairs offices, and classrooms for various academic programs.',
        panoramaImages: [
            { src: '/assets/panoramas/europeanGarden1.jpg', label: 'Ground Floor - European Garden' },
            { src: '/assets/panoramas/maritimeDeanOffice.jpg', label: 'Third Floor - Office of the Dean College of Maritime Education' },
            
        ],
        tags: [
            // 1st floor
            "Accounting Office [Ground Floor]",
            "Scholarship Office [Ground Floor]",
            "Engineering and Facilities Office [Ground Floor]",
            "Property Office [Ground Floor]",
            "University Clinic [Ground Floor]",
            // 2nd Floor
            "Student Affairs Services Office [Second Floor]",
            "SHS Faculty Office [Second Floor]",
            "ROTC Offices [Second Floor]",
            // 3rd Floor
            "College of Maritime [Third Floor]",
            "TVET Department [Third Floor]",
            "Office of the Senior Executive VP for Maritime Affairs [Third Floor]",
            "Office of the Dean college of Maritime Education [Third Floor]",
            // 4th Floor
            "Amphitheater [Fourth Floor]"
        ]
    },
    newHighSchoolBuilding: {
        position: { x: -78, y: 10, z: -66 },
        title: 'New High School Building',
        description: 'A modern building for high school education, featuring advanced classrooms and facilities to support student learning and extracurricular activities.',
        panoramaImages: [
            { src: '/assets/panoramas/newHighSchoolBuilding.jpg', label: '' }
        ],
        tags: ['high', 'high school', "Administration Office [Ground Floor]", "Junior Highschool Principal Office [Ground Floor]", "New Junior Business High School"]
    },
    collegeOfEngineering: {
        position: { x: -99, y: 10, z: -32 },
        title: 'College of Engineering Building',
        description: 'A facility for engineering and architecture programs, equipped with laboratories, classrooms, and resources for technical and practical learning.',
        panoramaImages: [
            { src: '/assets/panoramas/engineeringDeanOffice.jpg', label: "College of Engineering Building - Dean's Office [Second Floor]" }
        ],
        tags: ['engineering', 'architecture', 'engineer',
            "College of Electronic and Technologies Dean's Office [Second Floor]",
            "Autobacs [Third Floor]"
        ]
    },
    medicalCenterMain: {
        position: { x: 43, y: 10, z: 67 },
        title: 'Medical Center Main Building',
        description: 'The primary facility for medical services and training programs, catering to students, faculty, and staff.',
    },
    uniMall: {
        position: { x: 9, y: 10, z: 62 },
        title: 'University Mall',
        description: 'A shopping and dining area within the campus that provides retail services and food options for the university community.',
    },
    medicalArts: {
        position: { x: 20, y: 10, z: 84 },
        title: 'Medical Arts Building',
        description: 'A facility designed for healthcare education and training, featuring specialized classrooms and offices for medical-related programs.',
        tags: ['Guidance Office [Second Floor]']
    }
};

let currentPopup = null;
let currentPopupLocation = null;

function createMarker(locationData, locationId) {
    const pinGeometry = new THREE.ConeGeometry(0.5, 2, 8);
    const pinMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.position.set(locationData.position.x, locationData.position.y + 1, locationData.position.z);
    pin.rotation.x = Math.PI;
    pin.userData = { locationId };
    scene.add(pin);

    const labelDiv = document.createElement('div');
    labelDiv.className = 'location-label';
    labelDiv.textContent = locationData.title;

    const label = new CSS2DObject(labelDiv);
    label.position.set(locationData.position.x, locationData.position.y+2, locationData.position.z);
    scene.add(label);


    // Attach event listener to the label
    labelDiv.addEventListener('click', () => {
        const position = locationData.position;

        showInfo(locationId);

        new TWEEN.Tween(camera.position)
            .to({ x: position.x, y: position.y + 150, z: position.z }, 2000)
            .easing(TWEEN.Easing.Quartic.InOut)
            .onUpdate(() => {
                camera.lookAt(new THREE.Vector3(position.x, position.y, position.z));
            })
            .onComplete(() => {
                console.log(`Viewing location (top-down): ${locationData.title}`);
            })
            .start();

        new TWEEN.Tween(scene.position)
            .to({ x: -position.x, y: 0, z: -position.z }, 2000)
            .easing(TWEEN.Easing.Quartic.InOut)
            .start();
    });

    return { pin, label};
}


const hotspots = {
    pathway1: {
        position: { x: 66, y: 13, z: 57 },
        title: 'Ulane Pathway',
        panoramaImage: '/assets/panoramas/pathway_ulane1.jpg',
        nextHotspot: 'pathway2'
    },
    pathway2: {
        position: { x: 63, y: 13, z: 30 },
        title: 'Ulane Pathway',
        panoramaImage: '/assets/panoramas/pathway_ulane2.jpg',
        previousHotspot: 'pathway1',
        nextHotspot: 'pathway3'
    },
    pathway3: {
        position: { x: 54, y: 13, z: -36 },
        title: 'Ulane Pathway',
        panoramaImage: '/assets/panoramas/pathway_ulane3.jpg',
        previousHotspot: 'pathway2',
        nextHotspot: 'pathway4',
    },
    pathway4: {
        position: { x: 26, y: 10, z: -35 },
        title: 'Ulane Pathway',
        panoramaImage: '/assets/panoramas/pathway_ulane4.jpg',
        previousHotspot: 'pathway3',
        nextHotspot: 'pathway5'
    },
    pathway5: {
        position: { x: -8, y: 10, z: -34 },
        title: 'Ulane Pathway',
        panoramaImage: '/assets/panoramas/pathway_ulane5.jpg',
        previousHotspot: 'pathway4'
    },
    trackAndField: {
        position: { x: -8, y: 10, z: -41 },
        title: 'Track and Field',
        panoramaImage: '/assets/panoramas/trackAndField.jpg'
    },
    roadPath2: {
        position: { x: -28, y: 10, z: -40 },
        title: 'Road Path',
        panoramaImage: '/assets/panoramas/roadPath2.jpg',
        nextHotspot: 'roadPath3'
    },
    roadPath3: {
        position: { x: -65, y: 10, z: -32 },
        title: 'Road Path',
        panoramaImage: '/assets/panoramas/roadPath3.jpg',
        nextHotspot: 'roadPath4',
        previousHotspot: 'roadpath2'
    },
    roadPath4: {
        position: { x: -101, y: 10, z: -44 },
        title: 'Road Path',
        panoramaImage: '/assets/panoramas/roadPath4.jpg',
        previousHotspot: 'roadpath3'
    },
    japaneseGarden: {
        position: { x: -40, y: 10, z: -47 },
        title: 'Japanese Garden',
        panoramaImage: '/assets/panoramas/japaneseGarden.jpg'
    },
    libraryFront: {
        position: { x: -76, y: 10, z: -38 },
        title: 'Library Front',
        panoramaImage: '/assets/panoramas/libraryFront.jpg'
    },
    europeanGarden: {
        position: { x: -55, y: 10, z: -17 },
        title: 'European Garden',
        panoramaImage: '/assets/panoramas/europeanGarden.jpg'
    }
};

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//-- Hotspots with Panorama Viewer --\\
const hotspotPool = {
    geometry: null,
    material: null,
    iconGeometry: null,
    iconMaterials: {}
};

function createHotspot(hotspotData, hotspotId) {
    // Reuse geometry if available, otherwise create new one
    if (!hotspotPool.geometry) {
        hotspotPool.geometry = new THREE.SphereGeometry(2, 16, 16); // Reduced segment count
    }
    
    // Reuse material if available, otherwise create new one
    if (!hotspotPool.material) {
        hotspotPool.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    }
    
    const marker = new THREE.Mesh(hotspotPool.geometry, hotspotPool.material);
    marker.position.set(hotspotData.position.x, hotspotData.position.y, hotspotData.position.z);
    marker.userData = { 
        hotspotId,
        pulseScale: { value: 1, direction: 1 },
        lastPulseUpdate: 0 // For throttling updates
    };
    scene.add(marker);

    return marker;
}

Object.entries(hotspots).forEach(([id, data]) => {
    createHotspot(data, id);
});

window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    event.preventDefault();

    if (isNavigating) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.userData.hotspotId) {
            showHotspotPopup(object.userData.hotspotId);
            break;
        }
    }
}


function showHotspotPopup(hotspotId) {
    const hotspot = hotspots[hotspotId];
    window.closeHotspotPopup();
    window.closePopup();

    const popupDiv = document.createElement('div');
    popupDiv.className = 'hotspot-popup-3d';
    popupDiv.innerHTML = `
        <button class="popup-close-btn">x</button>
        <h3>${hotspot.title}</h3>
        <button class="view-btn" onclick="window.loadPanorama('${hotspotId}')">View</button>
    `;

    const popupLabel = new CSS2DObject(popupDiv);
    
    popupLabel.position.set(
        hotspot.position.x, 
        hotspot.position.y + 10,
        hotspot.position.z
    );

    scene.add(popupLabel);

    popupDiv.querySelector('.popup-close-btn').addEventListener('click', window.closeHotspotPopup);

    currentPopup = popupLabel;
}


window.closeHotspotPopup = function() {
    if (currentPopup) {
        scene.remove(currentPopup);
        currentPopup = null;
    }
    
    const existingPopup = document.querySelector('.hotspot-popup-3d');
    if (existingPopup) {
        existingPopup.remove();
    }
};

window.loadPanorama = function(hotspotId) { 
    window.closePanorama();
    window.closeHotspotPopup(); 

    const hotspot = hotspots[hotspotId]; 
    if (!hotspot) return;

    const panoramaTexture = new THREE.TextureLoader().load(hotspot.panoramaImage);
    panoramaTexture.minFilter = THREE.LinearFilter;
    panoramaTexture.magFilter = THREE.LinearFilter;
    
    const geometry = new THREE.SphereGeometry(500, 80, 50); // Increased segments for smoother sphere
    geometry.scale(-1, 1, 1); 
    const material = new THREE.MeshBasicMaterial({ 
        map: panoramaTexture,
        side: THREE.DoubleSide
    }); 
    const panorama = new THREE.Mesh(geometry, material); 

    const fullscreenOverlay = document.createElement('div'); 
    fullscreenOverlay.className = 'fullscreen-panorama-overlay'; 
    document.body.appendChild(fullscreenOverlay); 

    const panoramaScene = new THREE.Scene(); 
    panoramaScene.add(panorama); 

    // Adjust FOV based on device width
    const fov = window.innerWidth <= 768 ? 90 : 110;
    const panoramaCamera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000); 
    panoramaCamera.position.set(0, 0, 0.1); 

    const panoramaRenderer = new THREE.WebGLRenderer({ antialias: true }); 
    panoramaRenderer.setPixelRatio(window.devicePixelRatio);
    panoramaRenderer.setSize(window.innerWidth, window.innerHeight); 
    fullscreenOverlay.appendChild(panoramaRenderer.domElement); 

    const panoramaLabelRenderer = new CSS2DRenderer(); 
    panoramaLabelRenderer.setSize(window.innerWidth, window.innerHeight); 
    panoramaLabelRenderer.domElement.style.position = 'absolute'; 
    panoramaLabelRenderer.domElement.style.top = '0px'; 
    panoramaLabelRenderer.domElement.style.pointerEvents = 'none'; 
    fullscreenOverlay.appendChild(panoramaLabelRenderer.domElement);

    const panoramaControls = new OrbitControls(panoramaCamera, panoramaRenderer.domElement); 
    panoramaControls.enableDamping = true; 
    panoramaControls.dampingFactor = window.innerWidth <= 768 ? 0.15 : 0.25; // Adjusted for mobile
    panoramaControls.screenSpacePanning = false; 
    panoramaControls.minDistance = 0.1; 
    panoramaControls.maxDistance = 500; 
    panoramaControls.maxPolarAngle = Math.PI; 
    panoramaControls.minPolarAngle = 0; 
    panoramaControls.enableZoom = false; 
    panoramaControls.enablePan = false; 
    panoramaControls.rotateSpeed = window.innerWidth <= 768 ? 0.35 : 0.5; // Adjusted for mobile

    const panoramaHotspots = { 
        pathway4: { 
            position: { x: 3, y: 0, z: 0 }, 
            title: 'Track and Field', 
            description: '', 
            nextPanorama: 'trackAndField', 
            availableIn: ['pathway4']
        },
        pathway5: { 
            position: { x: 1, y: 0, z: -1 }, 
            title: 'Track and Field', 
            description: '', 
            nextPanorama: 'trackAndField', 
            availableIn: ['pathway5']
        },
        trackAndField: { 
            position: { x: -2, y: 0, z: 2 }, 
            title: 'Ulane Path', 
            description: '', 
            nextPanorama: 'pathway4', 
            availableIn: ['trackAndField']
        },
        trackAndField2: { 
            position: { x: -2, y: 0, z: -0.5 }, 
            title: 'Ulane Path', 
            description: '', 
            nextPanorama: 'pathway5', 
            availableIn: ['trackAndField']
        }
    }; 

    function createPanoramaHotspot(hotspotData, hotspotId, currentPanoramaId) {
        if (hotspotData.availableIn && !hotspotData.availableIn.includes(currentPanoramaId)) {
            return null;
        }
    
        const hotspotGeometry = new THREE.SphereGeometry(0.05, 32, 32);
        const hotspotMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial);
    
        hotspotMesh.position.copy(hotspotData.position);
    
        hotspotMesh.userData = {
            type: 'panoramaHotspot',
            id: hotspotId,
            title: hotspotData.title,
            description: hotspotData.description,
            nextPanorama: hotspotData.nextPanorama
        };
    
        panoramaScene.add(hotspotMesh);
    
        return hotspotMesh;
    }

    const panoramaHotspotMarkers = {}; 
    Object.entries(panoramaHotspots).forEach(([id, data]) => { 
        const marker = createPanoramaHotspot(data, id, hotspotId);
        if (marker) {
            panoramaHotspotMarkers[id] = marker;
        }
    }); 

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onPanoramaHotspotClick(event) {
        event.preventDefault();
    
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        raycaster.setFromCamera(mouse, panoramaCamera);
        const intersects = raycaster.intersectObjects(panoramaScene.children);
    
        for (let intersect of intersects) {
            if (intersect.object.userData && intersect.object.userData.type === 'panoramaHotspot') {
                const existingPopup = document.querySelector('.panorama-hotspot-popup');
                if (existingPopup) {
                    existingPopup.remove();
                }
    
                const popupDiv = document.createElement('div');
                popupDiv.className = 'panorama-hotspot-popup';
                popupDiv.innerHTML = `
                    <h3>${intersect.object.userData.title}</h3>
                    ${intersect.object.userData.nextPanorama ? 
                        `<button onclick="window.loadPanorama('${intersect.object.userData.nextPanorama}')">Explore</button>` : 
                        ''
                    }
                    <button class="popup-close-btn">Close</button>
                `;
    
                const rect = panoramaRenderer.domElement.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                popupDiv.style.position = 'absolute';
                popupDiv.style.left = `${x}px`;
                popupDiv.style.top = `${y}px`;

                panoramaControls.enabled = false;
    
                const closeBtn = popupDiv.querySelector('.popup-close-btn');
                closeBtn.addEventListener('click', () => {
                    popupDiv.remove();
                    panoramaControls.enabled = true;
                });
    
                const fullscreenOverlay = document.querySelector('.fullscreen-panorama-overlay');
                if (fullscreenOverlay) {
                    fullscreenOverlay.appendChild(popupDiv);
                }
    
                break;
            }
        }
    }
    
    fullscreenOverlay.addEventListener('click', onPanoramaHotspotClick);

    function animatePanorama() { 
        requestAnimationFrame(animatePanorama); 
        panoramaControls.update(); 
        
        Object.values(panoramaHotspotMarkers).forEach(marker => {
            marker.scale.set(
                1 + 0.1 * Math.sin(Date.now() * 0.002),
                1 + 0.1 * Math.sin(Date.now() * 0.002),
                1 + 0.1 * Math.sin(Date.now() * 0.002)
            );
        });
        
        panoramaRenderer.render(panoramaScene, panoramaCamera);
        panoramaLabelRenderer.render(panoramaScene, panoramaCamera);
    } 
    animatePanorama(); 

    const closeButton = document.createElement('button');
    closeButton.className = 'close-fullscreen-btn';
    closeButton.innerText = '×';
    closeButton.addEventListener('click', window.closePanorama);
    fullscreenOverlay.appendChild(closeButton);

    const navigationContainer = document.createElement('div');
    navigationContainer.className = 'panorama-navigation-container';
    fullscreenOverlay.appendChild(navigationContainer);

    const prevButton = document.createElement('button');
    prevButton.className = 'panorama-nav-btn prev-btn';
    prevButton.innerHTML = '&#10094;';
    navigationContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.className = 'panorama-nav-btn next-btn';
    nextButton.innerHTML = '&#10095;'; 
    navigationContainer.appendChild(nextButton);

    function handleNavigation(direction) {
        let nextHotspotId = null;
        
        if (direction === 'next' && hotspot.nextHotspot) {
            nextHotspotId = hotspot.nextHotspot;
        } else if (direction === 'prev' && hotspot.previousHotspot) {
            nextHotspotId = hotspot.previousHotspot;
        }

        if (nextHotspotId) {
            cleanupPanorama();
            window.loadPanorama(nextHotspotId);
        }
    }

    prevButton.addEventListener('click', () => handleNavigation('prev'));
    nextButton.addEventListener('click', () => handleNavigation('next'));

    prevButton.style.display = hotspot.previousHotspot ? 'block' : 'none';
    nextButton.style.display = hotspot.nextHotspot ? 'block' : 'none';

    function cleanupPanorama() {
        panoramaControls.dispose(); 
        panoramaRenderer.dispose(); 
        panoramaTexture.dispose(); 
        geometry.dispose(); 
        material.dispose(); 
        document.body.removeChild(fullscreenOverlay); 
        window.removeEventListener('resize', onPanoramaResize);
    }

    function onPanoramaResize() { 
        panoramaCamera.aspect = window.innerWidth / window.innerHeight; 
        panoramaCamera.updateProjectionMatrix(); 
        panoramaRenderer.setSize(window.innerWidth, window.innerHeight);
        panoramaLabelRenderer.setSize(window.innerWidth, window.innerHeight);
        
        // Update controls and FOV based on device
        panoramaControls.dampingFactor = window.innerWidth <= 768 ? 0.15 : 0.25;
        panoramaControls.rotateSpeed = window.innerWidth <= 768 ? 0.35 : 0.5;
        panoramaCamera.fov = window.innerWidth <= 768 ? 90 : 110;
        panoramaCamera.updateProjectionMatrix();
    } 
    window.addEventListener('resize', onPanoramaResize); 

    fullscreenOverlay.addEventListener('contextmenu', (e) => e.preventDefault()); 
};

window.closePanorama = function() {
    const fullscreenOverlay = document.querySelector('.fullscreen-panorama-overlay');

    if (fullscreenOverlay) {
        while (fullscreenOverlay.firstChild) {
            fullscreenOverlay.firstChild.remove();
        }
        fullscreenOverlay.remove();
    }

    if (window.currentPanorama) {
        window.currentPanorama.geometry.dispose();
        window.currentPanorama.material.dispose();
        window.currentPanorama.dispose();
        window.currentPanorama = null;
    }

    if (window.panoramaControls) {
        window.panoramaControls.dispose();
        window.panoramaControls = null;
    }

    // Debugging to verify panorama closure
    console.log("Panorama closed.");

    const defaultPosition = { x: 0, y: 250, z: 10 };
    const defaultRotation = { x: 0, y: 0, z: 0 };

    new TWEEN.Tween(camera.position)
        .to(defaultPosition, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

    new TWEEN.Tween(camera.rotation)
        .to(defaultRotation, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

    const defaultFov = 50;
    new TWEEN.Tween({ fov: camera.fov })
        .to({ fov: defaultFov }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(obj => {
            camera.fov = obj.fov;
            camera.updateProjectionMatrix();
        })
        .start();

    document.getElementById('panorama-viewer').style.display = 'none';
    document.getElementById('panorama-navigation-container').innerHTML = '';

    const event = new Event("panoramaClose");
    window.dispatchEvent(event);
};


// Point to Point
const paths = {
    // [Start - Main Entrance]
    mainEntrance: {
        name: "Main Entrance",
        paths: {
            toAdminBuilding: {
                name: "Administration Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/adminBuilding.jpg'
                            },
                            admissionOffice: {
                                name: "Admission Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-16, 13, -24),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/admissionOffice.jpg'
                            },
                            registrar: {
                                name: "Registrar",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/registrar.jpg'
                            },
                            cashier: {
                                name: "Cashier",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-17.8, 13, -24),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cashier.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            room201: {
                                name: "CCS Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-17.8, 13, -24),
                                    new THREE.Vector3(-22, 13, -24),
                                    new THREE.Vector3(-22, 14, -24),
                                    new THREE.Vector3(-20, 14, -24),
                                    new THREE.Vector3(-19.5, 14, -20),
                                ],
                                duration: 1500,
                                panoramaImage: '/assets/panoramas/ccsBuilding3.jpg'
                            }
                        }
                    }
                }
            },
            toLibrary: {
                name: "Library And Auditorium",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Library",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 13, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/library.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Auditorium",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 14, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/auditorium.jpg'
                            }
                        }
                    }
                }
            },
            toOldGradeSchoolBuilding: {
                name: "Old Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            schoolDirectorOffice: {
                                name: "School Director Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/schoolDirectorOffice.jpg'
                            },
                            graduateSchoolProgramChairpersonOffice: {
                                name: "Graduate School Program Chairperson Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-84, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/gspcOffice.jpg'
                            }
                        },
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            cbaa: {
                                name: "College of Business Administration Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-75, 13, -1),
                                    new THREE.Vector3(-85, 13, -5),
                                    new THREE.Vector3(-85, 14, -10),
                                    new THREE.Vector3(-88, 14, -10),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cbaamedDeanOffice.jpg'
                            },
                            medtech: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cbaamedDeanOffice.jpg'
                            },
                            DeansMEDTECH: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cbaamedDeanOffice.jpg'
                            },
                            DeansNURSING: {
                                name: "College of Nursing Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-83, 14, 3),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/nursingDeanOffice.jpg'
                            },
                            DeansPTOTRT: {
                                name: "College of PT/ OT/ RT Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/PTOTRTDeanOffice.jpg'
                            },
                            DeansCAS: {
                                name: "College of Arts and Science Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CASDeanOffice.jpg'
                            },
                            DeansPharma: {
                                name: "College of Pharmacy Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/collegeOfPharmacy.jpg'
                            },
                            DeansRESEARCH: {
                                name: "Research and Development Center ",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-75, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/researchAndDevelopmentCenter.jpg'
                            },
                            DeansEDUC: {
                                name: "College of Education Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/EDUCOffice.jpg'
                            },
                            DeansVP: {
                                name: "Office of Executive Vice President",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/VPOffice.jpg'
                            },
                            DeansSHS: {
                                name: "SHS Principal Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, -1),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/SHSOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCITHM: {
                name: "College of Tourism and Hospitality Management",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Lobby",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-103, 13, -54),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/hospitalityManagement.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-100, 13, -54),
                                    new THREE.Vector3(-100, 14, -54),
                                    new THREE.Vector3(-100, 14, -58),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cithmDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCEAT: {
                name: "College of Engineering, Architecture and Technologies",
                floors: {
                    first: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 14, -31),
                                    new THREE.Vector3(-98, 14, -32)
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/engineeringDeanOffice.jpg'
                            }
                        }
                    },
                    
                }
            },
            toCRIM: {
                name: "College of Criminology Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Criminology Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24),
                                    new THREE.Vector3(-35, 13, -20),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/criminologyDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewCollegeBuilding: {
                name: "New College Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24),
                                    new THREE.Vector3(-30, 13, -21)
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/europeanGarden1.jpg'
                            },
                            accounting: {
                                name: "Accounting",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-26, 13, -8)
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/accounting.jpg'
                            }
                        }
                    },
                    third: {
                        name: "Third Floor",
                        rooms: {
                            martimeDeanOffice: {
                                name: "College of Maritime Dean's Office",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24),
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-38, 13, -6),
                                    new THREE.Vector3(-38, 14, -6),
                                    new THREE.Vector3(-38, 18, -6),
                                    new THREE.Vector3(-30, 18, -7),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/maritimeDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewGradeSchoolBuilding: {
                name: "New Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(68, 13, 75),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(-10, 13, -33),
                                    new THREE.Vector3(-8, 13, -19),
                                    new THREE.Vector3(-4, 13, -19),
                                ],
                                duration: 20000,
                            }
                        }
                    }
                }
            },
        }
    // [Start - Admin]
    },
    adminBuilding: {
        name: "Administration Building",
        paths: {
            toLibrary: {
                name: "Library And Auditorium",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Library",
                                points: [
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 13, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/library.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Auditorium",
                                points: [
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 14, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/auditorium.jpg'
                            }
                        }
                    }
                }
            },
            toMainEntrance: {
                name: "Main Entrance",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Entrance",
                                points: [
                                    new THREE.Vector3(-18, 13, -24),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-15, 13, -35),
                                    new THREE.Vector3(-8, 13, -34),
                                    new THREE.Vector3(1, 13, -33),
                                    new THREE.Vector3(23, 13, -36),
                                    new THREE.Vector3(29, 13, -32),
                                    new THREE.Vector3(54, 13, -35),
                                    new THREE.Vector3(68, 13, 75)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/pathway_ulane1.jpg'
                            }
                        }
                    }
                }
            },
            toOldGradeSchoolBuilding: {
                name: "Old Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            schoolDirectorOffice: {
                                name: "School Director Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/schoolDirectorOffice.jpg'
                            },
                            graduateSchoolProgramChairpersonOffice: {
                                name: "Graduate School Program Chairperson Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-84, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/gspcOffice.jpg'
                            },
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "College of Business Administration Dean's Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansMEDTECH: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansNURSING: {
                                name: "College of Nursing Dean's Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-83, 14, 3),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/nursingDeanOffice.jpg'
                            },
                            DeansPTOTRT: {
                                name: "College of PT/ OT/ RT Dean's Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/PTOTRTDeanOffice.jpg'
                            },
                            DeansCAS: {
                                name: "College of Arts and Science Dean's Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/CASDeanOffice.jpg'
                            },
                            DeansPharma: {
                                name: "College of Pharmacy Dean's Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/CPDeanOffice.jpg'
                            },
                            DeansRESEARCH: {
                                name: "Research and Development Center ",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-75, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/researchAndDevelopmentCenter.jpg'
                            },
                            DeansEDUC: {
                                name: "College of Education Dean's Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/EDUCOffice.jpg'
                            },
                            DeansVP: {
                                name: "Office of Executive Vice President",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/VPOffice.jpg'
                            },
                            DeansSHS: {
                                name: "SHS Principal Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/SHSOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCITHM: {
                name: "College of Tourism and Hospitality Management",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Lobby",
                                points: [
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-103, 13, -54),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/hospitalityManagement.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-100, 13, -54),
                                    new THREE.Vector3(-100, 14, -54),
                                    new THREE.Vector3(-100, 14, -58),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cithmDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCEAT: {
                name: "College of Engineering, Architecture and Technologies",
                floors: {
                    first: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 14, -31),
                                    new THREE.Vector3(-98, 14, -32)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/engineeringDeanOffice.jpg'
                            }
                        }
                    },
                    
                }
            },
            toCRIM: {
                name: "College of Criminology Building",
                floors: {
                    first: {
                        name: "Gound Floor",
                        rooms: {
                            main: {
                                name: "Criminology Dean's Office",
                                points: [
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-35, 13, -20),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/criminologyDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewCollegeBuilding: {
                name: "New College Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-30, 13, -22)
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/europeanGarden1.jpg'
                            }
                        }
                    },
                    third: {
                        name: "Third Floor",
                        rooms: {
                            main: {
                                name: "College of Maritime Dean's  Office",
                                points: [
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-22, 13, -30),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-38, 13, -6),
                                    new THREE.Vector3(-38, 14, -6),
                                    new THREE.Vector3(-38, 18, -6),
                                    new THREE.Vector3(-30, 18, -7),
                                ],
                                duration: 25000,
                            }
                        }
                    }
                }
            },
            toNewHighSchoolBuilding: {
                name: "New High School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-21, 13, -30),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-54, 13, -39),
                                    new THREE.Vector3(-59, 13, -65),
                                    new THREE.Vector3(-62, 13, -65)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/newHighSchoolBuilding.jpg'
                            }
                        }
                    }
                }
            },
            toNewGradeSchoolBuilding: {
                name: "New Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-18, 13, -24),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-5, 13, -21)
                                ],
                                duration: 20000,
                            }
                        }
                    }
                }
            }
        }
    // [Start - New Grade School]
    },
    newGradeSchoolBuilding: {
        name: "New Gradeschool Building",
        paths: {
            toLibrary: {
                name: "Library And Auditorium",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Library",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 13, -53)
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/library.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Auditorium",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 14, -45)
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/auditorium.jpg'
                            }
                        }
                    }
                }
            },
            toAdminBuilding: {
                name: "Administration Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/adminBuilding.jpg'
                            },
                            registrar: {
                                name: "Registrar",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/registrar.jpg'
                            },
                            cashier: {
                                name: "Cashier",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-18, 13, -24)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cashier.jpg'
                            },
                            admissionOffice: {
                                name: "Admission Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-16, 13, -23),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/admissionOffice.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            ccsDeanOffice: {
                                name: "College of Computer Studies Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-20, 13, -24),
                                    new THREE.Vector3(-20, 13, -26),
                                    new THREE.Vector3(-20, 14, -26),
                                    new THREE.Vector3(-18, 14, -26),
                                    new THREE.Vector3(-17, 14, -23),
                                ],
                                duration: 20000
                            },
                        }
                    }
                }
            },
            toOldGradeSchoolBuilding: {
                name: "Old Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            schoolDirectorOffice: {
                                name: "School Director Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/library.jpg'
                            },
                            graduateSchoolProgramChairpersonOffice: {
                                name: "Graduate School Program Chairperson Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/schoolDirectorOffice.jpg'
                            },
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "College of Business Administration Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansNURSING: {
                                name: "College of Nursing Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-83, 14, 3),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/nursingDeanOffice.jpg'
                            },
                            DeansMEDTECH: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansPTOTRT: {
                                name: "College of PT/ OT/ RT Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/PTOTRTDeanOffice.jpg'
                            },
                            DeansCAS: {
                                name: "College of Arts and Science Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/CASDeanOffice.jpg'
                            },
                            DeansPharma: {
                                name: "College of Pharmacy Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/CPDeanOffice.jpg'
                            },
                            DeansRESEARCH: {
                                name: "Research and Development Center ",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-75, 14, 2),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/researchAndDevelopmentCenter.jpg'
                            },
                            DeansEDUC: {
                                name: "College of Education Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/EDUCOffice.jpg'
                            },
                            DeansVP: {
                                name: "Office of Executive Vice President",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/VPOffice.jpg'
                            },
                            DeansSHS: {
                                name: "SHS Principal Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-13, 13, -25),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/SHSOffice.jpg'
                            }
                        }
                    },
                }
            },
            toCITHM: {
                name: "College of Tourism and Hospitality Management",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Lobby",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-103, 13, -54),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/hospitalityManagement.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-100, 13, -54),
                                    new THREE.Vector3(-100, 14, -54),
                                    new THREE.Vector3(-100, 14, -58),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/cithmDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCEAT: {
                name: "College of Engineering, Architecture and Technologies",
                floors: {
                    first: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 14, -31),
                                    new THREE.Vector3(-98, 14, -32)
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/engineeringDeanOffice.jpg'
                            }
                        }
                    },
                }
            },
            toCRIM: {
                name: "College of Criminology Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Criminology Dean's Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-14, 13, -23),
                                    new THREE.Vector3(-35, 13, -20),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/criminologyDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewCollegeBuilding: {
                name: "New College Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-14, 13, -23),
                                    new THREE.Vector3(-30, 13, -21)
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/europeanGarden1.jpg'
                            }
                        }
                    },
                    third: {
                        name: "Third Floor",
                        rooms: {
                            main: {
                                name: "College of Maritime Dean's  Office",
                                points: [
                                    new THREE.Vector3(-5, 13, -21),
                                    new THREE.Vector3(-14, 13, -23),
                                    new THREE.Vector3(-23, 13, -24),
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-38, 13, -6),
                                    new THREE.Vector3(-38, 14, -6),
                                    new THREE.Vector3(-38, 18, -6),
                                    new THREE.Vector3(-30, 18, -7),
                                ],
                                duration: 25000,
                            }
                        }
                    }
                }
            }
        }
    },
    // [Start - Library]
    library: {
        name: "Library and Auditorium",
        paths: {
            toAdminBuilding: {
                name: "Administration Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-23, 13, -30),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/adminBuilding.jpg'
                            },
                            registrar: {
                                name: "Registrar",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-23, 13, -30),
                                    new THREE.Vector3(-22, 13, -27),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/registrar.jpg'
                            },
                            cashier: {
                                name: "Cashier",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-23, 13, -30),
                                    new THREE.Vector3(-22, 13, -27),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cashier.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            room201: {
                                name: "College of Computer Studies Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-26, 13, -28),
                                    new THREE.Vector3(-23, 13, -28),
                                    new THREE.Vector3(-23, 14, -28),
                                    new THREE.Vector3(-19, 14, -29),
                                    new THREE.Vector3(-18, 14, -24),
                                ],
                                duration: 4000,
                                panoramaImage: '/assets/panoramas/ccsBuilding3.jpg'
                            },
                        }
                    }
                }
            },
            toOldGradeSchoolBuilding: {
                name: "Old Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            schoolDirectorOffice: {
                                name: "School Director Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                    
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/schoolDirectorOffice.jpg'
                            },
                            graduateSchoolProgramChairpersonOffice: {
                                name: "Graduate School Program Chairperson Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-84, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/gspcOffice.jpg'
                            },
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "College of Business Administration Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansMEDTECH: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansNURSING: {
                                name: "College of Nursing Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-83, 14, 3),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/nursingDeanOffice.jpg'
                            },
                            DeansPTOTRT: {
                                name: "College of PT/ OT/ RT Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/PTOTRTDeanOffice.jpg'
                            },
                            DeansCAS: {
                                name: "College of Arts and Science Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CASDeanOffice.jpg'
                            },
                            DeansPharma: {
                                name: "College of Pharmacy Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CPDeanOffice.jpg'
                            },
                            DeansRESEARCH: {
                                name: "Research and Development Center ",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/researchAndDevelopmentCenter.jpg'
                            },
                            DeansEDUC: {
                                name: "College of Education Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/EDUCOffice.jpg'
                            },
                            DeansVP: {
                                name: "Office of Executive Vice President",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/VPOffice.jpg'
                            },
                            DeansSHS: {
                                name: "SHS Principal Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-75, 13, -35),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/SHSOffice.jpg'
                            }
                            
                        }
                    }
                }
            },
            toCITHM: {
                name: "College of Tourism and Hospitality Management",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Lobby",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-103, 13, -54),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/hospitalityManagement.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-100, 13, -54),
                                    new THREE.Vector3(-100, 14, -54),
                                    new THREE.Vector3(-100, 14, -58),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/cithmDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewGradeSchoolBuilding: {
                name: "New Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-5, 13, -21)
                                ],
                                duration: 20000,
                            }
                        }
                    }
                }
            },
            toCEAT: {
                name: "College of Engineering, Architecture and Technologies",
                floors: {
                    first: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 14, -31),
                                    new THREE.Vector3(-98, 14, -32)
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/engineeringDeanOffice.jpg'
                            }
                        }
                    },
                    
                }
            },
            toCRIM: {
                name: "College of Criminology Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Criminology Dean's Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-25, 13, -22),
                                    new THREE.Vector3(-35, 13, -20),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/criminologyDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewCollegeBuilding: {
                name: "New College Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-57, 13, -39),
                                    new THREE.Vector3(-54, 13, -26),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/europeanGarden1.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Third Floor",
                        rooms: {
                            martimeDeanOffice: {
                                name: "College of Maritime Dean's  Office",
                                points: [
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-70, 13, -53),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-57, 13, -39),
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-56, 13, -26),
                                    new THREE.Vector3(-56, 14, -26),
                                    new THREE.Vector3(-56, 18, -26),
                                    new THREE.Vector3(-30, 18, -30),
                                    new THREE.Vector3(-28, 18, -8),
                                    new THREE.Vector3(-35, 18, -7),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/maritimeDeanOffice.jpg'
                            }
                        }
                    }
                }
            }
        }
    // [Start - CEAT]
    },
    CEAT: {
        name: "College of Engineering, Architecture and Technologies",
        paths: {
            toAdminBuilding: {
                name: "Administration Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-26, 13, -25),
                                    new THREE.Vector3(-20, 13, -25)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/adminBuilding.jpg'
                            },
                            registrar: {
                                name: "Registrar",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-26, 13, -25),
                                    new THREE.Vector3(-20, 13, -25),
                                    new THREE.Vector3(-20, 13, -21),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/registrar.jpg'
                            },
                            cashier: {
                                name: "Cashier",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-26, 13, -25),
                                    new THREE.Vector3(-20, 13, -25),
                                    new THREE.Vector3(-20, 13, -21),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cashier.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            room201: {
                                name: "College of Computer Studies Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-26, 13, -25),
                                    new THREE.Vector3(-23, 13, -25),
                                    new THREE.Vector3(-23, 13, -28),
                                    new THREE.Vector3(-23, 14, -28),
                                    new THREE.Vector3(-19, 14, -29),
                                    new THREE.Vector3(-18, 14, -24),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/ccsBuilding3.jpg'
                            }
                        }
                    }
                }
            },
            toNewGradeSchoolBuilding: {
                name: "New Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-5, 13, -21)
                                ],
                                duration: 12000,
                            }
                        }
                    }
                }
            },
            toLibrary: {
                name: "Library And Auditorium",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Library",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 13, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/library.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Auditorium",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-84, 13, -33),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 14, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/auditorium.jpg'
                            }
                        }
                    }
                }
            },
            toOldGradeSchoolBuilding: {
                name: "Old Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "School Director Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/schoolDirectorOffice.jpg'
                            },
                            graduateSchoolProgramChairpersonOffice: {
                                name: "Graduate School Program Chairperson Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-84, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/gspcOffice.jpg'
                            },
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "College of Business Administration Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansMEDTECH: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansNURSING: {
                                name: "College of Nursing Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-83, 14, 3),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/nursingDeanOffice.jpg'
                            },
                            DeansPTOTRT: {
                                name: "College of PT/ OT/ RT Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/PTOTRTDeanOffice.jpg'
                            },
                            DeansCAS: {
                                name: "College of Arts and Science Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CASDeanOffice.jpg'
                            },
                            DeansPharma: {
                                name: "College of Pharmacy Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CPDeanOffice.jpg'
                            },
                            DeansRESEARCH: {
                                name: "Research and Development Center ",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/researchAndDevelopmentCenter.jpg'
                            },
                            DeansEDUC: {
                                name: "College of Education Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/EDUCOffice.jpg'
                            },
                            DeansVP: {
                                name: "Office of Executive Vice President",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/VPOffice.jpg'
                            },
                            DeansSHS: {
                                name: "SHS Principal Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/SHSOffice.jpg'
                            }
                        }
                    },
                }
            },
            toCITHM: {
                name: "College of Tourism and Hospitality Management",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Lobby",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-103, 13, -54),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/hospitalityManagement.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-100, 13, -54),
                                    new THREE.Vector3(-100, 14, -54),
                                    new THREE.Vector3(-100, 14, -58),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cithmDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCRIM: {
                name: "College of Criminology Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Criminology Dean's Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -27),
                                    new THREE.Vector3(-54, 13, -32),
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-30, 13, -30),
                                    new THREE.Vector3(-28, 13, -22),
                                    new THREE.Vector3(-35, 13, -20),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/criminologyDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewCollegeBuilding: {
                name: "New College Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -27),
                                    new THREE.Vector3(-54, 13, -32),
                                    new THREE.Vector3(-54, 13, -26),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/europeanGarden1.jpg'
                            }
                        }
                    },
                    third: {
                        name: "Third Floor",
                        rooms: {
                            martimeDeanOffice: {
                                name: "College of Maritime Dean's  Office",
                                points: [
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -27),
                                    new THREE.Vector3(-54, 13, -32),
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-56, 13, -26),
                                    new THREE.Vector3(-56, 14, -26),
                                    new THREE.Vector3(-56, 18, -26),
                                    new THREE.Vector3(-30, 18, -30),
                                    new THREE.Vector3(-28, 18, -8),
                                    new THREE.Vector3(-35, 18, -7),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/maritimeDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
        }
    },
    // [Start - Criminology]
    criminologyBuilding: {
        name: "College of Criminology Building",
        paths: {
            toAdminBuilding: {
                name: "Administration Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-21, 13, -30),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/adminBuilding.jpg'
                            },
                            registrar: {
                                name: "Registrar",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-21, 13, -20),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/registrar.jpg'
                            },
                            cashier: {
                                name: "Cashier",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-21, 13, -20),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/cashier.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            room201: {
                                name: "College of Computer Studies Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-23, 13, -23),
                                    new THREE.Vector3(-23, 13, -25),
                                    new THREE.Vector3(-23, 13, -28),
                                    new THREE.Vector3(-23, 14, -28),
                                    new THREE.Vector3(-19, 14, -29),
                                    new THREE.Vector3(-18, 14, -24),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/ccsBuilding3.jpg'
                            },
                        }
                    }
                }
            },
            toNewGradeSchoolBuilding: {
                name: "New Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-21, 13, -20),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-5, 13, -21)
                                ],
                                duration: 13000,
                            }
                        }
                    }
                }
            },
            toLibrary: {
                name: "Library And Auditorium",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Library",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-30, 13, -30),
                                    new THREE.Vector3(-53, 13, -28),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 13, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/library.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Auditorium",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-30, 13, -30),
                                    new THREE.Vector3(-53, 13, -28),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 14, -53)
                                ],
                                duration: 20000,
                            }
                        }
                    }
                }
            },
            toOldGradeSchoolBuilding: {
                name: "Old Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            schoolDirectorOffice: {
                                name: "School Director Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/schoolDirectorOffice.jpg'
                            },
                            graduateSchoolProgramChairpersonOffice: {
                                name: "Graduate School Program Chairperson Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-84, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/gspcOffice.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "College of Business Administration Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansMEDTECH: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansNURSING: {
                                name: "College of Nursing Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-83, 14, 3),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/nursingDeanOffice.jpg'
                            },
                            DeansPTOTRT: {
                                name: "College of PT/ OT/ RT Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/PTOTRTDeanOffice.jpg'
                            },
                            DeansCAS: {
                                name: "College of Arts and Science Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/CASDeanOffice.jpg'
                            },
                            DeansPharma: {
                                name: "College of Pharmacy Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/CPDeanOffice.jpg'
                            },
                            DeansRESEARCH: {
                                name: "Research and Development Center ",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-75, 14, 2),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/researchAndDevelopmentCenter.jpg'
                            },
                            DeansEDUC: {
                                name: "College of Education Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/EDUCOffice.jpg'
                            },
                            DeansVP: {
                                name: "Office of Executive Vice President",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/VPOffice.jpg'
                            },
                            DeansSHS: {
                                name: "SHS Principal Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-29, 13, -21),
                                    new THREE.Vector3(-25, 13, -7),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/SHSOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCEAT: {
                name: "College of Engineering, Architecture and Technologies",
                floors: {
                    first: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-28, 13, -22),
                                    new THREE.Vector3(-30, 13, -30),
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-54, 13, -32),
                                    new THREE.Vector3(-80, 13, -27),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 14, -31),
                                    new THREE.Vector3(-98, 14, -32)
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/engineeringDeanOffice.jpg'
                            }
                        }
                    },
                }
            },
            toCITHM: {
                name: "College of Tourism and Hospitality Management",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Lobby",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-30, 13, -30),
                                    new THREE.Vector3(-53, 13, -28),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-103, 13, -54),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/hospitalityManagement.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-30, 13, -30),
                                    new THREE.Vector3(-53, 13, -28),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-100, 13, -54),
                                    new THREE.Vector3(-100, 14, -54),
                                    new THREE.Vector3(-100, 14, -58),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/cithmDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewCollegeBuilding: {
                name: "New College Building",
                floors: {
                    third: {
                        name: "Third Floor",
                        rooms: {
                            martimeDeanOffice: {
                                name: "College of Maritime Dean's  Office",
                                points: [
                                    new THREE.Vector3(-35, 13, -20),
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-38, 13, -6),
                                    new THREE.Vector3(-38, 14, -6),
                                    new THREE.Vector3(-38, 18, -6),
                                    new THREE.Vector3(-30, 18, -7),
                                ],
                                duration: 12000,
                            }
                        }
                    }
                }
            }
        }
    },
    // [Start - CITHM]
    CITHM: {
        name: "College of Internation Tourism and Hospitality Management",
        paths: {
            toAdminBuilding: {
                name: "Administration Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-21, 13, -30),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/adminBuilding.jpg'
                            },
                            registrar: {
                                name: "Registrar",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-21, 13, -20),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/registrar.jpg'
                            },
                            cashier: {
                                name: "Cashier",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-27, 13, -30),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-21, 13, -20),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/cashier.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            room201: {
                                name: "College of Computer Studies Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-29, 13, -44),
                                    new THREE.Vector3(-26, 13, -28),
                                    new THREE.Vector3(-23, 13, -28),
                                    new THREE.Vector3(-23, 14, -28),
                                    new THREE.Vector3(-19, 14, -29),
                                    new THREE.Vector3(-18, 14, -24),
                                ],
                                duration: 12000
                            },
                        }
                    }
                }
            },
            toNewGradeSchoolBuilding: {
                name: "New Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-28, 13, -44),
                                    new THREE.Vector3(-27, 13, -37),
                                    new THREE.Vector3(-16, 13, -39),
                                    new THREE.Vector3(-12, 13, -20),
                                    new THREE.Vector3(-5, 13, -21),
                                ],
                                duration: 12000
                            }
                        }
                    }
                }
            },
            toLibrary: {
                name: "Library And Auditorium",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Library",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 13, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/library.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Auditorium",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 14, -53)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/auditorium.jpg'
                            }
                        }
                    }
                }
            },
            toOldGradeSchoolBuilding: {
                name: "Old Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            schoolDirectorOffice: {
                                name: "School Director Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/schoolDirectorOffice.jpg'
                            },
                            graduateSchoolProgramChairpersonOffice: {
                                name: "Graduate School Program Chairperson Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-84, 13, 1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/gspcOffice.jpg'
                            },
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "College of Business Administration Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansMEDTECH: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansNURSING: {
                                name: "College of Nursing Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-83, 14, 3),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/nursingDeanOffice.jpg'
                            },
                            DeansPTOTRT: {
                                name: "College of PT/ OT/ RT Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/PTOTRTDeanOffice.jpg'
                            },
                            DeansCAS: {
                                name: "College of Arts and Science Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/CASDeanOffice.jpg'
                            },
                            DeansPharma: {
                                name: "College of Pharmacy Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 2),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/CPDeanOffice.jpg'
                            },
                            DeansRESEARCH: {
                                name: "Research and Development Center ",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/researchAndDevelopmentCenter.jpg'
                            },
                            DeansEDUC: {
                                name: "College of Education Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/EDUCOffice.jpg'
                            },
                            DeansVP: {
                                name: "Office of Executive Vice President",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/VPOffice.jpg'
                            },
                            DeansSHS: {
                                name: "SHS Principal Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -47),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-80, 13, -26),
                                    new THREE.Vector3(-82, 13, -25),
                                    new THREE.Vector3(-77, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-81, 14, 3),
                                    new THREE.Vector3(-82, 14, -1),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/SHSOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCEAT: {
                name: "College of Engineering, Architecture and Technologies",
                floors: {
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-100, 13, -31),
                                    new THREE.Vector3(-100, 14, -31),
                                    new THREE.Vector3(-98, 14, -32)
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/engineeringDeanOffice.jpg'
                            }
                        }
                    },
                }
            },
            toCRIM: {
                name: "College of Criminology Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Criminology Dean's Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-53, 13, -28),
                                    new THREE.Vector3(-30, 13, -30),
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-35, 13, -20),
                                ],
                                duration: 14000,
                                panoramaImage: '/assets/panoramas/criminologyDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewCollegeBuilding: {
                name: "New College Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-53, 13, -28),
                                ],
                                duration: 25000,
                                panoramaImage: '/assets/panoramas/europeanGarden1.jpg'
                            }
                        }
                    },
                    third: {
                        name: "Third Floor",
                        rooms: {
                            main: {
                                name: "College of Maritime Dean's  Office",
                                points: [
                                    new THREE.Vector3(-103, 13, -54),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-53, 13, -28),
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-56, 13, -26),
                                    new THREE.Vector3(-56, 14, -26),
                                    new THREE.Vector3(-56, 18, -26),
                                    new THREE.Vector3(-30, 18, -30),
                                    new THREE.Vector3(-28, 18, -8),
                                    new THREE.Vector3(-35, 18, -7),
                                ],
                                duration: 14000,
                                panoramaImage: '/assets/panoramas/maritimeDeanOffice.jpg'
                            }
                        }
                    }
                }
            }
        }
    // [Start - New College Building]
    },
    NewCollegeBuilding: {
        name: "New College Building",
        paths: {
            toAdminBuilding: {
                name: "Administration Building",
                floors: {
                    first: {
                        name: "Main",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-30, 13, -22),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-21, 13, -30),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/adminBuilding.jpg'
                            },
                            registrar: {
                                name: "Registrar",
                                points: [
                                    new THREE.Vector3(-30, 13, -22),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-20, 13, -19),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/registrar.jpg'
                            },
                            cashier: {
                                name: "Cashier",
                                points: [
                                    new THREE.Vector3(-30, 13, -22),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-20, 13, -19),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/cashier.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            room201: {
                                name: "College of Computer Studies Dean's Office",
                                points: [
                                    new THREE.Vector3(-30, 13, -22),
                                    new THREE.Vector3(-21, 13, -23),
                                    new THREE.Vector3(-23, 13, -28),
                                    new THREE.Vector3(-23, 14, -28),
                                    new THREE.Vector3(-19, 14, -29),
                                    new THREE.Vector3(-18, 14, -24),
                                ],
                                duration: 13000,
                                panoramaImage: '/assets/panoramas/ccsBuilding3.jpg'
                            },
                        }
                    }
                }
            },
            toLibrary: {
                name: "Library And Auditorium",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Library",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-57, 13, -39),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 13, -53),
                                ],
                                duration: 13000,
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Auditorium",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-57, 13, -39),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-70, 14, -53),
                                ],
                                duration: 13000,
                            }
                        }
                    }
                }
            },
            toOldGradeSchoolBuilding: {
                name: "Old Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            schoolDirectorOffice: {
                                name: "School Director Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/schoolDirectorOffice.jpg'
                            },
                            graduateSchoolProgramChairpersonOffice: {
                                name: "Graduate School Program Chairperson Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-84, 13, 1),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/gspcOffice.jpg'
                            },
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "College of Business Administration Dean's Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansMEDTECH: {
                                name: "College of Medical Technology Dean's Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-84, 14, 4),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CBAAMEDTECHDeanOffice.jpg'
                            },
                            DeansNURSING: {
                                name: "College of Nursing Dean's Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-83, 14, 3),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/nursingDeanOffice.jpg'
                            },
                            DeansPTOTRT: {
                                name: "College of PT/ OT/ RT Dean's Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/PTOTRTDeanOffice.jpg'
                            },
                            DeansCAS: {
                                name: "College of Arts and Science Dean's Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-82, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CASDeanOffice.jpg'
                            },
                            DeansPharma: {
                                name: "College of Pharmacy Dean's Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-80, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/CPDeanOffice.jpg'
                            },
                            DeansRESEARCH: {
                                name: "Research and Development Center ",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-75, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/researchAndDevelopmentCenter.jpg'
                            },
                            DeansEDUC: {
                                name: "College of Education Dean's Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-75, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/EDUCOffice.jpg'
                            },
                            DeansVP: {
                                name: "Office of Executive Vice President",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-75, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/VPOffice.jpg'
                            },
                            DeansSHS: {
                                name: "SHS Principal Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-78, 13, -24),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-90, 13, 4),
                                    new THREE.Vector3(-90, 14, 4),
                                    new THREE.Vector3(-75, 14, 2),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/SHSOffice.jpg'
                            }
                        }
                    },
                }
            },
            toCITHM: {
                name: "College of Tourism and Hospitality Management",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            lobby: {
                                name: "Lobby",
                                points: [
                                    new THREE.Vector3(-53, 13, -28),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-103, 13, -54)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/hospitalityManagement.jpg'
                            }
                        }
                    },
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-53, 13, -28),
                                    new THREE.Vector3(-67, 13, -37),
                                    new THREE.Vector3(-77, 13, -35),
                                    new THREE.Vector3(-94, 13, -49),
                                    new THREE.Vector3(-102, 13, -48),
                                    new THREE.Vector3(-100, 13, -54),
                                    new THREE.Vector3(-100, 14, -54),
                                    new THREE.Vector3(-100, 14, -58),
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/cithmDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCEAT: {
                name: "College of Engineering, Architecture and Technologies",
                floors: {
                    second: {
                        name: "Second Floor",
                        rooms: {
                            main: {
                                name: "Dean's Office",
                                points: [
                                    new THREE.Vector3(-54, 13, -26),
                                    new THREE.Vector3(-54, 13, -32),
                                    new THREE.Vector3(-80, 13, -27),
                                    new THREE.Vector3(-81, 13, -31),
                                    new THREE.Vector3(-95, 13, -40),
                                    new THREE.Vector3(-100, 13, -39),
                                    new THREE.Vector3(-100, 13, -31)
                                ],
                                duration: 20000,
                                panoramaImage: '/assets/panoramas/engineeringDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toCRIM: {
                name: "College of Criminology Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Criminology Dean's Office",
                                points: [
                                    new THREE.Vector3(-38, 13, -6),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-35, 13, -20),
                                ],
                                duration: 12000,
                                panoramaImage: '/assets/panoramas/criminologyDeanOffice.jpg'
                            }
                        }
                    }
                }
            },
            toNewGradeSchoolBuilding: {
                name: "New Grade School Building",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
                                points: [
                                    new THREE.Vector3(-30, 13, -21),
                                    new THREE.Vector3(-14, 13, -23),
                                    new THREE.Vector3(-5, 13, -21)
                                ],
                                duration: 20000
                            }
                        }
                    }
                }           
            }
        }
    }
};

let isNavigating = false;

function createLabel(text, position) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'you-are-here-label';
    labelDiv.textContent = text;
    
    const label = new CSS2DObject(labelDiv);
    label.position.set(position.x, position.y + 2, position.z);
    scene.add(label);
    
    return label;
}

function addArrowToSegment(start, end, scene, yOffset = 2) {
    const adjustedStart = new THREE.Vector3(start.x, start.y + yOffset, start.z);
    const adjustedEnd = new THREE.Vector3(end.x, end.y + yOffset, end.z);

    const direction = new THREE.Vector3().subVectors(adjustedEnd, adjustedStart).normalize();
    const arrowLength = adjustedStart.distanceTo(adjustedEnd) * 0.5;
    const arrowColor = 0xffff00;
    const headLength = 3;
    const headWidth = 3;

    const arrow = new THREE.ArrowHelper(direction, adjustedStart, arrowLength, arrowColor, headLength, headWidth);
    scene.add(arrow);
    return arrow;
}

function addArrowsToPath(pathPoints, scene, yOffsetCallback = () => 8) {
    const arrows = [];
    for (let i = 0; i < pathPoints.length - 1; i++) {
        const yOffset = yOffsetCallback(i);
        const arrow = addArrowToSegment(pathPoints[i], pathPoints[i + 1], scene, yOffset);
        arrows.push(arrow);
    }
    return arrows;
}

function clearArrows(arrows, scene) {
    arrows.forEach(arrow => scene.remove(arrow));
}

let isVoiceoverMuted = false;

function toggleVoiceoverMute() {
    isVoiceoverMuted = !isVoiceoverMuted;
    const muteButton = document.getElementById('mute-voiceover-btn');
    const voiceoverIcon = document.getElementById('voiceover-icon');

    if (isVoiceoverMuted) {
        voiceoverIcon.classList.remove('fa-volume-up');
        voiceoverIcon.classList.add('fa-volume-mute');
        muteButton.title = 'Unmute Voiceover';
        
        window.speechSynthesis.cancel();
    } else {
        voiceoverIcon.classList.remove('fa-volume-mute');
        voiceoverIcon.classList.add('fa-volume-up');
        muteButton.title = 'Mute Voiceover';
    }
}

function playVoiceover(message) {
    if (isVoiceoverMuted) {
        return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);
}

document.addEventListener('DOMContentLoaded', () => {
    const muteButton = document.getElementById('mute-voiceover-btn');
    if (muteButton) {
        muteButton.addEventListener('click', toggleVoiceoverMute);
    }
});

function getDirection(previous, current, next) {
    const v1 = new THREE.Vector3().subVectors(current, previous).normalize();
    const v2 = new THREE.Vector3().subVectors(next, current).normalize();

    const crossProduct = new THREE.Vector3().crossVectors(v1, v2);
    const angle = v1.angleTo(v2);

    if (current.y !== next.y) {
        if (next.y > current.y) return "Proceed to the staircase and move up to the next floor.";
        if (next.y < current.y) return "Proceed to the staircase and move down to the previous floor.";
    }

    const straightThreshold = 1;
    const slightTurnThreshold = 0.8;

    if (angle < straightThreshold) {
        return "Proceed straight";
    } else if (angle <= slightTurnThreshold) {
        if (crossProduct.y > 0) return "Make a slight left turn";
        if (crossProduct.y < 0) return "Make a slight right turn";
    } else {
        if (crossProduct.y > 0) return "Turn left";
        if (crossProduct.y < 0) return "Turn right";
    }
    return "Proceed straight";
}

function animatePathWithControls(pathPoints, duration = 13000) {
    controls.minDistance = 0;
    console.log("Starting animatePathWithControls...");
    isNavigating = true;
    let isNavigationComplete = false;

    const totalSegments = pathPoints.length - 1;

    let arrows = addArrowsToPath(pathPoints, scene);

    // Navigation controls
    const pauseButton = document.getElementById("pause-btn");
    const resumeButton = document.getElementById("resume-btn");
    const restartButton = document.getElementById("restart-btn");
    const cancelButton = document.getElementById("cancel-btn");
    const navigateButton = document.getElementById("navigate-btn");
    const locationSelectors = [
        document.getElementById("category-select"),
        document.getElementById("path-select"),
        document.getElementById("floor-select"),
        document.getElementById("room-select")
    ];

    navigateButton.disabled = true;
    locationSelectors.forEach((selector) => (selector.disabled = true));

    pauseButton.disabled = false;
    resumeButton.disabled = true;
    restartButton.disabled = false;
    cancelButton.disabled = false;

    let currentSegment = 0;
    let isPaused = false;
    let currentTween = null;

    const lineGroup = new THREE.Group();
        for (let i = 0; i < pathPoints.length - 1; i++) {
            const start = pathPoints[i];
            const end = pathPoints[i + 1];
        
            const isFloorChange = start.y !== end.y;
            let material;
        if (start.y !== end.y) {
            if (end.y > start.y) {
                material = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue for UP
            } else {
                material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red for DOWN
            }
        } else {
            material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green for no change
        }

        if (end.y === 14 && start.y === 14) {
            material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
        } else if (end.y === 16 && start.y === 16) {
            material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        }
    
        const distance = start.distanceTo(end);
        const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, distance, 5);
        const cylinder = new THREE.Mesh(cylinderGeometry, material);
    
        const midpoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
        cylinder.position.copy(midpoint);
    
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const axis = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
        cylinder.quaternion.copy(quaternion);
    
        lineGroup.add(cylinder);
    
        if (isFloorChange) {
            const icon = createFloorChangeIcon(end.y > start.y, midpoint);
            scene.add(icon);
            scene.add(lineGroup);
        }
    }
    

    function createFloorChangeIcon(isUp, position) {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'floor-change-icon';
    
        if (isUp) {
            iconDiv.innerHTML = `<i class="fa-solid fa-stairs"></i><i class="fa-solid fa-arrow-up"></i>`;
        } else {
            iconDiv.innerHTML = `<i class="fa-solid fa-stairs"></i><i class="fa-solid fa-arrow-down"></i>`;
        }
    
        const icon = new CSS2DObject(iconDiv);
        icon.position.set(position.x, position.y + 2, position.z);
        icon.name = 'FloorChangeIcon';
        return icon;
    }
    

    scene.add(lineGroup);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 1,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(pathPoints[0]);
    scene.add(sphere);

    const youLabel = createLabel("You", pathPoints[0]);

    function moveCameraAndMap() {
        if (currentSegment >= totalSegments) {
            if (isNavigationComplete) return;
            isNavigationComplete = true;
            clearArrows(arrows, scene);
    
            console.log("Navigation completed, zooming into endpoint...");
    
            const endPoint = pathPoints[pathPoints.length - 1];
    
            // Final Voiceover
            playVoiceover("You have reached your destination.");
    
            new TWEEN.Tween(camera.position)
                .to(
                    {
                        x: endPoint.x,
                        y: 20,
                        z: endPoint.z,
                    },
                    2000
                )
                .easing(TWEEN.Easing.Quartic.InOut)
                .onUpdate(() => {
                    camera.lookAt(
                        new THREE.Vector3(
                            endPoint.x,
                            endPoint.y + 1.5,
                            endPoint.z
                        )
                    );
                })
                .onComplete(() => {
                    if (isNavigationComplete) {
                        triggerPanoramaViewer(endPoint);
                    }
                })
                .start();
            return;
        }
    
        const start = pathPoints[currentSegment];
        const end = pathPoints[currentSegment + 1];
        const next = pathPoints[currentSegment + 2] || end;

        if (currentSegment === 0) {
            playVoiceover("Navigation started. Follow the path.");
        } else {
            const direction = getDirection(pathPoints[currentSegment - 1], start, end);
            playVoiceover(direction);
        }

    
        const segmentDuration = duration / totalSegments;
    
        currentTween = new TWEEN.Tween(sphere.position)
            .to(end, segmentDuration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => {
                youLabel.position.copy(sphere.position);
                camera.position.lerp(
                    new THREE.Vector3(sphere.position.x, 150, sphere.position.z),
                    0.3
                );
                camera.lookAt(sphere.position);
                scene.position.set(-sphere.position.x, 0, -sphere.position.z);
            })
            .onComplete(() => {
                currentSegment++;
                if (!isPaused) moveCameraAndMap();
            })
            .start();
    }
    

    function triggerPanoramaViewer(endPoint) {
        const categoryKey = document.getElementById("category-select").value;
        const pathKey = document.getElementById("path-select").value;
        const floorKey = document.getElementById("floor-select").value;
        const roomKey = document.getElementById("room-select").value;

        const selectedRoom =
            paths[categoryKey]?.paths[pathKey]?.floors[floorKey]?.rooms[roomKey];

        if (selectedRoom?.panoramaImage) {
            window.openFullscreenPanorama(selectedRoom.panoramaImage, {
                x: endPoint.x,
                y: endPoint.y,
                z: endPoint.z,
            });
            window.addEventListener("panoramaClose", () => {
                console.log("Panorama viewer closed.");
                cleanup();
            });
        } else {
            console.error("No panorama image found for the selected room.");
            cleanup();
        }
    }

    function cleanup() {
        console.log("Performing cleanup after panorama viewer closed.");

        if (lineGroup) {
            scene.remove(lineGroup);
            lineGroup.children.forEach((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
        }

        scene.remove(sphere);
        scene.remove(youLabel);

        scene.traverse((object) => {
            if (object.name === 'FloorChangeIcon') {
                scene.remove(object);
            }
        });
        
        const navigationControls = document.getElementById('navigation-controls');
        if (navigationControls) {
            Array.from(navigationControls.querySelectorAll('button')).forEach(button => {
                button.disabled = true;
            });
        }
    
        isNavigating = false;
        isNavigationComplete = true;
        
        const navigateButton = document.getElementById('navigate-btn');
        if (navigateButton) {
            navigateButton.disabled = false;
        }
    
        locationSelectors.forEach((selector) => (selector.disabled = false));
        
        console.log("Cleanup complete.");

        controls.minDistance = 120;
    }
    

    // Navigation Controls
    // Pause Navigation
    pauseButton.addEventListener("click", () => {
        isPaused = true;
        if (currentTween) currentTween.stop();
        pauseButton.disabled = true;
        resumeButton.disabled = false;
        restartButton.disabled = true;
    });

    // Resume Navigation
    resumeButton.addEventListener("click", () => {
        isPaused = false;
        pauseButton.disabled = false;
        resumeButton.disabled = true;
        restartButton.disabled = false;
        moveCameraAndMap();
    });

    // Restart Navigation
    restartButton.addEventListener("click", () => {
        if (currentTween) currentTween.stop();
        currentSegment = 0;
        sphere.position.copy(pathPoints[0]);
        isNavigationComplete = false;
        moveCameraAndMap();
    });

    // Cancel Navigation
    cancelButton.addEventListener("click", () => {
        if (currentTween) currentTween.stop();
        clearArrows(arrows, scene);
        arrows = []; 
        cleanup();
    });

    // Start navigation
    moveCameraAndMap();
}

function populateCategoryDropdown() {
    const categorySelect = document.getElementById('category-select');
    categorySelect.innerHTML = '';

    const sortedCategories = Object.keys(paths)
        .sort((a, b) => paths[a].name.localeCompare(paths[b].name));

    sortedCategories.forEach(categoryKey => {
        const option = document.createElement('option');
        option.value = categoryKey;
        option.textContent = paths[categoryKey].name;
        categorySelect.appendChild(option);
    });

    if (categorySelect.options.length > 0) {
        categorySelect.value = categorySelect.options[0].value;
        populatePathDropdown(categorySelect.value);
    }

    categorySelect.addEventListener('change', () => {
        populatePathDropdown(categorySelect.value);
        updateGoButtonState();
    });

    updateGoButtonState();
}


populateCategoryDropdown();

function populatePathDropdown(categoryKey) {
    const pathSelect = document.getElementById('path-select');
    const floorSelect = document.getElementById('floor-select');
    const roomSelect = document.getElementById('room-select');

    pathSelect.innerHTML = '';
    floorSelect.innerHTML = '';
    roomSelect.innerHTML = '';

    if (paths[categoryKey]) {
        const sortedPaths = Object.keys(paths[categoryKey].paths)
            .sort((a, b) => paths[categoryKey].paths[a].name.localeCompare(paths[categoryKey].paths[b].name));

        sortedPaths.forEach(pathKey => {
            const path = paths[categoryKey].paths[pathKey];
            const option = document.createElement('option');
            option.value = pathKey;
            option.textContent = path.name;
            pathSelect.appendChild(option);
        });

        if (pathSelect.options.length > 0) {
            pathSelect.value = pathSelect.options[0].value;
            populateFloorDropdown(categoryKey, pathSelect.value);
        }
    }

    pathSelect.addEventListener('change', () => {
        populateFloorDropdown(categoryKey, pathSelect.value);
        updateGoButtonState();
    });

    updateGoButtonState();
}


function populateFloorDropdown(categoryKey, pathKey) {
    const floorSelect = document.getElementById('floor-select');
    const roomSelect = document.getElementById('room-select');

    floorSelect.innerHTML = '';
    roomSelect.innerHTML = '';

    const path = paths[categoryKey].paths[pathKey];
    if (path.floors) {
        Object.keys(path.floors).forEach(floorKey => {
            const floor = path.floors[floorKey];
            const option = document.createElement('option');
            option.value = floorKey;
            option.textContent = floor.name;
            floorSelect.appendChild(option);
        });

        if (floorSelect.options.length > 0) {
            floorSelect.value = floorSelect.options[0].value;
            populateRoomDropdown(categoryKey, pathKey, floorSelect.value);
        }
    }

    floorSelect.addEventListener('change', () => {
        populateRoomDropdown(categoryKey, pathKey, floorSelect.value);
        updateGoButtonState();
    });

    updateGoButtonState();
}

function populateRoomDropdown(categoryKey, pathKey, floorKey) {
    const roomSelect = document.getElementById('room-select');
    roomSelect.innerHTML = '';

    const floors = paths[categoryKey].paths[pathKey].floors;
    if (floors && floors[floorKey]) {
        const rooms = floors[floorKey].rooms;
        Object.keys(rooms).forEach(roomKey => {
            const room = rooms[roomKey];
            const option = document.createElement('option');
            option.value = roomKey;
            option.textContent = room.name;
            roomSelect.appendChild(option);
        });
    }

    roomSelect.addEventListener('change', updateGoButtonState);
    updateGoButtonState();
}

function updateGoButtonState() {
    const categorySelect = document.getElementById('category-select');
    const pathSelect = document.getElementById('path-select');
    const floorSelect = document.getElementById('floor-select');
    const roomSelect = document.getElementById('room-select');
    const navigateButton = document.getElementById('navigate-btn');

    navigateButton.disabled = !(
        categorySelect.value && 
        pathSelect.value && 
        floorSelect.value && 
        roomSelect.value
    );
}

document.getElementById("navigate-btn").addEventListener("click", () => {
    const categoryKey = document.getElementById('category-select').value;
    const pathKey = document.getElementById('path-select').value;
    const floorKey = document.getElementById('floor-select').value;
    const roomKey = document.getElementById('room-select').value;

    if (
        paths[categoryKey] && 
        paths[categoryKey].paths[pathKey] && 
        paths[categoryKey].paths[pathKey].floors[floorKey] && 
        paths[categoryKey].paths[pathKey].floors[floorKey].rooms[roomKey]
    ) {
        // Show confirmation modal
        const modal = document.getElementById("confirm-navigation-modal");
        modal.style.display = "flex";

        const selectedRoom = paths[categoryKey].paths[pathKey].floors[floorKey].rooms[roomKey];

        // Handle proceed button click
        document.getElementById("proceed-navigation-btn").onclick = () => {
            modal.style.display = "none";
            animatePathWithControls(selectedRoom.points, selectedRoom.duration);
        };

        // Handle cancel button click
        document.getElementById("cancel-navigation-btn").onclick = () => {
            modal.style.display = "none";
        };
    } else {
        alert("Please ensure all navigation fields are correctly selected.");
    }
});


// End of Point-to-Point Feature


// Label Icons Legend
const labelIcons = {
    restroom1: {
        position: { x: -35, y: 13, z: -21 },
        title: 'Restroom',
        icon: 'toilet.svg',
        type: 'restroom'
    },
    restroom2: {
        position: { x: -61, y: 13, z: -60 },
        title: 'Restroom',
        icon: 'toilet.svg',
        type: 'restroom'
    },
    restroom3: {
        position: { x: -89, y: 13, z: -20 },
        title: 'Restroom',
        icon: 'toilet.svg',
        type: 'restroom'
    },
    parking1: {
        position: { x: -13, y: 13, z: -78 },
        title: 'Parking Area',
        icon: 'car.svg',
        type: 'parking'
    },
    parking2: {
        position: { x: 80, y: 13, z: 57 },
        title: 'Parking Area',
        icon: 'car.svg',
        type: 'parking'
    },
    field: {
        position: { x: 8, y: 13, z: -52 },
        title: 'Track and Field',
        icon: 'person-simple-run.svg',
        type: 'field'
    },
    store1: {
        position: { x: -30, y: 13, z: -49 },
        title: 'Bookstore',
        icon: 'storefront.svg',
        type: 'store'
    },
    eatery1: {
        position: { x: -50.3, y: 13, z: -46 },
        title: 'Jolliperps',
        icon: 'eatery.svg',
        type: 'eatery'
    },
    eatery2: {
        position: { x: -89, y: 13, z: -31 },
        title: 'Canteen',
        icon: 'eatery.svg',
        type: 'eatery'
    },
    eatery3: {
        position: { x: -15, y: 13, z: -18 },
        title: 'Food Stall',
        icon: 'eatery.svg',
        type: 'eatery'
    },
    eatery4: {
        position: { x: -3, y: 13, z: -13 },
        title: 'Canteen',
        icon: 'eatery.svg',
        type: 'eatery'
    },
    pool: {
        position: { x: -111, y: 13, z: -27 },
        title: 'Swimming Pool',
        icon: 'swimming-pool.svg',
        type: 'pool'
    }
};

function createLabelIcon(labelData) {
    const labelDiv = document.createElement('div');
    labelDiv.className = `label-icon ${labelData.type}-icon`;

    const iconImg = document.createElement('img');
    iconImg.src = `/assets/icons/${labelData.icon}`;
    iconImg.className = 'label-icon-image';

    labelDiv.appendChild(iconImg);

    const label = new CSS2DObject(labelDiv);
    label.position.set(labelData.position.x, labelData.position.y + 2, labelData.position.z);

    scene.add(label);
    return label;
}

//------- Label Icons ------\\
Object.entries(labelIcons).forEach(([id, data]) => {
    createLabelIcon(data);
});

const markers = {};
Object.entries(locations).forEach(([id, data]) => {
    markers[id] = createMarker(data, id);
});

function showLocationPopup(locationId) {
    const location = locations[locationId];
    const existingPopup = document.getElementById('location-popup');

    window.closeHotspotPopup();
    
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement('div');
    popup.className = 'location-popup';
    popup.id = 'location-popup';
    popup.innerHTML = `
        <button class="popup-close-btn" onclick="closePopup()">×</button>
        <h3>${location.title}</h3>
    `;
    document.body.appendChild(popup);

    currentPopup = popup;
    currentPopupLocation = location.position;

    updatePopupPosition();
}

function updatePopupPosition() {
    if (currentPopup && currentPopupLocation) {
        const vector = new THREE.Vector3(currentPopupLocation.x, currentPopupLocation.y, currentPopupLocation.z);
        vector.project(camera);
        const halfWidth = window.innerWidth / 2;
        const halfHeight = window.innerHeight / 2;
        currentPopup.style.left = `${vector.x * halfWidth + halfWidth}px`;
        currentPopup.style.top = `${-vector.y * halfHeight + halfHeight}px`;
    }
}

window.closePopup = function() {
    const popup = document.getElementById('location-popup');
    if (popup) popup.remove();
    currentPopup = null;
    currentPopupLocation = null;
    
    closeInfoTab();
};

const loader = new GLTFLoader();
loader.load('/assets/model/campus-simple.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error('Error loading model:', error);
});

function animate(time) {
    requestAnimationFrame(animate);
    
    TWEEN.update();
    
    controls.update();
    
    scene.children.forEach(object => {
        if (object.userData && object.userData.hotspotId) {
            const pulseData = object.userData.pulseScale;
            
            if (!object.userData.lastPulseUpdate || time - object.userData.lastPulseUpdate > 100) {
                pulseData.value += pulseData.direction * 0.004;
                if (pulseData.value >= 1.2 || pulseData.value <= 0.8) {
                    pulseData.direction *= -1;
                }
                object.scale.set(pulseData.value, pulseData.value, pulseData.value);
                object.userData.lastPulseUpdate = time;
            }
        }
    });
    
    if (document.visibilityState === 'visible') {
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

onWindowResize();

// Search Bar Functions
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const infoTab = document.getElementById('info-tab');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = '';

    if (!query) {
        searchResults.style.display = 'none';
        return;
    }

    const uniqueResults = new Set();

    Object.entries(locations).forEach(([id, loc]) => {
        const matchesTitle = loc.title.toLowerCase().includes(query);
        const matchesTags = loc.tags?.some(tag => tag.toLowerCase().includes(query));
        const matchesDescription = loc.description?.toLowerCase().includes(query);

        if ((matchesTitle || matchesTags || matchesDescription) && !uniqueResults.has(id)) {
            uniqueResults.add(id);

            const item = document.createElement('div');
            item.className = 'search-result-item';

            const highlightedTitle = highlightMatchedText(loc.title, query);

            const matchingTags = loc.tags
                ?.filter(tag => tag.toLowerCase().includes(query))
                .map(tag => highlightMatchedText(tag, query))
                .join(', ') || 'No matching tags';

                item.innerHTML = `
                <div class="search-title-tag-container>">
                    <span><b>${highlightedTitle}</b></span>
                    <div class="tags">
                        <p>Tags:</p>
                        <div class="tag-container">
                            ${matchingTags.split(', ').map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="result-header">
                    <button class='search-input-btn' onClick="showInfo('${id}')">Learn More</button>
                </div>
            `;
            searchResults.appendChild(item);
        }
    });
    searchResults.style.display = uniqueResults.size > 0 ? 'block' : 'none';
});

// Mobile search functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchResults = document.getElementById('mobile-search-results');
    const mobileClearBtn = document.getElementById('mobile-search-clear-btn');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');

    mobileSearchInput.addEventListener('input', () => {
        const query = mobileSearchInput.value.toLowerCase().trim();
        mobileSearchResults.innerHTML = '';

        if (query) {
            mobileClearBtn.style.display = 'block';
            mobileSearchBtn.style.display = 'none';
        } else {
            mobileClearBtn.style.display = 'none';
            mobileSearchBtn.style.display = 'block';
            mobileSearchResults.style.display = 'none';
            return;
        }

        const uniqueResults = new Set();

        Object.entries(locations).forEach(([id, loc]) => {
            const matchesTitle = loc.title.toLowerCase().includes(query);
            const matchesTags = loc.tags?.some(tag => tag.toLowerCase().includes(query));
            const matchesDescription = loc.description?.toLowerCase().includes(query);

            if ((matchesTitle || matchesTags || matchesDescription) && !uniqueResults.has(id)) {
                uniqueResults.add(id);

                const item = document.createElement('div');
                item.className = 'search-result-item';

                const highlightedTitle = loc.title.replace(
                    new RegExp(query, 'gi'),
                    match => `<mark>${match}</mark>`
                );

                const matchingTags = loc.tags
                    ?.filter(tag => tag.toLowerCase().includes(query))
                    .map(tag => tag.replace(
                        new RegExp(query, 'gi'),
                        match => `<mark>${match}</mark>`
                    ))
                    .join(', ') || 'No matching tags';

                item.innerHTML = `
                    <div class="search-title-tag-container">
                        <span><b>${highlightedTitle}</b></span>
                        <div class="tags">
                            <p>Tags:</p>
                            <div class="tag-container">
                                ${matchingTags.split(', ').map(tag => 
                                    `<span class="tag">${tag}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="result-header">
                        <button class='search-input-btn' onclick="showInfo('${id}')">Learn More</button>
                    </div>
                `;

                mobileSearchResults.appendChild(item);
            }
        });

        mobileSearchResults.style.display = uniqueResults.size > 0 ? 'block' : 'none';
    });

    mobileClearBtn.addEventListener('click', () => {
        mobileSearchInput.value = '';
        mobileSearchResults.innerHTML = '';
        mobileSearchResults.style.display = 'none';
        mobileClearBtn.style.display = 'none';
        mobileSearchBtn.style.display = 'block';
    });
});

function highlightMatchedText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

searchInput.addEventListener('input', () => {
    toggleClearButton();
});

function toggleClearButton() {
    const searchClearBtn = document.getElementById('search-clear-btn');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput.value.length > 0) {
        searchClearBtn.style.display = 'block';
        searchBtn.style.display = 'none';
    } else {
        searchClearBtn.style.display = 'none';
        searchBtn.style.display = 'block';
    }
}

function clearSearch() {
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';
    toggleClearButton();
    searchInput.focus();
}

document.getElementById('search-clear-btn').onclick = clearSearch;

// End of Search Functionality


// Show Info Tab
function showInfo(locationId) {

    const location = locations[locationId];

    let panoramaHtml = '';
    if (location.panoramaImages && location.panoramaImages.length > 0) {
        const floorGroups = {
            'Ground Floor': [],
            'Second Floor': [],
            'Third Floor': [],
            'Other': []
        };

        location.panoramaImages.forEach((imageData) => {
            if (imageData.label.includes('Ground Floor')) {
                floorGroups['Ground Floor'].push(imageData);
            } else if (imageData.label.includes('Second Floor')) {
                floorGroups['Second Floor'].push(imageData);
            } else if (imageData.label.includes('Third Floor')) {
                floorGroups['Third Floor'].push(imageData);
            } else {
                floorGroups['Other'].push(imageData);
            }
        });

        panoramaHtml = `<div class="panorama-section">`;
        
        Object.entries(floorGroups).forEach(([floorName, images]) => {
            if (images.length > 0) {
                panoramaHtml += `
                    <div class="floor-dropdown">
                        <button class="dropdown-header">${floorName} ▼</button>
                        <div class="dropdown-content" style="display:none;">
                            <div class="floor-panoramas">
                                ${images.map((imageData) => `
                                    <div class="panorama-container">
                                        <img src="${imageData.src}" alt="${location.title} Panorama" class="location-panorama">
                                        <div class="panorama-label-container">
                                            <div class="panorama-label">${imageData.label}</div>
                                        </div>
                                        <button onclick="openFullscreenPanorama('${imageData.src}')" class="fullscreen-btn">
                                            Fullscreen
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        panoramaHtml += `</div>`;
    }

    infoTab.innerHTML = `
        <div class="info-tab-header">
            <h2>${location.title}</h2>
            <button onclick="closeInfoTab()" class="info-tab-close-btn">&times;</button>
        </div>
        <div class="info-tab-content">
            <p class="info-tab-description">${location.description || 'No description available.'}</p>
            ${panoramaHtml}
        </div>
    `;

    document.querySelectorAll('.dropdown-header').forEach(header => {
        header.addEventListener('click', function() {
            const dropdownContent = this.nextElementSibling;
            const isVisible = dropdownContent.style.display === 'block';
            
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
            document.querySelectorAll('.dropdown-header').forEach(header => {
                header.textContent = header.textContent.replace('▲', '▼');
            });

            dropdownContent.style.display = isVisible ? 'none' : 'block';
            
            this.textContent = isVisible 
                ? `${this.textContent.replace('▲', '▼')}` 
                : `${this.textContent.replace('▼', '▲')}`;
        });
    });
    
    infoTab.style.display = 'block';
    infoTab.style.transform = 'translateX(0)';
}

const style = document.createElement('style');
style.textContent = `
    mark {
        background-color: rgba(127, 4, 4, 0.2);
        color: #7F0404;
        font-weight: bold;
        padding: 0 2px;
        border-radius: 3px;
    }
`;
document.head.appendChild(style);
// End of Show Info Tab

//----------Window Functions-------------\\

window.toggleLegendPopup = function() {
    const legendPopup = document.getElementById('legend-popup');
    legendPopup.style.display = legendPopup.style.display === 'block' ? 'none' : 'block';
};

window.showInfo = (id) => { 

    clearSearch();

    const location = locations[id];

    let panoramaHtml = '';
    if (location.panoramaImages && location.panoramaImages.length > 0) {
        const floorGroups = {
            'Ground Floor': [],
            'Second Floor': [],
            'Third Floor': [],
            'Other': []
        };

        location.panoramaImages.forEach((imageData) => {
            if (imageData.label.includes('Ground Floor')) {
                floorGroups['Ground Floor'].push(imageData);
            } else if (imageData.label.includes('Second Floor')) {
                floorGroups['Second Floor'].push(imageData);
            } else if (imageData.label.includes('Third Floor')) {
                floorGroups['Third Floor'].push(imageData);
            } else {
                floorGroups['Other'].push(imageData);
            }
        });

        panoramaHtml = `<div class="panorama-section">`;
        
        Object.entries(floorGroups).forEach(([floorName, images]) => {
            if (images.length > 0) {
                panoramaHtml += `
                    <div class="floor-dropdown">
                        <button class="dropdown-header">${floorName} ▼</button>
                        <div class="dropdown-content" style="display:none;">
                            <div class="floor-panoramas">
                                ${images.map((imageData) => `
                                    <div class="panorama-container">
                                        <img src="${imageData.src}" alt="${location.title} Panorama" class="location-panorama">
                                        <div class="panorama-label-container">
                                            <div class="panorama-label">${imageData.label}</div>
                                        </div>
                                        <button onclick="openFullscreenPanorama('${imageData.src}')" class="fullscreen-btn">
                                            Fullscreen
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        panoramaHtml += `</div>`;
    }

    infoTab.innerHTML = `
        <div class="info-tab-header">
            <h2>${location.title}</h2>
            <button onclick="closeInfoTab()" class="info-tab-close-btn">&times;</button>
        </div>
        <div class="info-tab-content">
            <p class="info-tab-description">${location.description || 'No description available.'}</p>
            ${panoramaHtml}
        </div>
    `;

    document.querySelectorAll('.dropdown-header').forEach(header => {
        header.addEventListener('click', function() {
            const dropdownContent = this.nextElementSibling;
            const isVisible = dropdownContent.style.display === 'block';
            
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = 'none';
            });
            document.querySelectorAll('.dropdown-header').forEach(header => {
                header.textContent = header.textContent.replace('▲', '▼');
            });

            dropdownContent.style.display = isVisible ? 'none' : 'block';
            
            this.textContent = isVisible 
                ? `${this.textContent.replace('▲', '▼')}` 
                : `${this.textContent.replace('▼', '▲')}`;
        });
    });
    
    infoTab.style.display = 'block';
    infoTab.style.transform = 'translateX(0)';
}; 

window.closeInfoTab = () => { 
    infoTab.style.transform = 'translateX(100%)';
    setTimeout(() => {
        infoTab.style.display = 'none';
    }, 300);
};

// Texture cache to reuse already loaded panorama textures
const textureCache = new Map();

// Pool of reusable objects
const objectPool = {
  geometry: null,
  material: null
};

window.openFullscreenPanorama = (imageSrc, position) => {
    // Create overlay
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.className = 'fullscreen-panorama-overlay';
    fullscreenOverlay.innerHTML = `
        <div class="panorama-loading">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading panorama...</div>
        </div>
        <button class="close-fullscreen-btn">&times;</button>
    `;
    document.body.appendChild(fullscreenOverlay);

    // Show loading indicator
    const loadingIndicator = fullscreenOverlay.querySelector('.panorama-loading');
    
    // Close popup if open
    if (typeof closePopup === 'function') {
        closePopup();
    }

    // Create panorama scene
    const panoramaScene = new THREE.Scene();
    
    // Check if texture is already in cache
    let panoramaTexture;
    if (textureCache.has(imageSrc)) {
        panoramaTexture = textureCache.get(imageSrc);
        createPanorama(panoramaTexture);
    } else {
        // Create texture loader with loading manager
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onProgress = (url, loaded, total) => {
            // Update loading progress
            const progress = Math.floor((loaded / total) * 100);
            const loadingText = fullscreenOverlay.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = `Loading panorama... ${progress}%`;
            }
        };
        
        const textureLoader = new THREE.TextureLoader(loadingManager);
        textureLoader.load(
            imageSrc,
            (texture) => {
                // Optimize texture
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.generateMipmaps = false; // Disable mipmaps for panoramas
                
                // Add to cache
                textureCache.set(imageSrc, texture);
                
                // Hide loading indicator
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                
                createPanorama(texture);
            },
            undefined,
            (error) => {
                console.error('Error loading panorama texture:', error);
                if (loadingIndicator) {
                    loadingIndicator.innerHTML = 'Error loading panorama';
                }
            }
        );
    }

    function createPanorama(texture) {
        // Create or reuse sphere geometry
        let geometry;
        if (objectPool.geometry) {
            geometry = objectPool.geometry;
        } else {
            geometry = new THREE.SphereGeometry(500, 60, 40);
            geometry.scale(-1, 1, 1);
            objectPool.geometry = geometry;
        }

        // Create material with the loaded texture
        const material = new THREE.MeshBasicMaterial({ 
            map: texture,
            side: THREE.DoubleSide
        });

        // Create the panorama mesh
        const panorama = new THREE.Mesh(geometry, material);
        panoramaScene.add(panorama);

        // Adjust FOV based on device width
        const fov = window.innerWidth <= 768 ? 90 : 110;
        const panoramaCamera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
        panoramaCamera.position.set(0, 0, 0.1);

        // Create renderer
        const panoramaRenderer = new THREE.WebGLRenderer({ 
            antialias: true,
            powerPreference: 'high-performance' // Request high performance mode
        });
        panoramaRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        panoramaRenderer.setSize(window.innerWidth, window.innerHeight);
        fullscreenOverlay.appendChild(panoramaRenderer.domElement);

        // Create controls
        const panoramaControls = new OrbitControls(panoramaCamera, panoramaRenderer.domElement);
        panoramaControls.enableDamping = true;
        panoramaControls.dampingFactor = window.innerWidth <= 768 ? 0.15 : 0.25;
        panoramaControls.screenSpacePanning = false;
        panoramaControls.minDistance = 0.1;
        panoramaControls.maxDistance = 500;
        panoramaControls.maxPolarAngle = Math.PI;
        panoramaControls.minPolarAngle = 0;
        panoramaControls.enableZoom = false;
        panoramaControls.enablePan = false;
        panoramaControls.rotateSpeed = window.innerWidth <= 768 ? 0.35 : 0.5;

        // Animation variables
        let animationFrameId;
        let isVisible = true;

        // Visibility API to pause rendering when tab is not visible
        if (document.hidden !== undefined) {
            document.addEventListener('visibilitychange', () => {
                isVisible = !document.hidden;
                if (!isVisible && animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                } else if (isVisible && !animationFrameId) {
                    animatePanorama();
                }
            });
        }

        // Animation function with throttled rendering
        let lastRenderTime = 0;
        const renderInterval = 1000 / 30; // Aim for 30 FPS to save performance

        function animatePanorama(time) {
            if (!isVisible) return;
            
            animationFrameId = requestAnimationFrame(animatePanorama);
            
            // Only render if controls changed or enough time passed
            const shouldRender = !lastRenderTime || time - lastRenderTime >= renderInterval || panoramaControls.update();
            
            if (shouldRender) {
                panoramaRenderer.render(panoramaScene, panoramaCamera);
                lastRenderTime = time;
            }
        }

        // Start animation
        animatePanorama();

        // Resize handler
        function onPanoramaResize() {
            panoramaCamera.aspect = window.innerWidth / window.innerHeight;
            panoramaCamera.updateProjectionMatrix();
            panoramaRenderer.setSize(window.innerWidth, window.innerHeight);
            
            // Update controls and FOV
            panoramaControls.dampingFactor = window.innerWidth <= 768 ? 0.15 : 0.25;
            panoramaControls.rotateSpeed = window.innerWidth <= 768 ? 0.35 : 0.5;
            panoramaCamera.fov = window.innerWidth <= 768 ? 90 : 110;
            panoramaCamera.updateProjectionMatrix();
        }

        // Add resize listener
        window.addEventListener('resize', onPanoramaResize);

        // Close button handler
        const closeButton = fullscreenOverlay.querySelector('.close-fullscreen-btn');
        closeButton.addEventListener('click', cleanupPanorama);

        // Prevent context menu
        fullscreenOverlay.addEventListener('contextmenu', e => e.preventDefault());

        // Cleanup function
        function cleanupPanorama() {
            console.log("Cleaning up panorama resources...");
            
            // Cancel animation frame
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            
            // Remove event listeners
            window.removeEventListener('resize', onPanoramaResize);
            fullscreenOverlay.removeEventListener('contextmenu', e => e.preventDefault());
            
            // Dispose resources that are not cached
            panoramaControls.dispose();
            panoramaRenderer.dispose();
            
            // Don't dispose geometry or texture as they're cached/pooled
            
            // Only dispose material (textures are kept in cache)
            if (material) material.dispose();
            
            // Remove from scene
            panoramaScene.remove(panorama);
            
            // Remove from DOM
            if (fullscreenOverlay.parentNode) {
                document.body.removeChild(fullscreenOverlay);
            }
            
            // Trigger panorama close event
            const event = new Event("panoramaClose");
            window.dispatchEvent(event);
        }
    }
};

// Cleanup function to call when unloading the page
window.cleanupTextureCache = () => {
    textureCache.forEach(texture => {
        texture.dispose();
    });
    textureCache.clear();
    
    if (objectPool.geometry) {
        objectPool.geometry.dispose();
        objectPool.geometry = null;
    }
    
    if (objectPool.material) {
        objectPool.material.dispose();
        objectPool.material = null;
    }
};

// Add unload event listener to clean up resources
window.addEventListener('beforeunload', window.cleanupTextureCache);

document.addEventListener('touchmove', (e) => {
    if (document.querySelector('.fullscreen-panorama-overlay')) {
        e.preventDefault();
    }
}, { passive: false });

window.toggleLegendPopup = () => {
    const legendPopup = document.getElementById('legend-popup');
    legendPopup.style.display = legendPopup.style.display === 'block' ? 'none' : 'block';
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let recentLabelClick = false;

function onLabelClick() {
    recentLabelClick = true;
    
    setTimeout(() => {
        recentLabelClick = false;
    }, 300);
}

labelDiv.addEventListener('click', () => {
    onLabelClick();
    showLocationPopup(locationId);
});
