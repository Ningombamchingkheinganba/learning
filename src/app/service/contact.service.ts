import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../contact/model/contact';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
  }

  async getContactList(): Promise<Contact[]> {
    await this.simulateDelay();
    //throw new Error("Can't able to load the contacts!"); // error thokhnbani
    return await firstValueFrom(this.http.get<Contact[]>('http://localhost:3000/api/contact/getContact'));
  }

  async deleteContact(id: string): Promise<{message:string}> {
    return await firstValueFrom(this.http.delete<{message:string}>(`http://localhost:3000/api/contact/deleteContact/${id}`));
  }

  async addContact(name: string, email: string, phoneNumber: string): Promise<{message:string}> {
    const data = {name,email,phoneNumber}
    return await firstValueFrom(this.http.post<{message: string}>(`http://localhost:3000/api/contact/addcontact`, data));
  }

  async getContactById(id:string): Promise<Contact> {
    return await firstValueFrom(this.http.get<Contact>(`http://localhost:3000/api/contact/getContact/${id}`,));
  }

  async editContact({
    id,
    email,
    name,
    phoneNumber
  }: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
  }): Promise<{ message: string }> {
    const data = { name, email, phoneNumber };
    return await firstValueFrom(
      this.http.put<{ message: string }>(`http://localhost:3000/api/contact/editContact/${id}`, data)
    );
  }
  
}
