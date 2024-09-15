import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '@shared/models/User.model';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  constructor(
    // private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataNew: Usuario
  ) {}

  cancelar() {
    this.dialogRef.close();
  }

}
