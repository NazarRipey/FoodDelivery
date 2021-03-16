import { roleRequestStatus } from './enums/roleRequestStatus';
import { Guid } from "guid-typescript";

export class ownerRequest
{
    userProfileId: Guid;
    createdDate: string;
    closedDate: string
    status: roleRequestStatus
}