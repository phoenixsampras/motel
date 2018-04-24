import { Component, AfterViewInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { Http, Jsonp } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Room } from '../../room';
import * as moment from 'moment';

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
				// console.log(roomStr +  ' -- ' + room);
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

						localStorage.setItem(roomStr, JSON.stringify(_r));
					}
					_r.door = res[keys[i]];
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

	sendRoomData(hours, startDateFormated, endDateFormatted, roomID) {
		let url = "http://9.9.9.20/backend/motel_rest.php?task=checkout&startDateFormated=" + startDateFormated + "&endDateFormatted=" + endDateFormatted + "&product=1&roomID=" +roomID+ "&quantity=" + hours + "&price=3&callback=JSONP_CALLBACK";
		this.jsonp.request(encodeURI(url))
		.subscribe(response => {
			var res =response['_body'].order_id;
			console.log((res));
		});
	}

	occupyButton(id) {
		let roomStr = "Room-" + id;
		let room = JSON.parse(localStorage.getItem(roomStr));
		room.state = 1;
		let rightNow = moment().format();
		room.startDate = rightNow;
		console.log((room));
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
		console.log(room);
		let startDate = room.startDate;
		let endDate = moment(new Date());
		// let timeConsumed = endDate.diff(moment(room.startDate), 'hours');
		let duration = moment.duration(endDate.diff(startDate));
		let hours = parseInt(duration.minutes()) / 60;

		let startDateFormated = moment(startDate).format("D/MM/YYYY, h:mm:ss a");
		let endDateFormatted = moment(endDate).format("D/MM/YYYY, h:mm:ss a");

		console.log(startDate);
		console.log(endDate);
		console.log(duration.minutes());
		console.log(hours);
		console.log(startDateFormated);
		console.log(endDateFormatted);

		room.state = 2;
		localStorage.setItem(roomStr, JSON.stringify(room));
		for(var i=0;i<this.rooms.length;i++) {
			if(this.rooms[i].id == room.id) {
				this.rooms[i] = room;
				let newOrderID = this.sendRoomData(hours, startDateFormated, endDateFormatted, room.id);
				window.open("http://9.9.9.20:8999/web?#id=" + newOrderID + "&view_type=form&model=sale.order&action=232", "_blank");

			}
		}
	}

}
