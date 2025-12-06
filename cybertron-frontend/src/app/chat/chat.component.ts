import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat.html',
    styleUrl: './chat.css'
})
export class ChatComponent {
    messages = signal<{ sender: string, text: string }[]>([]);
    newMessage = signal('');
    isBackendLive = signal<boolean>(true); // Assume true initially, verify on load

    private apiService = inject(ApiService);

    constructor() {
        this.checkBackendHealth();
    }

    checkBackendHealth() {
        this.apiService.getHealth().subscribe({
            next: () => this.isBackendLive.set(true),
            error: () => this.isBackendLive.set(false)
        });
    }

    sendMessage() {
        if (!this.isBackendLive()) return;

        const msg = this.newMessage();
        if (!msg.trim()) return;

        // Add user message
        this.messages.update(msgs => [...msgs, { sender: 'You', text: msg }]);
        this.newMessage.set('');

        // Send to backend
        this.apiService.sendMessage(msg).subscribe({
            next: (res) => {
                this.messages.update(msgs => [...msgs, { sender: res.sender || 'System', text: res.message }]);
                this.isBackendLive.set(true);
            },
            error: (err) => {
                this.messages.update(msgs => [...msgs, { sender: 'System', text: 'Error: Connection to backend lost.' }]);
                this.isBackendLive.set(false);
            }
        });
    }
}
