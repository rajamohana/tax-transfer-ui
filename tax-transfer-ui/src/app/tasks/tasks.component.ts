import { Component, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



interface Client {
  value: string;
  viewValue: string;
}

interface ClientData {
  id: string;
  status: string;
  name: string;
  subject: string;
  owner: string;
  created: string;
  selected?: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent {
  clients: Client[] = [
    {value: 'All', viewValue: 'ALL'},
    {value: 'PFS', viewValue: 'PFS'},
    {value: 'EDJ', viewValue: 'EDJ'},
    {value: 'BHO', viewValue: 'BHO'},
    {value: 'BNS', viewValue: 'BNS'},
    {value: 'RBC', viewValue: 'RBC'},
    {value: 'CIBC', viewValue: 'CIBC'}
  ];
  selectedRadio = '';
  selectedClient = '';
  clientData: ClientData[] = [];
  displayedColumns: string[] = ['action', 'id', 'status', 'name', 'subject', 'owner', 'created'];
  dataSource = new MatTableDataSource<ClientData>(this.clientData);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  showActions!: boolean;
  checkedElement!: ClientData;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  radioChange(event: MatRadioChange): void {
    this.selectedRadio = event.value;
    this.fetchData();
  }

  onChangeClient(event: MatSelectChange): void {
    this.selectedClient = event.value;
    this.fetchData();
}
fetchData(): void {
  this.showActions = false;
  if(this.selectedRadio && this.selectedClient) {
    // fetch API to get table data;
    this.clientData = [{
      id: '1234',
      status: 'Unclaimed',
      name: 'Tax Print Files Review',
      subject: 'Test subject',
      owner: 'Jhon',
      created:'2023-07-13'
    },{
      id: '6789',
      status: 'Claimed',
      name: 'Tax Print Files Review',
      subject: 'Test subject',
      owner: 'Jhon',
      created:'2023-07-13'
    },{
      id: '1537',
      status: 'Closed',
      name: 'Tax Print Files Review',
      subject: 'Test subject',
      owner: 'Jhon',
      created:'2023-07-13'
    }];
    this.dataSource = new MatTableDataSource<ClientData>(this.clientData);
  }
}

checkboxChange(element: ClientData): void {
  this.dataSource.data.forEach(t => (t.selected = (t.id!==element.id)? false: element.selected ));
  this.showActions = element.selected || false;
  this.checkedElement = element;
}
complete(): void {
  this.dataSource.data.forEach(t => {
    if(t.id === this.checkedElement.id) {
      t.status = 'Closed';
    }
  });
}
claim(): void {
  this.dataSource.data.forEach(t => {
    if(t.id === this.checkedElement.id) {
      t.status = 'Claimed';
    }
  });
}
release(): void {
  this.dataSource.data.forEach(t => {
    if(t.id === this.checkedElement.id) {
      t.status = 'Unclaimed';
    }
  });
}
}
