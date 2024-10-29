import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { from, Observable } from 'rxjs';
import { TodoTask } from '../models/todo-task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private axiosInstance: AxiosInstance;
  private baseUrl = "https://localhost:7247/api/TodoTask";

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl
    })
  }

  getAllTodos():Observable<TodoTask[]>{
    return from(this.axiosInstance.get<TodoTask[]>('/').then(response => response.data));
  }

  getTodoById(id: number):Observable<TodoTask>{
    return from(this.axiosInstance.get<TodoTask>('/${id}').then(response => response.data));
  }

  postTodo(todo: TodoTask):Observable<TodoTask>{
    return from(this.axiosInstance.post<TodoTask>('/', todo).then(response => response.data));
  }

  updateTodo(id:number, todo: TodoTask):Observable<TodoTask>{
    return from(this.axiosInstance.put<TodoTask>('/${id}', todo).then(response => response.data));
  }

  deleteTodo(id:number):Observable<void>{
    return from(this.axiosInstance.delete<void>('/${id}').then(response => response.data));
  }

  updateIsCompleted(id:number, isCompleted:boolean):Observable<void>{
    return from(this.axiosInstance.patch('/${id}/isCompleted', {isCompleted}).then(response => response.data));
  }
}
