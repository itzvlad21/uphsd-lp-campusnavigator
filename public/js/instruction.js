const instructions = [
    { text: "Tap & Drag to look around", gif: "/assets/instructions/instruction1.gif" },
    { text: "Pinch to Zoom In/Out", gif: "/assets/instructions/instruction2.gif"  },
    { text: "Use the navigation tool", gif: "/assets/instructions/instruction3.gif" },
    { text: "Click the hotspot markers to explore deeper", gif: "/assets/instructions/instruction4.gif" },
    { text: "When in panorama viewer, tap and drag to look around", gif: "/assets/instructions/instruction5.gif" }
];

window.addEventListener('load', function() {
    showInstructionModal();
});

const instructionAudios = [
    document.getElementById('instruction1-audio'),
    document.getElementById('instruction2-audio'),
    document.getElementById('instruction3-audio'),
    document.getElementById('instruction4-audio'),
    document.getElementById('instruction5-audio')
];

let currentInstruction = 0;

function playWelcomeAndIntro() {
    const instructionModal = document.getElementById('instruction-modal');
    const welcomeAudio = document.getElementById('welcome-audio');
    const introAudio = document.getElementById('intro-audio');
    const introTextContainer = document.getElementById('intro-text-container');
    const line1 = document.getElementById('intro-text-1');
    const line2 = document.getElementById('intro-text-2');
    const line3 = document.getElementById('intro-text-3');

    instructionModal.style.display = "none";
    introTextContainer.classList.add('fade-in');

    welcomeAudio.play();

    setTimeout(() => line1.classList.add('fade-in'), 0);
    setTimeout(() => line2.classList.add('fade-in'), 4000); 
    setTimeout(() => line3.classList.add('fade-in'), 9000);   

    welcomeAudio.onended = () => {
        introAudio.play();

        const fadeOutTime = introAudio.duration - 1;
        setTimeout(() => {
            introTextContainer.classList.remove('fade-in');
            introTextContainer.classList.add('fade-out');
        }, fadeOutTime * 1000);

        introAudio.onended = () => {
            introTextContainer.style.display = 'none';

            showInstructionModal();
            startInstructionSequence();
        };
    };

    welcomeAudio.onerror = () => {
        introAudio.play();
        introAudio.onended = () => {
            introTextContainer.style.display = 'none';
            showInstructionModal();
            startInstructionSequence();
        };
    };
}

window.closeAll = function() {
    document.getElementById('intro-text-container').style.display = 'none';
    document.getElementById('instruction-modal').style.display = 'none';

    const allAudio = [
        document.getElementById('welcome-audio'),
        document.getElementById('intro-audio'),
        document.getElementById('instruction1-audio'),
        document.getElementById('instruction2-audio'),
        document.getElementById('instruction3-audio'),
        document.getElementById('instruction4-audio'),
        document.getElementById('instruction5-audio')
    ];
    allAudio.forEach(audio => {
        if (audio) audio.pause();
        audio.currentTime = 0; 
    });

    startCampusNavigation();
};


function showInstructionModal() {
    document.getElementById('instruction-modal').style.display = 'flex';
}

function startInstructionSequence() {
    currentInstruction = 0;
    updateInstruction();
}

function updateInstruction() {
    const instructionText = document.getElementById('instruction-text');
    const instructionGif = document.getElementById('instruction-gif');
    const currentAudio = instructionAudios[currentInstruction];

    instructionText.classList.add('instruction-exit');
    instructionGif.classList.add('instruction-exit');

    setTimeout(() => {
        instructionText.innerText = instructions[currentInstruction].text;
        instructionGif.src = instructions[currentInstruction].gif;

        instructionText.classList.remove('instruction-exit');
        instructionGif.classList.remove('instruction-exit');
        instructionText.classList.add('instruction-enter');
        instructionGif.classList.add('instruction-enter');

        setTimeout(() => {
            instructionText.classList.remove('instruction-enter');
            instructionGif.classList.remove('instruction-enter');
        }, 500);

        if (currentAudio) {
            currentAudio.play();
            currentAudio.onended = () => {
                document.getElementById('prev-btn').style.display = currentInstruction > 0 ? 'inline' : 'none';
                document.getElementById('next-btn').style.display = currentInstruction < instructions.length - 1 ? 'inline' : 'none';
                document.getElementById('start-btn').style.display = currentInstruction === instructions.length - 1 ? 'inline' : 'none';
            };
        }
    }, 300);
}

function nextInstruction() {
    if (currentInstruction < instructions.length - 1) {
        currentInstruction++;
        updateInstruction();
    }
}

function prevInstruction() {
    if (currentInstruction > 0) {
        currentInstruction--;
        updateInstruction();
    }
}

function startCampusNavigation() {
    document.getElementById('instruction-modal').style.display = 'none';
}

window.addEventListener('load', playWelcomeAndIntro);