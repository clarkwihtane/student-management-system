import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore)  { }

addStudent(student: Student){
  student.id=this.afs.createId();
  return this.afs.collection('/Student').add(student);
}

getAllStudents(){
  return this.afs.collection('/Student').snapshotChanges();
}

deleteStudent(student:Student){
  return this.afs.doc('/Students/'+ student.id).delete();
}

updateStudent(student:Student){
  this.deleteStudent(student);
  this.addStudent(student);
}


}
