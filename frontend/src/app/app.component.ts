import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-4">
      <h1 class="text-center mb-4">🚀 MEAN Stack DevOps Demo</h1>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Add New Item</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="addItem()">
                <div class="mb-3">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Item name"
                    [(ngModel)]="newItem.name" 
                    name="name" 
                    required>
                </div>
                <div class="mb-3">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Description"
                    [(ngModel)]="newItem.description" 
                    name="description">
                </div>
                <button type="submit" class="btn btn-primary">Add Item</button>
              </form>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Items List <button class="btn btn-sm btn-success float-end" (click)="loadItems()">Refresh</button></h5>
            </div>
            <div class="card-body">
              <div *ngIf="items.length === 0" class="text-center text-muted">
                No items found. Add some items!
              </div>
              <div *ngFor="let item of items" class="border-bottom pb-2 mb-2">
                <strong>{{item.name}}</strong><br>
                <small class="text-muted">{{item.description}}</small>
                <button class="btn btn-sm btn-danger float-end" (click)="deleteItem(item._id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-4 text-center">
        <div class="alert alert-info">
          <strong>✅ DevOps Demo:</strong> This app demonstrates Docker, CI/CD, and cloud deployment
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  items: any[] = [];
  newItem = { name: '', description: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.http.get<any[]>('/api/items').subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Error loading items:', err)
    });
  }

  addItem() {
    if (this.newItem.name) {
      this.http.post('/api/items', this.newItem).subscribe({
        next: () => {
          this.loadItems();
          this.newItem = { name: '', description: '' };
        },
        error: (err) => console.error('Error adding item:', err)
      });
    }
  }

  deleteItem(id: string) {
    this.http.delete(`/api/items/${id}`).subscribe({
      next: () => this.loadItems(),
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}