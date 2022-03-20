import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { RoutingLink } from 'src/app/enums/routing-link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [];

  public ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems(): void {
    this.menuItems = [
      {
        label: 'A propos',
        routerLink: RoutingLink.ABOUT
      },
      {
        label: 'Commande personnalisée',
        routerLink: RoutingLink.ORDER
      },
      {
        label: 'Portfolio',
        routerLink: RoutingLink.PORTFOLIO
      }
    ];
  }
}
