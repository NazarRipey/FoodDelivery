import { OwnerRequestStatus } from '../enums/statuses/OwnerRequestStatus';
import { UserShortProfile } from '../userProfile/UserShortProfile';
import { Guid } from "guid-typescript";

export class OwnerRequest
{
    id: Guid;
    userProfileId: Guid;
    createdDate: Date;
    closedDate: Date
    status: OwnerRequestStatus;

    userProfile: UserShortProfile;
}