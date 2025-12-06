import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-health',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './health.html',
    styleUrl: './health.css'
})
export class HealthComponent implements OnInit {
    status = signal<string>('Checking...');
    frontendStatus = signal<string>('UP');
    details = signal<any>(null);

    private apiService = inject(ApiService);

    ngOnInit() {
        this.checkHealth();
    }

    checkHealth() {
        this.status.set('Checking...');
        this.apiService.getHealth().subscribe({
            next: (data) => {
                this.status.set(data.status);
                this.details.set(data);
            },
            error: (err) => {
                this.status.set('DOWN');
                this.details.set({ error: 'Backend unreachable' });
            }
        });
    }
}
