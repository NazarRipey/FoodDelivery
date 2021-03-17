import { userProfile } from './userProfile';
import { roleRequestStatus } from './enums/roleRequestStatus';
import { Guid } from "guid-typescript";

export class ownerRequest
{
    id: Guid;
    userProfileId: Guid;
    createdDate: string;
    closedDate: string
    status: roleRequestStatus

    userProfile: userProfile;
}