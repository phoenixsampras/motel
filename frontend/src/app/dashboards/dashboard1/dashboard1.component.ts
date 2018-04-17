import { Component, AfterViewInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { Http, Jsonp } from '@angular/http';

@Component({
	templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component {

	constructor(public http:Http) {
		let data = '[{"id":"367","rm_timestamp":"2018-04-17 02:38:15","rm_puerto_a":"247","rm_puerto_c":"255","rm_puerto_f":"221","rm_puerto_k":"255","rm_puerta1":"t","rm_puerta2":"t","rm_puerta3":"t","rm_puerta4":"f","rm_puerta5":"t","rm_puerta6":"t","rm_puerta7":"t","rm_puerta8":"t","rm_puerta9":"t","rm_puerta10":"t","rm_puerta11":"t","rm_puerta12":"t","rm_puerta13":"t","rm_puerta14":"t","rm_puerta15":"t","rm_puerta16":"t","rm_puerta17":"t","rm_puerta18":"f","rm_puerta19":"t","rm_puerta20":"t","rm_puerta21":"t","rm_puerta22":"f","rm_puerta23":"t","rm_puerta24":"t","rm_puerta25":"t","rm_puerta26":"t"}]';
		let jsonData = JSON.parse(data);
		jsonData = jsonData[0];
		console.log(jsonData);
		this.http.get("https://cloud.movilcrm.com/motel/backend/motel_rest.php?task=verPuertas&callback=foo")
		.subscribe(response => {
			console.log(response);
		});
	}

}
