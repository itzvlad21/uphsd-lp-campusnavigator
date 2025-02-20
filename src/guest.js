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
controls.minDistance = 50;
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
        tags: ["College of Criminology Dean's Office [Ground Floor]"],
    },
    epcHall: {
        position: { x: -70, y: 10, z: -53 },
        title: 'EPC Hall',
        description: 'A building that combines a comprehensive library for research and study with an auditorium used for university seminars, events, and activities.',
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
        tags: ['CITHM', "CITHM Dean's Office [Second Floor]", "College of International Tourism Hospitality Management Dean's Office [Second Floor]",
            "Security Office [Ground Floor]",
            "CITHM Library [Fourth Floor]"
        ]
    },
    newCollegeBuilding: {
        position: { x: -55, y: 10, z: -28 },
        title: 'New College Building',
        description: 'A modern facility that serves as a hub for senior high school and college students. It houses the TVET Department, Maritime Affairs offices, and classrooms for various academic programs.',
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
        tags: ['high', 'high school', "Administration Office [Ground Floor]", "Junior Highschool Principal Office [Ground Floor]", "New Junior Business High School"]
    },
    collegeOfEngineering: {
        position: { x: -99, y: 10, z: -32 },
        title: 'College of Engineering Building',
        description: 'A facility for engineering and architecture programs, equipped with laboratories, classrooms, and resources for technical and practical learning.',
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
    label.position.set(locationData.position.x, locationData.position.y + 2, locationData.position.z);
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

    return { pin, label };
}

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
                                duration: 20000
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
                                duration: 15000
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
                                duration: 15000
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
                                duration: 15000,
                                panoramaImage: '/assets/panoramas/admissionOffice.jpg'
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
                                duration: 15000
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
                                    new THREE.Vector3(-27, 13, -23),
                                    new THREE.Vector3(-26, 13, -8),
                                    new THREE.Vector3(-73, 13, 0),
                                    new THREE.Vector3(-80, 13, 1),
                                ],
                                duration: 15000,
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
                                duration: 15000,
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
                            }
                        }
                    },
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
                                duration: 10000,
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
                                    new THREE.Vector3(-35, 13, -20),
                                ],
                                duration: 15000,
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
                                name: "Main Building",
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
                                duration: 15000
                            }
                        }
                    }
                }
            },
            toCEAT: {
                name: "College of Engineering, Architecture and Technologies",
                floors: {
                    first: {
                        name: "Ground Floor",
                        rooms: {
                            main: {
                                name: "Main Building",
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
                                    new THREE.Vector3(-100, 13, -39)
                                ],
                                duration: 15000
                            }
                        }
                    },
                    
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

function animatePathWithControls(pathPoints, duration = 8000) {
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
        type: 'field',
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

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
    scene.children.forEach(object => {
        if (object.userData && object.userData.hotspotId) {
            const pulseScale = object.userData.pulseScale;
            pulseScale.value += pulseScale.direction * 0.004;
            if (pulseScale.value >= 1.2 || pulseScale.value <= 0.8) {
                pulseScale.direction *= -1;
            }
            object.scale.set(pulseScale.value, pulseScale.value, pulseScale.value);
        }
    });
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
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

            // Highlight matching title
            const highlightedTitle = highlightMatchedText(loc.title, query);

            // Filter and highlight matching tags
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
                    <button class='search-input-btn' onclick="showInfo('${id}')">Learn More</button>
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

        // Toggle clear button visibility
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

                // Highlight matching title
                const highlightedTitle = loc.title.replace(
                    new RegExp(query, 'gi'),
                    match => `<mark>${match}</mark>`
                );

                // Filter and highlight matching tags
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

    // Clear search functionality
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


function showInfo(locationId) {
    const location = locations[locationId];
    
    let panoramaHtml = '';
    if (location.panoramaImages && location.panoramaImages.length > 0) {
        panoramaHtml = `<div class="panorama-section">`;
        location.panoramaImages.forEach((imageData) => {
            panoramaHtml += `
                <div class="panorama-container">
                    <img src="${imageData.src}" alt="${location.title} Panorama" class="location-panorama">
                    ${imageData.label ? `<div class="panorama-label">${imageData.label}</div>` : ''}
                    <button onclick="openFullscreenPanorama('${imageData.src}')" class="fullscreen-btn">
                        Fullscreen
                    </button>
                </div>
            `;
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
    
    infoTab.style.display = 'block';
    infoTab.style.transform = 'translateX(0)';

    searchResults.innerHTML = '';
    searchResults.style.display = 'none';
    searchInput.value = '';
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

//----------Window Functions-------------\\

window.toggleLegendPopup = function() {
    const legendPopup = document.getElementById('legend-popup');
    legendPopup.style.display = legendPopup.style.display === 'block' ? 'none' : 'block';
};

window.showInfo = (id) => { 
    const loc = locations[id]; 

    let panoramaHtml = ''; 
    if (loc.panoramaImages && loc.panoramaImages.length > 0) { 
        panoramaHtml = `<div class="panorama-section">`; 
        loc.panoramaImages.forEach((imageData) => { 
            panoramaHtml += ` 
                <div class="panorama-container"> 
                    <img src="${imageData.src}" alt="${loc.title} Panorama" class="location-panorama">
                    ${imageData.label ? `<div class="panorama-label">${imageData.label}</div>` : ''}
                    <button onclick="openFullscreenPanorama('${imageData.src}')" class="fullscreen-btn">
                        Fullscreen
                    </button> 
                </div> 
            `; 
        }); 
        panoramaHtml += `</div>`; 
    } 

    infoTab.innerHTML = ` 
        <div class="info-tab-header">
            <h2>${loc.title}</h2>
            <button onclick="closeInfoTab()" class="info-tab-close-btn">&times;</button>
        </div>
        <div class="info-tab-content">
            <p class="info-tab-description">${loc.description || 'No description available.'}</p>
            ${panoramaHtml}
        </div>
    `; 
    infoTab.style.display = 'block'; 
    infoTab.style.transform = 'translateX(0)';
}; 

window.closeInfoTab = () => { 
    infoTab.style.transform = 'translateX(100%)';
    setTimeout(() => {
        infoTab.style.display = 'none';
    }, 300);
};

window.openFullscreenPanorama = (imageSrc) => {
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.className = 'fullscreen-panorama-overlay';
    fullscreenOverlay.innerHTML = `
        <button class="close-fullscreen-btn">&times;</button>
    `;
    document.body.appendChild(fullscreenOverlay);

    closePopup();

    const panoramaScene = new THREE.Scene();
    const panoramaTexture = new THREE.TextureLoader().load(imageSrc);
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: panoramaTexture });
    const panorama = new THREE.Mesh(geometry, material);
    panoramaScene.add(panorama);

    const panoramaCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    panoramaCamera.position.set(0, 0, 0.1);

    const panoramaRenderer = new THREE.WebGLRenderer({ antialias: true });
    panoramaRenderer.setSize(window.innerWidth, window.innerHeight);
    fullscreenOverlay.appendChild(panoramaRenderer.domElement);

    const panoramaControls = new OrbitControls(panoramaCamera, panoramaRenderer.domElement);

    panoramaControls.enableDamping = true;
    panoramaControls.dampingFactor = 0.25;
    panoramaControls.screenSpacePanning = false;

    panoramaControls.minDistance = 0.1;
    panoramaControls.maxDistance = 500;

    panoramaControls.maxPolarAngle = Math.PI;
    panoramaControls.minPolarAngle = 0;

    panoramaControls.enableZoom = false;
    panoramaControls.enablePan = false;

    panoramaControls.rotateSpeed = 0.5;

    function animatePanorama() {
        requestAnimationFrame(animatePanorama);
        panoramaControls.update();
        panoramaRenderer.render(panoramaScene, panoramaCamera);
    }
    animatePanorama();

    const closeButton = fullscreenOverlay.querySelector('.close-fullscreen-btn');
    closeButton.addEventListener('click', () => {
        console.log("Closing panorama viewer and cleaning up...");

        // Dispose resources
        panoramaControls.dispose();
        panoramaRenderer.dispose();
        panoramaTexture.dispose();
        geometry.dispose();
        material.dispose();

        // Remove panorama elements
        document.body.removeChild(fullscreenOverlay);

        // Ensure navigation cleanup
        const event = new Event("panoramaClose");
        window.dispatchEvent(event);
    });

    function onPanoramaResize() {
        panoramaCamera.aspect = window.innerWidth / window.innerHeight;
        panoramaCamera.updateProjectionMatrix();
        panoramaRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onPanoramaResize);

    fullscreenOverlay.addEventListener("contextmenu", (e) => e.preventDefault());
};

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

window.clearSearch = function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const clearButton = document.getElementById('search-clear-btn');

    searchInput.value = '';

    searchResults.innerHTML = '';
    searchResults.style.display = 'none';

    clearButton.style.display = 'none';
};

window.toggleClearButton = function() {
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('search-clear-btn');
    const searchIcon = document.getElementById('search-btn');

    if (searchInput.value.length > 0) {
        clearButton.style.display = 'block';
        clearButton.style.cursor = 'pointer';
        searchIcon.style.display = 'none';
    } else {
        clearButton.style.display = 'none';
        searchIcon.style.display = 'block';
    }
};
document.getElementById('search-input').addEventListener('input', toggleClearButton);

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
