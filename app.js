class tickk {
    constructor() {
        this.recognition = null;
        this.isRecording = false;
        this.data = {
            tasks: [],
            notes: [],
            calendar: []
        };
        
        this.init();
        this.loadData();
        this.renderDashboard();
    }

    init() {
        // Initialize speech recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.isRecording = true;
                this.updateVoiceButton();
                this.updateStatus('Listening...');
                const voiceContainer = document.getElementById('voiceContainer');
                if (voiceContainer) {
                    voiceContainer.classList.add('listening');
                }
            };

            this.recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                this.updateTranscription(transcript);
                
                if (event.results[event.results.length - 1].isFinal) {
                    this.processTranscript(transcript);
                }
            };

            this.recognition.onend = () => {
                this.isRecording = false;
                this.updateVoiceButton();
                const voiceContainer = document.getElementById('voiceContainer');
                if (voiceContainer) {
                    voiceContainer.classList.remove('listening');
                }
                this.updateStatus('Click the microphone to start');
            };

            this.recognition.onerror = (event) => {
                this.isRecording = false;
                this.updateVoiceButton();
                this.handleSpeechError(event.error);
            };
        } else {
            this.updateStatus('Speech recognition not supported in this browser.');
        }

        // Bind event listeners with null checks
        const voiceButton = document.getElementById('voiceButton');
        if (voiceButton) {
            voiceButton.addEventListener('click', () => {
                this.toggleRecording();
            });
        }

        // Theme toggle (handled by app.html inline script now)
        // Removed to prevent conflicts with new theme system

        // Initialize dark mode (handled by app.html inline script now)
        // Removed to prevent conflicts with new theme system

        // Keyboard shortcut (spacebar)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
                this.toggleRecording();
            }
        });
    }

    toggleRecording() {
        if (!this.recognition) {
            this.updateStatus('Speech recognition not available');
            return;
        }

        if (this.isRecording) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Speech recognition error:', error);
                this.updateStatus('Error starting speech recognition. Please try again.');
            }
        }
    }

    updateVoiceButton() {
        const micIcon = document.getElementById('micIcon');
        const spinner = document.getElementById('loadingSpinner');
        const button = document.getElementById('voiceButton');
        
        if (micIcon && spinner && button) {
            if (this.isRecording) {
                micIcon.classList.add('hidden');
                spinner.classList.remove('hidden');
                button.classList.add('pulse-animation');
            } else {
                micIcon.classList.remove('hidden');
                spinner.classList.add('hidden');
                button.classList.remove('pulse-animation');
            }
        }
    }

    updateTranscription(text) {
        const transcriptionEl = document.getElementById('transcriptionResult');
        if (transcriptionEl) {
            transcriptionEl.textContent = text || 'Your speech will appear here...';
        }
    }

    updateStatus(message) {
        const statusEl = document.getElementById('voiceStatus');
        if (statusEl) {
            statusEl.textContent = message;
        }
    }

    processTranscript(transcript) {
        if (!transcript.trim()) return;

        // Use NLP to classify the transcript
        const category = this.classifyText(transcript);
        
        // Add to appropriate category
        const item = {
            id: Date.now(),
            text: transcript.trim(),
            timestamp: new Date().toISOString(),
            category: category
        };

        this.data[category].push(item);
        this.saveData();
        this.renderDashboard();
        
        // Clear transcription and show feedback
        this.updateTranscription('');
        this.updateStatus(`Added to ${category}: "${transcript.trim()}"`);
        
        // Reset status after 3 seconds
        setTimeout(() => {
            this.updateStatus('Click the microphone to start');
        }, 3000);
    }

    classifyText(text) {
        if (!text || typeof text !== 'string') return 'notes';
        
        try {
            const lowerText = text.toLowerCase();
            
            // Check for calendar/appointment indicators
            const timeWords = ['tomorrow', 'today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'next week', 'next month', 'at', 'pm', 'am', 'o\'clock', 'meeting', 'appointment', 'call', 'lunch', 'dinner'];
            const hasTimeWords = timeWords.some(word => lowerText.includes(word));
            
            if (hasTimeWords) {
                return 'calendar';
            }
            
            // Check for task indicators
            const taskWords = ['need to', 'have to', 'must', 'should', 'todo', 'task', 'remember to', 'don\'t forget', 'buy', 'get', 'pick up', 'finish', 'complete', 'do'];
            const hasTaskWords = taskWords.some(phrase => lowerText.includes(phrase));
            
            if (hasTaskWords) {
                return 'tasks';
            }
            
            // Use compromise.js if available
            if (typeof nlp !== 'undefined') {
                const doc = nlp(lowerText);
                const verbs = doc.verbs().out('array');
                const actionVerbs = ['make', 'create', 'build', 'write', 'send', 'email'];
                const hasActionVerbs = verbs.some(verb => actionVerbs.includes(verb));
                
                if (hasActionVerbs) {
                    return 'tasks';
                }
            }
            
            // Default to notes
            return 'notes';
        } catch (error) {
            console.error('Classification error:', error);
            return 'notes';
        }
    }

    renderDashboard() {
        this.renderCategory('tasks', 'tasksList', 'tasksCount');
        this.renderCategory('notes', 'notesList', 'notesCount');
        this.renderCategory('calendar', 'calendarList', 'calendarCount');
    }

    renderCategory(category, containerId, countId) {
        const container = document.getElementById(containerId);
        const countEl = document.getElementById(countId);
        
        if (!container || !countEl) {
            console.warn(`Missing elements: container=${!!container}, count=${!!countEl}`);
            return;
        }

        const items = this.data[category] || [];
        countEl.textContent = items.length;

        if (items.length === 0) {
            container.innerHTML = this.getEmptyMessage(category);
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 ${this.getCategoryBorder(category)} group">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <p class="text-gray-900 dark:text-white text-sm">${this.escapeHtml(item.text)}</p>
                        <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">${this.formatTimestamp(item.timestamp)}</p>
                    </div>
                    <button onclick="app.removeItem('${category}', ${item.id})" 
                            class="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2">
                        <i class="fas fa-trash text-xs"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    getEmptyMessage(category) {
        const messages = {
            tasks: `
                <div class="text-gray-500 dark:text-gray-400 text-center py-8">
                    <i class="fas fa-clipboard-list text-3xl mb-2"></i>
                    <p>No tasks yet. Start speaking to add some!</p>
                </div>
            `,
            notes: `
                <div class="text-gray-500 dark:text-gray-400 text-center py-8">
                    <i class="fas fa-file-alt text-3xl mb-2"></i>
                    <p>No notes yet. Start speaking to add some!</p>
                </div>
            `,
            calendar: `
                <div class="text-gray-500 dark:text-gray-400 text-center py-8">
                    <i class="fas fa-calendar-plus text-3xl mb-2"></i>
                    <p>No events yet. Start speaking to add some!</p>
                </div>
            `
        };
        return messages[category] || '';
    }

    getCategoryBorder(category) {
        const borders = {
            tasks: 'border-blue-500',
            notes: 'border-green-500',
            calendar: 'border-purple-500'
        };
        return borders[category] || 'border-gray-500';
    }

    removeItem(category, id) {
        this.data[category] = this.data[category].filter(item => item.id !== id);
        this.saveData();
        this.renderDashboard();
    }

    saveData() {
        try {
            localStorage.setItem('voiceAppData', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    loadData() {
        try {
            const savedData = localStorage.getItem('voiceAppData');
            if (savedData) {
                this.data = JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
            this.data = { tasks: [], notes: [], calendar: [] };
        }
    }

    // Theme management removed - now handled by app.html inline script

    handleSpeechError(error) {
        let message = 'Speech recognition error occurred.';
        
        switch (error) {
            case 'network':
                message = 'Network error. Please check your internet connection.';
                break;
            case 'not-allowed':
                message = 'Microphone access denied. Please allow microphone access.';
                break;
            case 'no-speech':
                message = 'No speech detected. Please try again.';
                break;
            case 'audio-capture':
                message = 'No microphone found. Please check your microphone.';
                break;
        }
        
        this.updateStatus(message);
        setTimeout(() => {
            this.updateStatus('Click the microphone to start');
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) {
            return 'Just now';
        } else if (diff < 3600000) {
            return `${Math.floor(diff / 60000)} minutes ago`;
        } else if (diff < 86400000) {
            return `${Math.floor(diff / 3600000)} hours ago`;
        } else {
            return date.toLocaleDateString();
        }
    }
}

// Initialize the app
let app;

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    try {
        app = new tickk();
        console.log('tickk initialized successfully');
    } catch (error) {
        console.error('Error initializing tickk:', error);
    }
});

// Global function for removing items (called from HTML)
window.loadSavedData = function() {
    if (app) {
        app.loadData();
        app.renderDashboard();
    }
};

// Make app globally available
window.app = app;
