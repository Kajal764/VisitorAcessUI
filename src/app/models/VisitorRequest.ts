import { ODCList } from './ODCList';

export class VisitorRequest{
    empId:number;
    startDate:string;
    endDate:string;
    startTime:string;
    endTime:string;
    odc:ODCList[];
    status:string;
}