import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoTask } from '../models/todo-task';
import { TodoService } from '../services/todo.service';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgIf, MessageModule, NgFor],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  todos:TodoTask[] = []

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos(): void {
    this.todoService.getAllTodos().subscribe({
      next: (data) => {
        this.todos = data;
      },
      error: (error) => {
        console.error('Error fetching todos', error);
      }
    });
  }
}
