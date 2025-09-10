import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  username!: string;

  constructor(public auth: Auth, private router : Router) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
  }

  handleLogout() {
    this.auth.logout();
  }

}
