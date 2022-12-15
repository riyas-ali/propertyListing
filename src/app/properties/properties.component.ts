import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropertyService } from '../shared/property.service';
import { property } from './properties.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  constructor(private fb: FormBuilder, private api: PropertyService) {}

  allProperty: any;
  formValue! : FormGroup;
  propertyModelObj: property = new property();
  showAdd!: boolean;
  showEdit!: boolean;

  ngOnInit(): void {
    this.getAllProperty();
    this.formValue = this.fb.group({
      ptitle:[''],
      pprice:[''],
      plocation:[''],
      pdetails:['']
    })
  }

  clickAddProp() {
    this.formValue.reset();
    this.showAdd = true;
    this.showEdit = false;
  }

  getAllProperty() {
    this.api.getAllProp().subscribe((res) => {
      this.allProperty = res;
    })
  }

  addProp() {
    this.propertyModelObj.ptitle = this.formValue.value.ptitle;
    this.propertyModelObj.pprice = this.formValue.value.pprice;
    this.propertyModelObj.plocation = this.formValue.value.plocation;
    this.propertyModelObj.pdetails = this.formValue.value.pdetails;
    this.api.addListing(this.propertyModelObj).subscribe((res) => {
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllProperty();
    }, err => {
      alert("Somthing went wrong")
    })
  }

  deleteProp(data: any) {
    this.api.deleteProp(data.id).subscribe((res) => {
      alert("Property Deleted Successfully")
      this.getAllProperty()
    })
  }
}
