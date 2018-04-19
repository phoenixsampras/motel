import { Component, AfterViewInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { Http, Jsonp } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Room } from '../../room';

@Component({
	templateUrl: './dashboard2.component.html',
    styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component {
	rooms:any = [];
	timeout:string = "60";
	timeoutArray = ['1', '5', '60'];
	constructor(public jsonp:Jsonp) {
		this.loadRooms();
	}
	
	
	loadRooms() {
		this.jsonp.request("https://cloud.movilcrm.com/motel/backend/motel_rest.php?task=verPuertas&callback=JSONP_CALLBACK")
		.subscribe(response => {
			var res = response['_body'].verPuertas;
			//console.log(Object.keys(res));
			var keys = Object.keys(res);
			this.rooms = [];
			for(var i=0;i< keys.length; i++) {
				//console.log(res[keys[i]);
				let roomStr = "Room-" + keys[i];
				//this.rooms.push({'id' : keys[i], 'status' : res[keys[i]]});
				localStorage.removeItem(roomStr);
				let room = localStorage.getItem(roomStr);
				
				if(!room) {
					let r = new Room;
					r.id = parseInt(keys[i],10);
					r.state = res[keys[i]] == "f" ? 1 : 0;
					r.door = res[keys[i]];
					this.rooms.push(r);
					
				} else {
					this.rooms.push(JSON.parse(localStorage.getItem(roomStr)));
				}
				//console.log(room);
			}
			//console.log(this.rooms);
			let time = parseInt(this.timeout, 10) * 1000;
			let me = this;
			setTimeout(function(){
				me.loadRooms();
			}, time);
		});
		
	}
	
	occupyButton(id) {
		alert("Check Button Room " + id);
	}
	
	cancelButton(id) {
		alert("Cancel Button Room " + id);
	}
	
	favouriteButton(id) {
		alert("Favourite Button Room " + id);
	}
	
	fourthButton(id) {
		alert("Fourth Button Room " + id);
	}

}
