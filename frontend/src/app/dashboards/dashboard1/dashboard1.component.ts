import { Component, AfterViewInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { Http, Jsonp } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
	templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component {
	rooms:any = [];
	timeout:string = "1";
	timeoutArray = ['1', '5', '60'];
	constructor(public jsonp:Jsonp) {
		/*let data = '[{"id":"367","rm_timestamp":"2018-04-17 02:38:15","rm_puerto_a":"247","rm_puerto_c":"255","rm_puerto_f":"221","rm_puerto_k":"255","rm_puerta1":"t","rm_puerta2":"t","rm_puerta3":"t","rm_puerta4":"f","rm_puerta5":"t","rm_puerta6":"t","rm_puerta7":"t","rm_puerta8":"t","rm_puerta9":"t","rm_puerta10":"t","rm_puerta11":"t","rm_puerta12":"t","rm_puerta13":"t","rm_puerta14":"t","rm_puerta15":"t","rm_puerta16":"t","rm_puerta17":"t","rm_puerta18":"f","rm_puerta19":"t","rm_puerta20":"t","rm_puerta21":"t","rm_puerta22":"f","rm_puerta23":"t","rm_puerta24":"t","rm_puerta25":"t","rm_puerta26":"t"}]';
		let jsonData = JSON.parse(data);
		jsonData = jsonData[0];
		console.log(jsonData);*/
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
				this.rooms.push({'id' : keys[i], 'status' : res[keys[i]]});
			}
			console.log(this.rooms);
			let time = parseInt(this.timeout, 10) * 1000;
			let me = this;
			setTimeout(function(){
				me.loadRooms();
			}, time);
		});
		
	}
	
	checkButton(id) {
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
