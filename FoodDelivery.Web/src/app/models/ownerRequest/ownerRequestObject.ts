import { ownerRequestStatus } from './../enums/statuses/ownerRequestStatus';
import { userShortProfile } from './../userProfile/userShortProfile';
import { userProfile } from '../userProfile/userProfile';
import { Guid } from "guid-typescript";

export class ownerRequestObject
{
    id: Guid;
    userProfileId: Guid;
    createdDate: string;
    closedDate: string
    status: ownerRequestStatus;

    userProfile: userShortProfile;
}