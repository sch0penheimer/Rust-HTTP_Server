document.addEventListener('DOMContentLoaded', function() {
    const uptimeElement = document.getElementById('uptime');
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    
    function updateUptime() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        
        uptimeElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }
    
    function padZero(num) {
        return num.toString().padStart(2, '0');
    }
    
    setInterval(updateUptime, 1000);
    
    const connectionsElement = document.getElementById('connections');
    let connections = 1;
    
    function simulateConnections() {
        const rand = Math.random();
        if (rand < 0.6 && connections < 99) {
            connections++;
        } else if (rand < 0.7 && connections > 1) {
            connections--;
        }
        
        connectionsElement.textContent = connections;
    }
    
    setInterval(simulateConnections, 5000);
    
    const memoryUsageElement = document.getElementById('memory-usage');
    const baseMemory = 2.4;
    
    function simulateMemoryUsage() {
        const fluctuation = (Math.random() * 0.4) - 0.2;
        const memory = baseMemory + fluctuation;
        memoryUsageElement.textContent = `${memory.toFixed(1)} MB`;
    }
    
    setInterval(simulateMemoryUsage, 3000);
    
    const threadsElement = document.getElementById('threads');
    let threads = 4;
    
    function simulateThreads() {
        const rand = Math.random();
        if (rand < 0.2) {
            threads = Math.max(1, Math.min(8, threads + (Math.random() > 0.5 ? 1 : -1)));
            threadsElement.textContent = threads;
        }
    }

    setInterval(simulateThreads, 7000);
    
    const statusElement = document.getElementById('status');
    const statusMessages = [
        'CONNECTION_ESTABLISHED',
        'SERVER_RUNNING',
        'MEMORY_OPTIMIZED',
        'ZERO_COST_ABSTRACTIONS',
        'THREAD_SAFETY_GUARANTEED',
        'OWNERSHIP_VALIDATED',
        'RESOURCES_ALLOCATED',
        'REQUESTS_PROCESSED',
        'NO_GARBAGE_COLLECTION_NEEDED',
        'STATIC_DISPATCH_COMPLETE'
    ];
    
    function updateTerminalStatus() {
        const randomIndex = Math.floor(Math.random() * statusMessages.length);
        statusElement.textContent = statusMessages[randomIndex];
        

        if (Math.random() > 0.7) {
            addGlitchEffect(statusElement);
        }
    }

    setInterval(updateTerminalStatus, 4000);
    

    function addGlitchEffect(element) {
        element.classList.add('glitch');
        setTimeout(() => {
            element.classList.remove('glitch');
        }, 1000);
    }
    

    const commands = [
        'welcome_visitor',
        'check_status',
        'optimize_resources',
        'verify_connections',
        'scan_memory',
        'validate_protocols',
        'secure_channels',
        'process_requests'
    ];
    let commandIndex = 0;
    
    function typeCommand() {
        const commandElement = document.querySelector('.typing');
        const command = commands[commandIndex];
        
        commandElement.textContent = '';

        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < command.length) {
                commandElement.textContent += command.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);

                setTimeout(() => {
                    commandIndex = (commandIndex + 1) % commands.length;
                    typeCommand();
                }, 3000);
            }
        }, 100);
    }

    setTimeout(typeCommand, 2000);

    const container = document.querySelector('.container');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        container.style.transform = `skew(${(mouseX - 0.5) * 2}deg, ${(mouseY - 0.5) * 1}deg)`;
    });
    
    function randomGlitch() {
        const elements = [
            document.querySelector('h1'),
            document.querySelector('h2'),
            document.querySelector('.terminal-title')
        ];
        
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        addGlitchEffect(randomElement);
        
        setTimeout(randomGlitch, Math.random() * 10000 + 5000);
    }
    
    setTimeout(randomGlitch, 5000);
    
    const rustParticles = document.createElement('div');
    rustParticles.className = 'rust-particles';
    document.body.appendChild(rustParticles);

    for (let i = 0; i < 20; i++) {
        createRustParticle();
    }
    
    setInterval(createRustParticle, 1000);
    
    function createRustParticle() {
        const particle = document.createElement('div');
        particle.className = 'rust-particle';

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        const size = Math.random() * 5 + 1;
        
        const opacity = Math.random() * 0.2 + 0.1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = opacity.toString();
        
        rustParticles.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, Math.random() * 10000 + 5000);
    }

    const style = document.createElement('style');
    style.textContent = `
        .rust-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .rust-particle {
            position: absolute;
            background-color: var(--rust-orange);
            border-radius: 50%;
            animation: float 10s linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
});