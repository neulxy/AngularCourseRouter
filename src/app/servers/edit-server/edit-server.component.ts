import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParams); // params and fragment could be fetched when the component is created
    console.log(this.route.snapshot.fragment); // but they will not be udpated
    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log(queryParams['allowEdit']);
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    }); // With subscribe, params and fragment could be udpated when they are changed
    this.route.fragment.subscribe();
    const serverId = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
