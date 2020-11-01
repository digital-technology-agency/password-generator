import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-certificate-item',
  templateUrl: './certificate-item.component.html',
  styleUrls: ['./certificate-item.component.scss']
})
export class CertificateItemComponent implements OnInit {

  @Input() item;

  constructor() { }

  ngOnInit(): void {
  }

}
