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
	timeout:string = "1";
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
				
				let room = localStorage.getItem(roomStr);
				console.log(roomStr +  ' -- ' + room);
				if(!room) {
					let r = new Room;
					r.id = parseInt(keys[i],10);
					r.state = res[keys[i]] == "f" ? 1 : 0;
					r.door = res[keys[i]];
					this.rooms.push(r);
					localStorage.setItem(roomStr, JSON.stringify(r));
					
				} else {
					
					var _r = JSON.parse(localStorage.getItem(roomStr));
					if(_r.state == 0) {
						_r.state = res[keys[i]] == "f" ? 1 : 0;
						_r.door = res[keys[i]];
						localStorage.setItem(roomStr, JSON.stringify(_r));
					}
					this.rooms.push(_r);
				}
				
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
		let roomStr = "Room-" + id;
		let room = JSON.parse(localStorage.getItem(roomStr));
		room.state = 1;
		localStorage.setItem(roomStr, JSON.stringify(room));
		for(var i=0;i<this.rooms.length;i++) {
			if(this.rooms[i].id == room.id) {
				this.rooms[i] = room;
			}
		}
	}
	
	emptyButton(id) {
		let roomStr = "Room-" + id;
		let room = JSON.parse(localStorage.getItem(roomStr));
		room.state = 0;
		localStorage.setItem(roomStr, JSON.stringify(room));
		for(var i=0;i<this.rooms.length;i++) {
			if(this.rooms[i].id == room.id) {
				this.rooms[i] = room;
			}
		}
		console.log(localStorage.getItem(roomStr));
	}
	
	cleanButton(id) {
		let roomStr = "Room-" + id;
		let room = JSON.parse(localStorage.getItem(roomStr));
		room.state = 2;
		localStorage.setItem(roomStr, JSON.stringify(room));
		for(var i=0;i<this.rooms.length;i++) {
			if(this.rooms[i].id == room.id) {
				this.rooms[i] = room;
			}
		}
	}
	
	checkoutButton(id) {
		let roomStr = "Room-" + id;
		let room = JSON.parse(localStorage.getItem(roomStr));
		room.state = 2;
		localStorage.setItem(roomStr, JSON.stringify(room));
		for(var i=0;i<this.rooms.length;i++) {
			if(this.rooms[i].id == room.id) {
				this.rooms[i] = room;
			}
		}
	}

}
