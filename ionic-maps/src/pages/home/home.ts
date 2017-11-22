import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  eventos:any[];
  constructor(public navCtrl: NavController,public restapiService:RestapiServiceProvider) {
    this.getEventos();
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
  getEventos(){
    this.restapiService.getEventos()
    .then(data => {
      this.eventos = data.events,this.carregaEventos();
    });
  }
  carregaEventos(){
    Object.keys(this.eventos).forEach(key=> {
        let lat = this.eventos[key].place.location.latitude;
        let lng = this.eventos[key].place.location.longitude;
        let txt = this.eventos[key].name;
        console.log(lat,lng,txt)  ;     
        this.adicionarEvento(lat,lng,txt);
    });
  }
  loadMap(){
 
    let latLng = new google.maps.LatLng(-30.034299,-51.2244941);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }
  addMarker(){
    
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
     });
    
     let content = "<h4>Evento</h4>";         
    
     this.addInfoWindow(marker, content);
    
   }
   adicionarEvento(lat,lng,txt){
    var myLatlng = new google.maps.LatLng(lat,lng);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: myLatlng
    });
   
    let content = "<h4>"+txt+"</h4>";         
   
    this.addInfoWindow(marker, content);
    marker = null;
   
  }
  addInfoWindow(marker, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: content
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
    
   }
}