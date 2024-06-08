import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Student } from '../model/student';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{
 

  
  studentsList: Student[] = [];
  studentObj: Student= {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id:string='';
  first_name:string='';
  last_name:string='';
  email:string='';
  mobile:string='';


  constructor(private auth : AuthService , private data:DataService){}

  ngOnInit(){
    this.getAllStudents();
  }

 

getAllStudents(){
  this.data.getAllStudents().subscribe( res =>{
    this.studentsList= res.map((e : any)=>{
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  }, err => {
alert('Error while fetching student data')
  })

}

resetForm(){
  this.id='';
  this.first_name='';
  this.last_name='';
  this.email='';
  this.mobile='';
}

addStudent(){
if(this.first_name== '' || this.last_name=='' || this.mobile==''|| this.email=='' ) {
  alert('fill all input fields')
  return;
}
this.studentObj.id='';
this.studentObj.email=this.email;
this.studentObj.first_name= this.first_name;
this.studentObj.last_name= this.last_name;


this.data.addStudent(this.studentObj);
this.resetForm();

}

updateStudent(){

}

deleteStudent(student: Student){
  if(window.confirm('Are you sure you want to deleye'+ student.first_name + '' + student.last_name+ '?')){
  this.data.deleteStudent(student);
  }
}

}
